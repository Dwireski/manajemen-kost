<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Kost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    public function index(Request $request)
{
    $query = Room::with(['kost', 'tenants']);
    
    // Filter by status
    if ($request->has('status') && $request->status) {
        $query->where('status', $request->status);
    }
    
    // Filter by kost_id
    if ($request->has('kost_id') && $request->kost_id) {
        $query->where('kost_id', $request->kost_id);
    }
    
    $rooms = $query->latest()->get();
    $kosts = Kost::all();
    
    return Inertia::render('Rooms/Index', [
        'rooms' => $rooms,
        'kosts' => $kosts,
        'filters' => $request->only(['status', 'kost_id']),
    ]);
}

    public function create()
    {
        $kosts = Kost::all();
        
        return Inertia::render('Rooms/Create', [
            'kosts' => $kosts
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'kost_id' => 'required|exists:kosts,id',
            'room_number' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:available,occupied,maintenance',
        ]);

        Room::create($validated);

        return redirect()->route('rooms.index')
            ->with('success', 'Kamar berhasil ditambahkan!');
    }

    public function show(Room $room)
    {
        $room->load(['kost', 'tenants.payments']);
        
        return Inertia::render('Rooms/Show', [
            'room' => $room
        ]);
    }

    public function edit(Room $room)
    {
        $kosts = Kost::all();
        
        return Inertia::render('Rooms/Edit', [
            'room' => $room,
            'kosts' => $kosts
        ]);
    }

    public function update(Request $request, Room $room)
    {
        $validated = $request->validate([
            'kost_id' => 'required|exists:kosts,id',
            'room_number' => 'required|string|max:50',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:available,occupied,maintenance',
        ]);

        $room->update($validated);

        return redirect()->route('rooms.index')
            ->with('success', 'Kamar berhasil diupdate!');
    }

    public function destroy(Room $room)
    {
        $room->delete();

        return redirect()->route('rooms.index')
            ->with('success', 'Kamar berhasil dihapus!');
    }
}