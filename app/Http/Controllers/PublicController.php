<?php

namespace App\Http\Controllers;

use App\Models\Kost;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicController extends Controller
{
    public function index(Request $request)
    {
        $query = Kost::with(['rooms' => function($q) {
            $q->where('status', 'available');
        }]);

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%");
            });
        }

        // Filter harga
        if ($request->has('max_price') && $request->max_price) {
            $query->whereHas('rooms', function($q) use ($request) {
                $q->where('status', 'available')
                  ->where('price', '<=', $request->max_price);
            });
        }

        $kosts = $query->latest()->get();

        // Format data
        $kosts = $kosts->map(function($kost) {
            $availableRooms = $kost->rooms->where('status', 'available');
            $minPrice = $availableRooms->min('price');
            
            return [
                'id' => $kost->id,
                'name' => $kost->name,
                'address' => $kost->address,
                'owner_name' => $kost->owner_name,
                'owner_phone' => $kost->owner_phone,
                'photo' => $kost->photo,
                'available_rooms_count' => $availableRooms->count(),
                'min_price' => $minPrice,
                'rooms' => $availableRooms->map(function($room) {
                    return [
                        'id' => $room->id,
                        'room_number' => $room->room_number,
                        'price' => $room->price,
                    ];
                }),
            ];
        });

        return Inertia::render('Public/Index', [
            'kosts' => $kosts,
            'filters' => $request->only(['search', 'max_price']),
        ]);
    }

    public function show($id)
{
    // ✅ TAMBAHKAN 'photos' di with()
    $kost = Kost::with(['rooms' => function($q) {
        $q->where('status', 'available');
    }, 'photos'])->findOrFail($id);

    $availableRooms = $kost->rooms->where('status', 'available');

    return Inertia::render('Public/Show', [
        'kost' => [
            'id' => $kost->id,
            'name' => $kost->name,
            'address' => $kost->address,
            'owner_name' => $kost->owner_name,
            'owner_phone' => $kost->owner_phone,
            'photo' => $kost->photo,
            // ✅ TAMBAHKAN: Mapping galeri foto
            'photos' => $kost->photos->map(function($photo) {
                return [
                    'id' => $photo->id,
                    'file_path' => $photo->file_path,
                    'url' => $photo->file_path,
                    'sort_order' => $photo->sort_order,
                ];
            })->sortBy('sort_order')->values(),
            'available_rooms' => $availableRooms->map(function($room) {
                return [
                    'id' => $room->id,
                    'room_number' => $room->room_number,
                    'price' => $room->price,
                    'status' => $room->status,
                ];
            }),
        ],
    ]);
}
}