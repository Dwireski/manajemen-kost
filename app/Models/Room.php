<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'kost_id',
        'room_number',
        'price',
        'status',
    ];

    public function kost()
    {
        return $this->belongsTo(Kost::class);
    }

    public function tenants()
    {
        return $this->hasMany(Tenant::class);
    }
}