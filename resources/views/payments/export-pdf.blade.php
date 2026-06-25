<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Laporan Pembayaran</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            color: #333;
        }
        .header p {
            margin: 5px 0;
            color: #666;
        }
        .info-box {
            background-color: #f5f5f5;
            padding: 10px;
            margin-bottom: 20px;
            border-left: 4px solid #007bff;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table thead {
            background-color: #007bff;
            color: white;
        }
        table th, table td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        table th {
            font-weight: bold;
        }
        table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .status-badge {
            padding: 3px 8px;
            border-radius: 3px;
            font-size: 10px;
            font-weight: bold;
        }
        .status-paid {
            background-color: #d4edda;
            color: #155724;
        }
        .status-pending {
            background-color: #fff3cd;
            color: #856404;
        }
        .status-overdue {
            background-color: #f8d7da;
            color: #721c24;
        }
        .total-box {
            margin-top: 30px;
            padding: 15px;
            background-color: #e7f3ff;
            border: 2px solid #007bff;
            text-align: right;
        }
        .total-box h3 {
            margin: 0;
            font-size: 18px;
            color: #007bff;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 10px;
            color: #999;
            border-top: 1px solid #ddd;
            padding-top: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>LAPORAN PEMBAYARAN KOST</h1>
        <p>Sistem Manajemen Kost</p>
        <p>Tanggal Cetak: {{ date('d F Y') }}</p>
    </div>

    @if($startDate || $endDate)
    <div class="info-box">
        <strong>Periode:</strong>
        @if($startDate)
            {{ \Carbon\Carbon::parse($startDate)->format('d F Y') }}
        @else
            Awal
        @endif
        s/d
        @if($endDate)
            {{ \Carbon\Carbon::parse($endDate)->format('d F Y') }}
        @else
            Sekarang
        @endif
    </div>
    @endif

    <table>
        <thead>
            <tr>
                <th width="5%">No</th>
                <th width="15%">Tanggal</th>
                <th width="20%">Penyewa</th>
                <th width="20%">Kost/Kamar</th>
                <th width="15%">Jumlah</th>
                <th width="10%">Status</th>
                <th width="15%">Keterangan</th>
            </tr>
        </thead>
        <tbody>
            @forelse($payments as $index => $payment)
            <tr>
                <td>{{ $index + 1 }}</td>
                <td>{{ \Carbon\Carbon::parse($payment->payment_date)->format('d/m/Y') }}</td>
                <td>{{ $payment->tenant->name }}</td>
                <td>{{ $payment->tenant->room->kost->name }}<br><small>Kamar {{ $payment->tenant->room->room_number }}</small></td>
                <td>Rp {{ number_format($payment->amount, 0, ',', '.') }}</td>
                <td>
                    <span class="status-badge status-{{ $payment->status }}">
                        @if($payment->status == 'paid')
                            Lunas
                        @elseif($payment->status == 'pending')
                            Pending
                        @else
                            Terlambat
                        @endif
                    </span>
                </td>
                <td>{{ $payment->description ?? '-' }}</td>
            </tr>
            @empty
            <tr>
                <td colspan="7" style="text-align: center;">Tidak ada data pembayaran</td>
            </tr>
            @endforelse
        </tbody>
    </table>

    <div class="total-box">
        <h3>TOTAL PEMBAYARAN LUNAS: Rp {{ number_format($totalAmount, 0, ',', '.') }}</h3>
    </div>

    <div class="footer">
        <p>Dokumen ini dicetak secara otomatis oleh Sistem Manajemen Kost</p>
        <p>© {{ date('Y') }} - Generated on {{ date('d/m/Y H:i:s') }}</p>
    </div>
</body>
</html>