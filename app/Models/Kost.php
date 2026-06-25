<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kost extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'owner_name',
        'owner_phone',
        'photo',
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class);
    }
}