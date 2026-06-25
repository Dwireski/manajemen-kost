<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class PaymentController extends Controller
{
    public function index(Request $request)
    {
        $query = Payment::with(['tenant.room.kost']);
        
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->whereHas('tenant', function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }
        
        $payments = $query->latest()->get();
        
        return Inertia::render('Payments/Index', [
            'payments' => $payments,
            'filters' => $request->only(['search']),
        ]);
    }

    public function create()
    {
        $tenants = Tenant::with(['room.kost'])->get();
        
        return Inertia::render('Payments/Create', [
            'tenants' => $tenants
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'status' => 'required|in:paid,pending,overdue',
            'description' => 'nullable|string|max:255',
        ]);

        Payment::create($validated);

        return redirect()->route('payments.index')
            ->with('success', 'Pembayaran berhasil dicatat!');
    }

    public function show(Payment $payment)
    {
        $payment->load(['tenant.room.kost']);
        
        return Inertia::render('Payments/Show', [
            'payment' => $payment
        ]);
    }

    public function edit(Payment $payment)
    {
        $tenants = Tenant::with(['room.kost'])->get();
        
        return Inertia::render('Payments/Edit', [
            'payment' => $payment,
            'tenants' => $tenants
        ]);
    }

    public function update(Request $request, Payment $payment)
    {
        $validated = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'amount' => 'required|numeric|min:0',
            'payment_date' => 'required|date',
            'status' => 'required|in:paid,pending,overdue',
            'description' => 'nullable|string|max:255',
        ]);

        $payment->update($validated);

        return redirect()->route('payments.index')
            ->with('success', 'Pembayaran berhasil diupdate!');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();

        return redirect()->route('payments.index')
            ->with('success', 'Pembayaran berhasil dihapus!');
    }

    public function exportPdf(Request $request)
    {
        $query = Payment::with(['tenant.room.kost']);
        
        if ($request->has('start_date') && $request->start_date) {
            $query->where('payment_date', '>=', $request->start_date);
        }
        
        if ($request->has('end_date') && $request->end_date) {
            $query->where('payment_date', '<=', $request->end_date);
        }
        
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }
        
        $payments = $query->latest()->get();
        $totalAmount = $payments->where('status', 'paid')->sum('amount');
        
        $pdf = Pdf::loadView('payments.export-pdf', [
            'payments' => $payments,
            'totalAmount' => $totalAmount,
            'startDate' => $request->start_date,
            'endDate' => $request->end_date,
        ]);
        
        $filename = 'laporan-pembayaran-' . date('Y-m-d') . '.pdf';
        
        return response()->stream(
            function() use ($pdf) {
                echo $pdf->output();
            },
            200,
            [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0',
            ]
        );
    }
}