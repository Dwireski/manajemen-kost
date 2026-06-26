<?php

use App\Http\Controllers\KostController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// ==========================================
// ROUTE PUBLIK (TANPA LOGIN)
// ==========================================
Route::get('/', [PublicController::class, 'index'])->name('public.index');
Route::get('/kost/{id}', [PublicController::class, 'show'])->name('public.show');

// ==========================================
// ROUTE YANG BUTUH AUTHENTICATION
// ==========================================
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        $stats = [
            'total_kosts' => \App\Models\Kost::count(),
            'total_rooms' => \App\Models\Room::count(),
            'available_rooms' => \App\Models\Room::where('status', 'available')->count(),
            'occupied_rooms' => \App\Models\Room::where('status', 'occupied')->count(),
            'total_tenants' => \App\Models\Tenant::count(),
            'total_revenue' => \App\Models\Payment::where('status', 'paid')->sum('amount'),
            'pending_payments' => \App\Models\Payment::where('status', 'pending')->count(),
            'overdue_payments' => \App\Models\Payment::where('status', 'overdue')->count(),
        ];
        
        $recentPayments = \App\Models\Payment::with(['tenant.room.kost'])
            ->latest()
            ->limit(5)
            ->get();
        
        $expiringTenants = \App\Models\Tenant::with(['room.kost'])
            ->whereNotNull('move_out_date')
            ->whereBetween('move_out_date', [now(), now()->addDays(30)])
            ->get();
        
        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentPayments' => $recentPayments,
            'expiringTenants' => $expiringTenants,
        ]);
    })->name('dashboard');

    // Profile routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Routes untuk Manajemen Kost
    Route::resource('kosts', KostController::class);
    
    // ✅ ROUTE BARU: Kelola foto galeri kost
    Route::delete('/kost-photos/{photo}', [KostController::class, 'deletePhoto'])
        ->name('kosts.photos.delete');
    Route::post('/kosts/{kost}/reorder-photos', [KostController::class, 'reorderPhotos'])
        ->name('kosts.photos.reorder');
    
    Route::resource('rooms', RoomController::class);
    Route::resource('tenants', TenantController::class);
    
    // Export PDF harus SEBELUM resource payments
    Route::get('/payments/export-pdf', [PaymentController::class, 'exportPdf'])->name('payments.export-pdf');
    Route::resource('payments', PaymentController::class);
});

// Authentication routes (login, register, forgot password)
require __DIR__.'/auth.php';