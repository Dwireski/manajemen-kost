<?php

namespace Database\Seeders;

use App\Models\Kost;
use App\Models\Room;
use App\Models\Tenant;
use App\Models\Payment;
use Illuminate\Database\Seeder;

class DemoDataSeeder extends Seeder
{
    public function run(): void
    {
        $kostData = [
            [
                'name' => 'Kost Putra Semangka 39 Dermo',
                'address' => 'Jalan Semangka 65151 Dau East Java',
                'owner_name' => 'Bambang Herlambang',
                'owner_phone' => '0896-8083-5082',
            ],
            [
                'name' => 'Kost Putra Landungsari Dekat UMM 2',
                'address' => 'Perum Landungsari Permai No.A3, Dusun Bend., Landungsari, Kec. Dau, Kabupaten Malang, Jawa Timur 65151',
                'owner_name' => 'Faizal Kaharudin Moenir',
                'owner_phone' => '0878-4134-5512',
            ],
        ];

        // Tambah 18 kost lagi secara otomatis
        for ($i = 3; $i <= 20; $i++) {
            $kostData[] = [
                'name' => 'Kost Putra ' . fake()->city() . ' ' . $i,
                'address' => fake()->address(),
                'owner_name' => fake()->name(),
                'owner_phone' => '08' . fake()->randomNumber(9, true),
            ];
        }

        foreach ($kostData as $data) {
            Kost::create($data);
        }

        echo "✅ 20 Kost berhasil dibuat\n";

        // Generate rooms untuk setiap kost
        $kosts = Kost::all();
        foreach ($kosts as $kost) {
            for ($j = 1; $j <= 3; $j++) {
                Room::create([
                    'kost_id' => $kost->id,
                    'room_number' => 100 + $j + (($kost->id - 1) * 10),
                    'price' => fake()->randomElement([500000, 600000, 700000, 800000, 900000, 1000000]),
                    'status' => fake()->randomElement(['available', 'occupied', 'available', 'available']),
                ]);
            }
        }

        echo "✅ Rooms berhasil dibuat\n";

        // Generate tenants untuk kamar yang occupied
        $occupiedRooms = Room::where('status', 'occupied')->get();
        foreach ($occupiedRooms as $room) {
            Tenant::create([
                'room_id' => $room->id,
                'name' => fake()->name(),
                'phone' => '08' . fake()->randomNumber(9, true),
                'move_in_date' => fake()->dateTimeBetween('-6 months', 'now'),
                'move_out_date' => null,
            ]);
        }

        echo "✅ Tenants berhasil dibuat\n";

        // Generate payments
        $tenants = Tenant::all();
        foreach ($tenants as $tenant) {
            for ($k = 1; $k <= 3; $k++) {
                Payment::create([
                    'tenant_id' => $tenant->id,
                    'amount' => $tenant->room->price,
                    'payment_date' => fake()->dateTimeBetween('-6 months', 'now'),
                    'status' => fake()->randomElement(['paid', 'pending', 'overdue']),
                    'description' => 'Pembayaran bulan ke-' . $k,
                ]);
            }
        }

        echo "✅ Payments berhasil dibuat\n";
        echo "\n🎉 SELESAI!\n";
    }
}