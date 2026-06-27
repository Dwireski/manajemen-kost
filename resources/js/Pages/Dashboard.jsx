import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
// ✅ Import Recharts
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    BarChart,
    Bar,
} from "recharts";

export default function Dashboard({
    stats,
    recentPayments,
    expiringTenants,
    monthlyRevenue,
    roomStatusData,
    paymentStatusData,
}) {
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatCurrency = (amount) => {
        return `Rp ${parseInt(amount).toLocaleString("id-ID")}`;
    };

    // Custom Tooltip untuk Chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-semibold text-gray-800 text-sm mb-1">
                        {label}
                    </p>
                    <p className="text-blue-600 font-bold text-sm">
                        {formatCurrency(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                    <div className="text-xs sm:text-sm text-gray-500">
                        {new Date().toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </div>
                </div>
            }
        >
            <Head title="Dashboard" />

            <div className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Welcome Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-sm p-4 sm:p-6 mb-6 sm:mb-8 text-white">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg sm:text-2xl font-bold mb-1">
                                    Selamat Datang Kembali! 👋
                                </h3>
                                <p className="text-blue-100 text-sm sm:text-base">
                                    Berikut ringkasan bisnis kost Anda hari ini
                                </p>
                            </div>
                            <div className="text-4xl sm:text-6xl opacity-20 flex-shrink-0">
                                🏠
                            </div>
                        </div>
                    </div>

                    {/* Statistik Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
                        {/* Total Kost */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:inline">
                                    Total
                                </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                                Total Kost
                            </h4>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                                {stats.total_kosts}
                            </p>
                            <div className="mt-2 sm:mt-3 text-xs text-green-600 font-medium">
                                📊 Aktif
                            </div>
                        </div>

                        {/* Total Kamar */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:inline">
                                    Unit
                                </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                                Total Kamar
                            </h4>
                            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                                {stats.total_rooms}
                            </p>
                            <div className="mt-2 sm:mt-3 text-xs text-purple-600 font-medium">
                                ️ Semua unit
                            </div>
                        </div>

                        {/* Kamar Tersedia */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:inline">
                                    Available
                                </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                                Kamar Tersedia
                            </h4>
                            <p className="text-2xl sm:text-3xl font-bold text-green-600">
                                {stats.available_rooms}
                            </p>
                            <div className="mt-2 sm:mt-3 text-xs text-gray-500 font-medium">
                                ✅ Siap disewa
                            </div>
                        </div>

                        {/* Total Pendapatan */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider hidden sm:inline">
                                    Revenue
                                </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-medium text-gray-500 mb-1">
                                Total Pendapatan
                            </h4>
                            <p className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
                                {formatCurrency(stats.total_revenue)}
                            </p>
                            <div className="mt-2 sm:mt-3 text-xs text-yellow-600 font-medium">
                                💰 Dari pembayaran lunas
                            </div>
                        </div>
                    </div>

                    {/* ========================================= */}
                    {/* ✅ BAGIAN CHART BARU DITAMBAHKAN DI SINI */}
                    {/* ========================================= */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                        {/* Chart 1: Pendapatan 6 Bulan Terakhir */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">
                                📈 Tren Pendapatan (6 Bulan)
                            </h3>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={monthlyRevenue}
                                        margin={{
                                            top: 5,
                                            right: 20,
                                            left: 0,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#f0f0f0"
                                        />
                                        <XAxis
                                            dataKey="month"
                                            tick={{ fontSize: 12 }}
                                        />
                                        <YAxis
                                            tick={{ fontSize: 12 }}
                                            tickFormatter={(value) =>
                                                `${value / 1000}k`
                                            }
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Line
                                            type="monotone"
                                            dataKey="revenue"
                                            stroke="#3B82F6"
                                            strokeWidth={3}
                                            dot={{ r: 5, fill: "#3B82F6" }}
                                            activeDot={{ r: 7 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Chart 2: Distribusi Kamar & Pembayaran */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Pie Chart Status Kamar */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2 text-center">
                                    Status Kamar
                                </h4>
                                <div className="h-48 w-full">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <PieChart>
                                            <Pie
                                                data={roomStatusData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={40}
                                                outerRadius={60}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {roomStatusData.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={entry.color}
                                                        />
                                                    ),
                                                )}
                                            </Pie>
                                            <Tooltip
                                                formatter={(value) =>
                                                    `${value} Kamar`
                                                }
                                            />
                                            <Legend
                                                wrapperStyle={{
                                                    fontSize: "10px",
                                                }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Bar Chart Status Pembayaran */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2 text-center">
                                    Status Pembayaran
                                </h4>
                                <div className="h-48 w-full">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart
                                            data={paymentStatusData}
                                            margin={{
                                                top: 5,
                                                right: 0,
                                                left: -20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                stroke="#f0f0f0"
                                            />
                                            <XAxis
                                                dataKey="name"
                                                tick={{ fontSize: 10 }}
                                            />
                                            <YAxis tick={{ fontSize: 10 }} />
                                            <Tooltip />
                                            <Bar
                                                dataKey="value"
                                                radius={[4, 4, 0, 0]}
                                            >
                                                {paymentStatusData.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={entry.color}
                                                        />
                                                    ),
                                                )}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        {/* Pembayaran Terbaru */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                        Pembayaran Terbaru
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Transaksi terakhir
                                    </p>
                                </div>
                                <Link
                                    href={route("payments.index")}
                                    className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm font-medium"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>
                            <div className="p-4 sm:p-6">
                                {recentPayments.length > 0 ? (
                                    <div className="space-y-2 sm:space-y-3">
                                        {recentPayments.map((payment) => (
                                            <div
                                                key={payment.id}
                                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition gap-2"
                                            >
                                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs sm:text-sm flex-shrink-0">
                                                        {payment.tenant?.name?.charAt(
                                                            0,
                                                        ) || "?"}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                                                            {
                                                                payment.tenant
                                                                    ?.name
                                                            }
                                                        </p>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {
                                                                payment.tenant
                                                                    ?.room?.kost
                                                                    ?.name
                                                            }{" "}
                                                            • Kamar{" "}
                                                            {
                                                                payment.tenant
                                                                    ?.room
                                                                    ?.room_number
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-left sm:text-right flex sm:flex-col justify-between items-center sm:items-end flex-shrink-0 border-t border-gray-200 sm:border-0 pt-2 sm:pt-0">
                                                    <p className="font-semibold text-gray-900 text-xs sm:text-sm">
                                                        {formatCurrency(
                                                            payment.amount,
                                                        )}
                                                    </p>
                                                    <span
                                                        className={`inline-flex px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-semibold rounded-full sm:mt-1 ${payment.status === "paid" ? "bg-green-100 text-green-700" : payment.status === "pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                                                    >
                                                        {payment.status ===
                                                        "paid"
                                                            ? "✓ Lunas"
                                                            : payment.status ===
                                                                "pending"
                                                              ? "⏳ Pending"
                                                              : "⚠ Terlambat"}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 sm:py-8">
                                        <div className="text-3xl sm:text-4xl mb-2">
                                            💳
                                        </div>
                                        <p className="text-gray-500 text-xs sm:text-sm">
                                            Belum ada pembayaran
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Kamar Akan Kosong */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                                        Kamar Akan Kosong
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        Dalam 30 hari ke depan
                                    </p>
                                </div>
                                <Link
                                    href={route("tenants.index")}
                                    className="text-blue-500 hover:text-blue-600 text-xs sm:text-sm font-medium"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>
                            <div className="p-4 sm:p-6">
                                {expiringTenants.length > 0 ? (
                                    <div className="space-y-2 sm:space-y-3">
                                        {expiringTenants.map((tenant) => (
                                            <div
                                                key={tenant.id}
                                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-yellow-50 rounded-lg border border-yellow-200 gap-2"
                                            >
                                                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-semibold text-xs sm:text-sm flex-shrink-0">
                                                        {tenant.name?.charAt(
                                                            0,
                                                        ) || "?"}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                                                            {tenant.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 truncate">
                                                            {
                                                                tenant.room
                                                                    ?.kost?.name
                                                            }{" "}
                                                            • Kamar{" "}
                                                            {
                                                                tenant.room
                                                                    ?.room_number
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-left sm:text-right flex sm:flex-col justify-between items-center sm:items-end flex-shrink-0 border-t border-yellow-200 sm:border-0 pt-2 sm:pt-0">
                                                    <p className="text-[10px] sm:text-xs font-medium text-yellow-700">
                                                        Keluar
                                                    </p>
                                                    <p className="text-xs sm:text-sm font-semibold text-gray-900">
                                                        {formatDate(
                                                            tenant.move_out_date,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6 sm:py-8">
                                        <div className="text-3xl sm:text-4xl mb-2">
                                            🎉
                                        </div>
                                        <p className="text-gray-500 text-xs sm:text-sm">
                                            Tidak ada kamar yang akan kosong
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-4 sm:p-6 hover:shadow-md transition">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-red-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                                        Pembayaran Pending
                                    </p>
                                    <p className="text-2xl sm:text-3xl font-bold text-red-600">
                                        {stats.pending_payments}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Perlu ditindaklanjuti
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-4 sm:p-6 hover:shadow-md transition">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                                        Pembayaran Terlambat
                                    </p>
                                    <p className="text-2xl sm:text-3xl font-bold text-orange-600">
                                        {stats.overdue_payments}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Segera hubungi penyewa
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 sm:p-6 hover:shadow-md transition">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                                        Total Penyewa Aktif
                                    </p>
                                    <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                                        {stats.total_tenants}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Sedang menempati kamar
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
