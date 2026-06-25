<?php

namespace Database\Factories;

use App\Models\Kost;
use Illuminate\Database\Eloquent\Factories\Factory;

class RoomFactory extends Factory
{
    public function definition(): array
    {
        $statuses = ['available', 'occupied', 'maintenance'];
        
        return [
            'kost_id' => Kost::inRandomOrder()->first()->id ?? Kost::factory(),
            'room_number' => fake()->unique()->numberBetween(101, 350),
            'price' => fake()->randomElement([500000, 600000, 700000, 750000, 800000, 850000, 900000, 1000000, 1200000, 1500000]),
            'status' => fake()->randomElement($statuses),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}