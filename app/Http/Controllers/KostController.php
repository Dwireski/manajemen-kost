<?php

namespace App\Http\Controllers;

use App\Models\Kost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KostController extends Controller
{
    public function index(Request $request)
    {
        $query = Kost::with('rooms');
        
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('owner_name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }
        
        $kosts = $query->latest()->get();
        
        return Inertia::render('Kosts/Index', [
            'kosts' => $kosts,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Kosts/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'owner_name' => 'required|string|max:255',
            'owner_phone' => 'required|string|max:20',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle foto upload
        if ($request->hasFile('photo')) {
            // Buat folder jika belum ada
            if (!file_exists(public_path('storage/kosts'))) {
                mkdir(public_path('storage/kosts'), 0755, true);
            }
            
            $photo = $request->file('photo');
            $photoName = time() . '_' . $photo->getClientOriginalName();
            $photo->move(public_path('storage/kosts'), $photoName);
            $validated['photo'] = 'storage/kosts/' . $photoName;
        }

        Kost::create($validated);

        return redirect()->route('kosts.index')
            ->with('success', 'Kost berhasil ditambahkan!');
    }

    public function show(Kost $kost)
    {
        $kost->load(['rooms', 'rooms.tenants']);
        
        return Inertia::render('Kosts/Show', [
            'kost' => $kost
        ]);
    }

    public function edit(Kost $kost)
    {
        return Inertia::render('Kosts/Edit', [
            'kost' => [
                'id' => $kost->id,
                'name' => $kost->name,
                'address' => $kost->address,
                'owner_name' => $kost->owner_name,
                'owner_phone' => $kost->owner_phone,
                'photo' => $kost->photo,
            ]
        ]);
    }

    public function update(Request $request, Kost $kost)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string',
            'owner_name' => 'required|string|max:255',
            'owner_phone' => 'required|string|max:20',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle foto upload
        if ($request->hasFile('photo')) {
            // Hapus foto lama jika ada
            if ($kost->photo && file_exists(public_path($kost->photo))) {
                unlink(public_path($kost->photo));
            }
            
            // Buat folder jika belum ada
            if (!file_exists(public_path('storage/kosts'))) {
                mkdir(public_path('storage/kosts'), 0755, true);
            }
            
            $photo = $request->file('photo');
            $photoName = time() . '_' . $photo->getClientOriginalName();
            $photo->move(public_path('storage/kosts'), $photoName);
            $validated['photo'] = 'storage/kosts/' . $photoName;
        }

        $kost->update($validated);

        return redirect()->route('kosts.index')
            ->with('success', 'Kost berhasil diupdate!');
    }

    public function destroy(Kost $kost)
    {
        // Hapus foto jika ada
        if ($kost->photo && file_exists(public_path($kost->photo))) {
            unlink(public_path($kost->photo));
        }

        $kost->delete();

        return redirect()->route('kosts.index')
            ->with('success', 'Kost berhasil dihapus!');
    }
}