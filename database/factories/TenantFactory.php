<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as FakerFactory;

class TenantFactory extends Factory
{
    public function definition(): array
    {
        $faker = FakerFactory::create();
        
        $room = Room::where('status', 'occupied')->inRandomOrder()->first();
        
        if (!$room) {
            $room = Room::inRandomOrder()->first();
        }
        
        if (!$room) {
            $room = Room::factory()->create(['status' => 'occupied']);
        }

        return [
            'room_id' => $room->id,
            'name' => $faker->name(),
            'phone' => '08' . $faker->randomNumber(9, true),
            'move_in_date' => $faker->dateTimeBetween('-1 year', 'now'),
            'move_out_date' => $faker->optional(0.3)->dateTimeBetween('now', '+1 year'),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}