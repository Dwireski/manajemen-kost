<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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

    // ✅ PERBAIKAN: Method untuk hapus file foto dari storage
    // Pakai public_path() + unlink() agar konsisten dengan KostController
    public function deleteFile()
    {
        if ($this->file_path && file_exists(public_path($this->file_path))) {
            unlink(public_path($this->file_path));
        }
    }
}