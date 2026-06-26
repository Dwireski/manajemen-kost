<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class KostPhoto extends Model
{
    protected $fillable = [
        'kost_id',
        'file_path',
        'sort_order',
    ];

    // Relasi: Satu foto milik satu kost
    public function kost()
    {
        return $this->belongsTo(Kost::class);
    }

    // Accessor: Mengembalikan URL foto lengkap
    public function getUrlAttribute()
    {
        return $this->file_path ? '/' . $this->file_path : null;
    }

    // Method untuk hapus file foto dari storage
    public function deleteFile()
    {
        if ($this->file_path && Storage::disk('public')->exists($this->file_path)) {
            Storage::disk('public')->delete($this->file_path);
        }
    }
}