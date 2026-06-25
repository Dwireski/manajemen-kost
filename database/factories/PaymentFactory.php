<?php

namespace Database\Factories;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaymentFactory extends Factory
{
    public function definition(): array
    {
        $statuses = ['paid', 'pending', 'overdue'];
        $tenant = Tenant::inRandomOrder()->first();
        
        return [
            'tenant_id' => $tenant ? $tenant->id : Tenant::factory(),
            'amount' => fake()->randomElement([500000, 600000, 700000, 750000, 800000, 850000, 900000, 1000000, 1200000]),
            'payment_date' => fake()->dateTimeBetween('-6 months', 'now'),
            'status' => fake()->randomElement($statuses),
            'description' => fake()->optional(0.7)->sentence(),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}