<?php

namespace Database\Seeders;

use App\Models\Kost;
use App\Models\Room;
use App\Models\Tenant;
use App\Models\Payment;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ✅ 0. Panggil UserSeeder DULU (paling penting!)
        $this->call([
            UserSeeder::class,
        ]);

        // 1. Generate 20 Kost
        Kost::factory()->count(20)->create();
        echo "✅ 20 Kost berhasil dibuat\n";

        // 2. Generate 60 Rooms (3 rooms per kost average)
        Room::factory()->count(60)->create();
        echo "✅ 60 Rooms berhasil dibuat\n";

        // 3. Update 40% rooms menjadi 'occupied'
        $totalRooms = Room::count();
        $occupiedCount = (int) ($totalRooms * 0.4);
        
        Room::inRandomOrder()
            ->limit($occupiedCount)
            ->update(['status' => 'occupied']);
        
        echo "✅ {$occupiedCount} Rooms diubah menjadi occupied\n";

        // 4. Generate Tenants untuk setiap room yang occupied
        $occupiedRooms = Room::where('status', 'occupied')->get();
        
        foreach ($occupiedRooms as $room) {
            Tenant::create([
                'room_id' => $room->id,
                'name' => fake()->name(),
                'phone' => '08' . fake()->randomNumber(9, true),
                'move_in_date' => fake()->dateTimeBetween('-1 year', 'now'),
                'move_out_date' => fake()->optional(0.3)->dateTimeBetween('now', '+1 year'),
            ]);
        }
        
        echo "✅ " . $occupiedRooms->count() . " Tenants berhasil dibuat\n";

        // 5. Generate 3 Payments untuk setiap tenant
        $tenants = Tenant::all();
        $paymentCount = 0;
        
        foreach ($tenants as $tenant) {
            for ($i = 0; $i < 3; $i++) {
                Payment::create([
                    'tenant_id' => $tenant->id,
                    'amount' => $tenant->room->price ?? fake()->randomElement([500000, 750000, 1000000]),
                    'payment_date' => fake()->dateTimeBetween('-6 months', 'now'),
                    'status' => fake()->randomElement(['paid', 'pending', 'overdue']),
                    'description' => 'Pembayaran bulan ke-' . ($i + 1),
                ]);
                $paymentCount++;
            }
        }
        
        echo "✅ {$paymentCount} Payments berhasil dibuat\n";

        echo "\n🎉 SELESAI! Data berhasil di-generate:\n";
        echo "   - " . \App\Models\User::count() . " Users\n";
        echo "   - " . Kost::count() . " Kost\n";
        echo "   - " . Room::count() . " Kamar\n";
        echo "   - " . Tenant::count() . " Penyewa\n";
        echo "   - " . Payment::count() . " Pembayaran\n";
    }
}