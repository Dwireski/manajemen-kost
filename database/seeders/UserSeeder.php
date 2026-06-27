<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ✅ Buat User Admin Default
        User::create([
            'name' => 'Admin Kost',
            'email' => 'admin@kost.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
        ]);

        echo "✅ User Admin berhasil dibuat (admin@kost.com / password)\n";

        // ✅ Buat 5 User Tambahan (Opsional, untuk testing multi-user)
        $users = [
            [
                'name' => 'Budi Santoso',
                'email' => 'budi@kost.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Siti Rahayu',
                'email' => 'siti@kost.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Andi Wijaya',
                'email' => 'andi@kost.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Dewi Lestari',
                'email' => 'dewi@kost.com',
                'password' => Hash::make('password'),
            ],
            [
                'name' => 'Rudi Hermawan',
                'email' => 'rudi@kost.com',
                'password' => Hash::make('password'),
            ],
        ];

        foreach ($users as $user) {
            User::create([
                'name' => $user['name'],
                'email' => $user['email'],
                'email_verified_at' => now(),
                'password' => $user['password'],
            ]);
        }

        echo "✅ 5 User tambahan berhasil dibuat\n";
    }
}