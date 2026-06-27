<?php

namespace Database\Factories;

use App\Models\Kost;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as FakerFactory;

class RoomFactory extends Factory
{
    public function definition(): array
    {
        $faker = FakerFactory::create();
        $statuses = ['available', 'occupied', 'maintenance'];
        
        return [
            'kost_id' => Kost::inRandomOrder()->first()->id ?? Kost::factory(),
            'room_number' => $faker->unique()->numberBetween(101, 350),
            'price' => $faker->randomElement([500000, 600000, 700000, 750000, 800000, 850000, 900000, 1000000, 1200000, 1500000]),
            'status' => $faker->randomElement($statuses),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}