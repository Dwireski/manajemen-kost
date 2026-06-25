<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

class TenantFactory extends Factory
{
    public function definition(): array
    {
        // Ambil room yang occupied, kalau tidak ada ambil random room
        $room = Room::where('status', 'occupied')->inRandomOrder()->first();
        
        // Fallback: kalau tidak ada room occupied, ambil room random manapun
        if (!$room) {
            $room = Room::inRandomOrder()->first();
        }
        
        // Last resort: kalau masih tidak ada, buat room baru
        if (!$room) {
            $room = Room::factory()->create(['status' => 'occupied']);
        }

        return [
            'room_id' => $room->id,
            'name' => fake()->name(),
            'phone' => '08' . fake()->randomNumber(9, true),
            'move_in_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'move_out_date' => fake()->optional(0.3)->dateTimeBetween('now', '+1 year'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}