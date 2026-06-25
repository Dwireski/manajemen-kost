<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index(Request $request)
    {
        $query = Tenant::with(['room.kost']);
        
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }
        
        $tenants = $query->latest()->get();
        
        return Inertia::render('Tenants/Index', [
            'tenants' => $tenants,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $rooms = Room::where('status', 'available')
            ->with('kost')
            ->get();
        
        return Inertia::render('Tenants/Create', [
            'rooms' => $rooms
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'move_in_date' => 'required|date',
            'move_out_date' => 'nullable|date|after:move_in_date',
        ]);

        $tenant = Tenant::create($validated);
        $tenant->room->update(['status' => 'occupied']);

        return redirect()->route('tenants.index')
            ->with('success', 'Penyewa berhasil ditambahkan!');
    }

    public function show(Tenant $tenant)
    {
        $tenant->load(['room.kost', 'payments']);
        
        return Inertia::render('Tenants/Show', [
            'tenant' => $tenant
        ]);
    }

    public function edit(Tenant $tenant)
    {
        $rooms = Room::where('status', 'available')
            ->with('kost')
            ->get();
        
        $currentRoom = $tenant->room;
        if ($currentRoom && !$rooms->contains('id', $currentRoom->id)) {
            $rooms->push($currentRoom);
        }
        
        return Inertia::render('Tenants/Edit', [
            'tenant' => $tenant,
            'rooms' => $rooms
        ]);
    }

    public function update(Request $request, Tenant $tenant)
    {
        $validated = $request->validate([
            'room_id' => 'required|exists:rooms,id',
            'name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'move_in_date' => 'required|date',
            'move_out_date' => 'nullable|date|after:move_in_date',
        ]);

        if ($tenant->room_id != $validated['room_id']) {
            $oldRoom = Room::find($tenant->room_id);
            if ($oldRoom) {
                $oldRoom->update(['status' => 'available']);
            }
            
            $newRoom = Room::find($validated['room_id']);
            if ($newRoom) {
                $newRoom->update(['status' => 'occupied']);
            }
        }

        $tenant->update($validated);

        return redirect()->route('tenants.index')
            ->with('success', 'Penyewa berhasil diupdate!');
    }

    public function destroy(Tenant $tenant)
    {
        $tenant->room->update(['status' => 'available']);
        $tenant->delete();

        return redirect()->route('tenants.index')
            ->with('success', 'Penyewa berhasil dihapus!');
    }
}