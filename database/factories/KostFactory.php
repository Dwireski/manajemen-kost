<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as FakerFactory;

class KostFactory extends Factory
{
    public function definition(): array
    {
        $faker = FakerFactory::create();
        
        $kostNames = [
            'Kost Putra', 'Kost Putri', 'Kost Campur', 'Griya Kost', 'Rumah Kost',
            'Kost Eksklusif', 'Kost Premium', 'Kost Nyaman', 'Kost Strategis', 'Kost Modern'
        ];
        
        $locations = [
            'Jalan Semangka', 'Jalan Mawar', 'Jalan Melati', 'Jalan Anggrek',
            'Jalan Dahlia', 'Jalan Kenanga', 'Jalan Flamboyan', 'Jalan Beringin',
            'Perumahan Landungsari', 'Perumahan Sawojajar', 'Perumahan Tlogomas',
            'Jalan Soekarno Hatta', 'Jalan Veteran', 'Jalan Basuki Rahmat'
        ];

        $areas = [
            'Dau', 'Lowokwaru', 'Klojen', 'Blimbing', 'Sukun',
            'Dinoyo', 'Ketawanggede', 'Tlogomas', 'Landungsari', 'Sumbersari'
        ];

        $cities = [
            'Ziemestad', 'Breannemouth', 'Ellieport', 'Lilianatown', 
            'New Lilianatown', 'East Java', 'West Java', 'Central Java'
        ];

        $photoIds = [
            'photo-1522708323590-d24dbb6b0267',
            'photo-1560448204-e02f11c3d0e2',
            'photo-1595526114035-0d45ed16cfbf',
            'photo-1505691938895-1758d7feb511',
            'photo-1560185007-cde436f6a4d0',
            'photo-1586023492125-27b2c045efd7',
            'photo-1600596542815-ffad4c1539a9',
            'photo-1600585154340-be6161a56a0c',
            'photo-1600607687939-ce8a6c25118c',
            'photo-1600566753190-17f0baa2a6c3',
            'photo-1600573472592-401b489a3cdc',
            'photo-1600047509807-ba8f99d2cdde',
            'photo-1613490493576-7fde63acd811',
            'photo-1613977257363-707ba9348227',
            'photo-1600210492486-724fe5c67fb0',
        ];

        return [
            'name' => $faker->randomElement($kostNames) . ' ' . 
                    $faker->randomElement($cities) . ' ' . 
                    $faker->randomNumber(3, true),
            'address' => $faker->randomElement($locations) . ' No.' . 
                        $faker->randomNumber(2, true) . ', ' . 
                        $faker->randomElement($areas) . ', Kec. ' . 
                        $faker->randomElement($areas) . ', Kabupaten Malang, Jawa Timur',
            'owner_name' => $faker->name(),
            'owner_phone' => '08' . $faker->randomNumber(9, true),
            'photo' => 'https://images.unsplash.com/' . $faker->randomElement($photoIds) . '?w=800&q=80',
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}