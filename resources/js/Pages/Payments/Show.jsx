import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ payment }) {
    const handleDelete = () => {
        if (confirm("Yakin mau hapus data pembayaran ini?")) {
            router.delete(route("payments.destroy", payment.id));
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    };

    // ✅ FUNGSI FORMATCURRENCY YANG DITAMBAHKAN
    const formatCurrency = (amount) => {
        if (!amount) return "Rp 0";
        return `Rp ${parseInt(amount).toLocaleString("id-ID")}`;
    };

    const getStatusBadge = (status) => {
        const badges = {
            paid: "bg-emerald-50 text-emerald-700 border-emerald-100",
            pending: "bg-amber-50 text-amber-700 border-amber-100",
            overdue: "bg-rose-50 text-rose-700 border-rose-100",
        };
        const labels = {
            paid: "Lunas",
            pending: "Pending",
            overdue: "Terlambat",
        };
        return (
            <span
                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${badges[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                        Detail Pembayaran
                    </h2>
                    <Link
                        href={route("payments.index")}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition flex items-center gap-1.5"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        <span>Kembali ke Riwayat</span>
                    </Link>
                </div>
            }
        >
            <Head title="Detail Pembayaran" />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100">
                        <div className="p-5 sm:p-8 text-gray-900">
                            {/* Header Section */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-100 pb-5 mb-6">
                                <div className="space-y-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                        Faktur Finansial
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
                                        <svg
                                            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M13 22.302H6.75a2 2 0 01-2-2V3.698a2 2 0 012-2h10.5a2 2 0 012 2v7"
                                            />
                                        </svg>
                                        <span>Bukti Transaksi</span>
                                    </h3>
                                </div>
                                <div className="flex gap-2.5 w-full sm:w-auto">
                                    <Link
                                        href={route(
                                            "payments.edit",
                                            payment.id,
                                        )}
                                        className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition text-center text-sm flex items-center justify-center gap-1.5"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                            />
                                        </svg>
                                        <span>Edit</span>
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 sm:flex-none bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold py-2.5 px-4 rounded-xl border border-rose-200 transition text-center text-sm flex items-center justify-center gap-1.5"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v1M14 3a2 2 0 00-2-2h-4a2 2 0 00-2 2v3h10V3z"
                                            />
                                        </svg>
                                        <span>Hapus</span>
                                    </button>
                                </div>
                            </div>

                            {/* Grid Informasi Faktur */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50/70 p-5 sm:p-6 rounded-2xl border border-gray-100">
                                {/* Nama Penyewa */}
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        Nama Penyewa
                                    </p>
                                    <p className="font-bold text-gray-800 text-sm sm:text-base pl-5 truncate">
                                        {payment.tenant?.name || "-"}
                                    </p>
                                </div>

                                {/* Kontak Telepon */}
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        No. Telepon
                                    </p>
                                    <p className="font-semibold text-gray-700 text-sm sm:text-base pl-5 truncate">
                                        {payment.tenant?.phone || "-"}
                                    </p>
                                </div>

                                {/* Nama Gedung Kost */}
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                        Gedung Kost
                                    </p>
                                    <p className="font-semibold text-gray-800 text-sm sm:text-base pl-5 truncate">
                                        {payment.tenant?.room?.kost?.name ||
                                            "-"}
                                    </p>
                                </div>

                                {/* Nomor Unit Kamar */}
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                        Alokasi Kamar
                                    </p>
                                    <p className="font-semibold text-gray-800 text-sm sm:text-base pl-5 truncate">
                                        Unit Kamar{" "}
                                        {payment.tenant?.room?.room_number ||
                                            "-"}
                                    </p>
                                </div>

                                {/* Nominal */}
                                <div className="space-y-1 border-t border-gray-200/60 pt-4 sm:col-span-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Jumlah Pembayaran
                                    </p>
                                    <p className="font-extrabold text-blue-600 text-lg sm:text-xl pl-5">
                                        {formatCurrency(payment.amount)}
                                    </p>
                                </div>

                                {/* Tanggal Masuk Pembayaran */}
                                <div className="space-y-1 border-t border-gray-200/60 pt-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Tanggal Pembayaran
                                    </p>
                                    <p className="font-semibold text-gray-800 text-sm sm:text-base pl-5">
                                        {formatDate(payment.payment_date)}
                                    </p>
                                </div>

                                {/* Status Jurnal */}
                                <div className="space-y-1 border-t border-gray-200/60 pt-4">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        Status Rekam Faktur
                                    </p>
                                    <div className="pl-5">
                                        {getStatusBadge(payment.status)}
                                    </div>
                                </div>

                                {/* Keterangan Tambahan */}
                                <div className="space-y-1 border-t border-gray-200/60 pt-4 sm:col-span-2">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        Keterangan Catatan Audit
                                    </p>
                                    <p className="font-medium text-gray-700 text-sm sm:text-base pl-5 leading-relaxed">
                                        {payment.description || "-"}
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
