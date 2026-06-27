<?php

namespace App\Http\Controllers;

use App\Models\Kost;
use App\Models\Room;
use App\Models\Tenant;
use App\Models\Payment;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Statistik Dasar
        $stats = [
            'total_kosts' => Kost::count(),
            'total_rooms' => Room::count(),
            'available_rooms' => Room::where('status', 'available')->count(),
            'occupied_rooms' => Room::where('status', 'occupied')->count(),
            'total_tenants' => Tenant::count(),
            'total_revenue' => Payment::where('status', 'paid')->sum('amount'),
            'pending_payments' => Payment::where('status', 'pending')->count(),
            'overdue_payments' => Payment::where('status', 'overdue')->count(),
        ];

        // 2. Data List
        $recentPayments = Payment::with(['tenant.room.kost'])
            ->latest()
            ->limit(5)
            ->get();

        $expiringTenants = Tenant::with(['room.kost'])
            ->whereNotNull('move_out_date')
            ->whereBetween('move_out_date', [now(), now()->addDays(30)])
            ->get();

        // 3. ✅ DATA BARU UNTUK CHART
        
        // Grafik Pendapatan 6 Bulan Terakhir
        $monthlyRevenue = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = Carbon::now()->subMonths($i);
            $revenue = Payment::where('status', 'paid')
                ->whereMonth('created_at', $month->month)
                ->whereYear('created_at', $month->year)
                ->sum('amount');
                
            $monthlyRevenue[] = [
                'month' => $month->format('M Y'),
                'revenue' => (int) $revenue,
            ];
        }

        // Distribusi Status Kamar
        $roomStatusData = [
            ['name' => 'Tersedia', 'value' => Room::where('status', 'available')->count(), 'color' => '#10B981'],
            ['name' => 'Terisi', 'value' => Room::where('status', 'occupied')->count(), 'color' => '#EF4444'],
            ['name' => 'Perbaikan', 'value' => Room::where('status', 'maintenance')->count(), 'color' => '#F59E0B'],
        ];

        // Distribusi Status Pembayaran
        $paymentStatusData = [
            ['name' => 'Lunas', 'value' => Payment::where('status', 'paid')->count(), 'color' => '#10B981'],
            ['name' => 'Pending', 'value' => Payment::where('status', 'pending')->count(), 'color' => '#F59E0B'],
            ['name' => 'Terlambat', 'value' => Payment::where('status', 'overdue')->count(), 'color' => '#EF4444'],
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentPayments' => $recentPayments,
            'expiringTenants' => $expiringTenants,
            'monthlyRevenue' => $monthlyRevenue,
            'roomStatusData' => $roomStatusData,
            'paymentStatusData' => $paymentStatusData,
        ]);
    }
}