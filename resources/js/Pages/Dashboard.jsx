import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({ stats, recentPayments, expiringTenants }) {
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

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Dashboard
                    </h2>
                    <div className="text-sm text-gray-500">
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

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Welcome Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-sm p-6 mb-8 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-1">
                                    Selamat Datang Kembali! 👋
                                </h3>
                                <p className="text-blue-100">
                                    Berikut ringkasan bisnis kost Anda hari ini
                                </p>
                            </div>
                            <div className="text-6xl opacity-20">🏠</div>
                        </div>
                    </div>

                    {/* Statistik Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Kost */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
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
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Total
                                </span>
                            </div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">
                                Total Kost
                            </h4>
                            <p className="text-3xl font-bold text-gray-900">
                                {stats.total_kosts}
                            </p>
                            <div className="mt-3 text-xs text-green-600 font-medium">
                                📊 Aktif
                            </div>
                        </div>

                        {/* Total Kamar */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-purple-600"
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
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Unit
                                </span>
                            </div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">
                                Total Kamar
                            </h4>
                            <p className="text-3xl font-bold text-gray-900">
                                {stats.total_rooms}
                            </p>
                            <div className="mt-3 text-xs text-purple-600 font-medium">
                                ️ Semua unit
                            </div>
                        </div>

                        {/* Kamar Tersedia */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-green-600"
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
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Available
                                </span>
                            </div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">
                                Kamar Tersedia
                            </h4>
                            <p className="text-3xl font-bold text-green-600">
                                {stats.available_rooms}
                            </p>
                            <div className="mt-3 text-xs text-gray-500 font-medium">
                                ✅ Siap disewa
                            </div>
                        </div>

                        {/* Total Pendapatan */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-6 h-6 text-yellow-600"
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
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Revenue
                                </span>
                            </div>
                            <h4 className="text-sm font-medium text-gray-500 mb-1">
                                Total Pendapatan
                            </h4>
                            <p className="text-2xl font-bold text-gray-900">
                                {formatCurrency(stats.total_revenue)}
                            </p>
                            <div className="mt-3 text-xs text-yellow-600 font-medium">
                                💰 Dari pembayaran lunas
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Pembayaran Terbaru */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Pembayaran Terbaru
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Transaksi terakhir
                                    </p>
                                </div>
                                <Link
                                    href={route("payments.index")}
                                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>
                            <div className="p-6">
                                {recentPayments.length > 0 ? (
                                    <div className="space-y-3">
                                        {recentPayments.map((payment) => (
                                            <div
                                                key={payment.id}
                                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                                                        {payment.tenant?.name?.charAt(
                                                            0,
                                                        ) || "?"}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">
                                                            {
                                                                payment.tenant
                                                                    ?.name
                                                            }
                                                        </p>
                                                        <p className="text-xs text-gray-500">
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
                                                <div className="text-right">
                                                    <p className="font-semibold text-gray-900 text-sm">
                                                        {formatCurrency(
                                                            payment.amount,
                                                        )}
                                                    </p>
                                                    <span
                                                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                                                            payment.status ===
                                                            "paid"
                                                                ? "bg-green-100 text-green-700"
                                                                : payment.status ===
                                                                    "pending"
                                                                  ? "bg-yellow-100 text-yellow-700"
                                                                  : "bg-red-100 text-red-700"
                                                        }`}
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
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-2">💳</div>
                                        <p className="text-gray-500 text-sm">
                                            Belum ada pembayaran
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Kamar Akan Kosong */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        Kamar Akan Kosong
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Dalam 30 hari ke depan
                                    </p>
                                </div>
                                <Link
                                    href={route("tenants.index")}
                                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>
                            <div className="p-6">
                                {expiringTenants.length > 0 ? (
                                    <div className="space-y-3">
                                        {expiringTenants.map((tenant) => (
                                            <div
                                                key={tenant.id}
                                                className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-semibold text-sm">
                                                        {tenant.name?.charAt(
                                                            0,
                                                        ) || "?"}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 text-sm">
                                                            {tenant.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500">
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
                                                <div className="text-right">
                                                    <p className="text-xs font-medium text-yellow-700">
                                                        Keluar
                                                    </p>
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {formatDate(
                                                            tenant.move_out_date,
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="text-4xl mb-2">🎉</div>
                                        <p className="text-gray-500 text-sm">
                                            Tidak ada kamar yang akan kosong
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl shadow-sm border border-red-100 p-6 hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-6 h-6 text-red-600"
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
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Pembayaran Pending
                                    </p>
                                    <p className="text-3xl font-bold text-red-600">
                                        {stats.pending_payments}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Perlu ditindaklanjuti
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-6 h-6 text-orange-600"
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
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Pembayaran Terlambat
                                    </p>
                                    <p className="text-3xl font-bold text-orange-600">
                                        {stats.overdue_payments}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        Segera hubungi penyewa
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
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
                                <div>
                                    <p className="text-sm font-medium text-gray-500">
                                        Total Penyewa Aktif
                                    </p>
                                    <p className="text-3xl font-bold text-blue-600">
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
