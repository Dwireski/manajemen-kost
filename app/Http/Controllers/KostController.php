<?php

namespace App\Http\Controllers;

use App\Models\Kost;
use App\Models\KostPhoto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KostController extends Controller
{
    public function index(Request $request)
    {
        $query = Kost::with(['rooms', 'photos']);
        
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
            // ✅ Validasi baru untuk galeri foto (max 10 foto)
            'photos' => 'nullable|array|max:10',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Handle foto utama (cover) upload - FITUR LAMA
        if ($request->hasFile('photo')) {
            if (!file_exists(public_path('storage/kosts'))) {
                mkdir(public_path('storage/kosts'), 0755, true);
            }
            
            $photo = $request->file('photo');
            $photoName = time() . '_' . $photo->getClientOriginalName();
            $photo->move(public_path('storage/kosts'), $photoName);
            $validated['photo'] = 'storage/kosts/' . $photoName;
        }

        $kost = Kost::create($validated);

        // ✅ Handle galeri foto multi-upload - FITUR BARU
        if ($request->hasFile('photos')) {
            if (!file_exists(public_path('storage/kosts'))) {
                mkdir(public_path('storage/kosts'), 0755, true);
            }

            foreach ($request->file('photos') as $index => $file) {
                $fileName = time() . '_' . $index . '_' . $file->getClientOriginalName();
                $file->move(public_path('storage/kosts'), $fileName);
                
                KostPhoto::create([
                    'kost_id' => $kost->id,
                    'file_path' => 'storage/kosts/' . $fileName,
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()->route('kosts.index')
            ->with('success', 'Kost berhasil ditambahkan!');
    }

    public function show(Kost $kost)
    {
        // ✅ Load relasi photos juga
        $kost->load(['rooms', 'rooms.tenants', 'photos']);
        
        return Inertia::render('Kosts/Show', [
            'kost' => $kost
        ]);
    }

    public function edit(Kost $kost)
    {
        // ✅ Load relasi photos untuk ditampilkan di form edit
        $kost->load('photos');
        
        return Inertia::render('Kosts/Edit', [
            'kost' => [
                'id' => $kost->id,
                'name' => $kost->name,
                'address' => $kost->address,
                'owner_name' => $kost->owner_name,
                'owner_phone' => $kost->owner_phone,
                'photo' => $kost->photo,
                'photos' => $kost->photos->map(function($photo) {
                    return [
                        'id' => $photo->id,
                        'url' => '/' . $photo->file_path,
                        'file_path' => $photo->file_path,
                        'sort_order' => $photo->sort_order,
                    ];
                }),
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
            // ✅ Validasi baru untuk galeri foto
            'photos' => 'nullable|array|max:10',
            'photos.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            // ✅ Array ID foto yang dihapus (dari frontend)
            'deleted_photo_ids' => 'nullable|array',
            'deleted_photo_ids.*' => 'integer|exists:kost_photos,id',
        ]);

        // Handle foto utama (cover) upload - FITUR LAMA
        if ($request->hasFile('photo')) {
            if ($kost->photo && file_exists(public_path($kost->photo))) {
                unlink(public_path($kost->photo));
            }
            
            if (!file_exists(public_path('storage/kosts'))) {
                mkdir(public_path('storage/kosts'), 0755, true);
            }
            
            $photo = $request->file('photo');
            $photoName = time() . '_' . $photo->getClientOriginalName();
            $photo->move(public_path('storage/kosts'), $photoName);
            $validated['photo'] = 'storage/kosts/' . $photoName;
        }

        // Hapus field photos & deleted_photo_ids dari validated (tidak masuk ke tabel kosts)
        unset($validated['photos'], $validated['deleted_photo_ids']);
        
        $kost->update($validated);

        // ✅ Hapus foto galeri yang ditandai untuk dihapus
        if ($request->has('deleted_photo_ids') && is_array($request->deleted_photo_ids)) {
            $photosToDelete = KostPhoto::whereIn('id', $request->deleted_photo_ids)
                ->where('kost_id', $kost->id)
                ->get();
            
            foreach ($photosToDelete as $photo) {
                $photo->deleteFile(); // Hapus file fisik
                $photo->delete();     // Hapus record database
            }
        }

        // ✅ Tambah foto galeri baru
        if ($request->hasFile('photos')) {
            if (!file_exists(public_path('storage/kosts'))) {
                mkdir(public_path('storage/kosts'), 0755, true);
            }

            // Dapatkan sort_order tertinggi saat ini
            $maxOrder = $kost->photos()->max('sort_order') ?? -1;

            foreach ($request->file('photos') as $index => $file) {
                $fileName = time() . '_' . ($maxOrder + $index + 1) . '_' . $file->getClientOriginalName();
                $file->move(public_path('storage/kosts'), $fileName);
                
                KostPhoto::create([
                    'kost_id' => $kost->id,
                    'file_path' => 'storage/kosts/' . $fileName,
                    'sort_order' => $maxOrder + $index + 1,
                ]);
            }
        }

        return redirect()->route('kosts.index')
            ->with('success', 'Kost berhasil diupdate!');
    }

    public function destroy(Kost $kost)
    {
        // Hapus foto utama jika ada - FITUR LAMA
        if ($kost->photo && file_exists(public_path($kost->photo))) {
            unlink(public_path($kost->photo));
        }

        // ✅ Hapus semua foto galeri - FITUR BARU
        foreach ($kost->photos as $photo) {
            $photo->deleteFile(); // Hapus file fisik
        }
        $kost->photos()->delete(); // Hapus record database (cascade)

        $kost->delete();

        return redirect()->route('kosts.index')
            ->with('success', 'Kost berhasil dihapus!');
    }

    // ✅ METHOD BARU: Hapus satu foto galeri via AJAX
    public function deletePhoto(KostPhoto $photo)
    {
        // Pastikan foto milik kost yang benar (opsional, untuk keamanan)
        $kostId = $photo->kost_id;
        
        $photo->deleteFile();
        $photo->delete();

        return redirect()->back()
            ->with('success', 'Foto berhasil dihapus!');
    }

    // ✅ METHOD BARU: Reorder foto galeri via AJAX
    public function reorderPhotos(Request $request, Kost $kost)
    {
        $validated = $request->validate([
            'orders' => 'required|array',
            'orders.*.id' => 'required|integer|exists:kost_photos,id',
            'orders.*.sort_order' => 'required|integer|min:0',
        ]);

        foreach ($validated['orders'] as $order) {
            KostPhoto::where('id', $order['id'])
                ->where('kost_id', $kost->id)
                ->update(['sort_order' => $order['sort_order']]);
        }

        return response()->json(['success' => true]);
    }
}