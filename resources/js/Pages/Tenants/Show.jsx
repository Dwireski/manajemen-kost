import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ tenant }) {
    const handleDelete = () => {
        if (
            confirm(
                "Yakin mau hapus penyewa ini? Kamar akan dikembalikan ke status tersedia.",
            )
        ) {
            router.delete(route("tenants.destroy", tenant.id));
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

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-100 leading-tight">
                        Detail Penyewa
                    </h2>
                    <Link
                        href={route("tenants.index")}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition flex items-center gap-1.5"
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
                        <span>Kembali ke Daftar</span>
                    </Link>
                </div>
            }
        >
            <Head title={`Detail: ${tenant.name}`} />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                    {/* Info Utama Penyewa */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm dark:shadow-none rounded-2xl border border-gray-100 dark:border-gray-700 transition">
                        <div className="p-5 sm:p-8 text-gray-900 dark:text-gray-100">
                            {/* Header Nama & Tombol Aksi */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-5 mb-6">
                                <div className="space-y-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                                        Profil Penghuni
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <svg
                                            className="w-6 h-6 text-gray-700 dark:text-gray-300"
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
                                        <span>{tenant.name}</span>
                                    </h3>
                                </div>
                                <div className="flex gap-2.5 w-full sm:w-auto">
                                    <Link
                                        href={route("tenants.edit", tenant.id)}
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
                                        <span>Edit Profil</span>
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 sm:flex-none bg-rose-50 dark:bg-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 font-semibold py-2.5 px-4 rounded-xl border border-rose-200 dark:border-rose-900 transition text-center text-sm flex items-center justify-center gap-1.5"
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

                            {/* Grid Informasi Detail Kontak & Sewa */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5 sm:gap-6 bg-gray-50/70 dark:bg-gray-900/50 p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
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
                                        Kontak Telepon
                                    </p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                                        {tenant.phone || "-"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
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
                                    <p className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                                        {tenant.room?.kost?.name || "-"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
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
                                        Nomor Kamar
                                    </p>
                                    <p className="font-bold text-purple-700 dark:text-purple-400 text-sm sm:text-base">
                                        Unit {tenant.room?.room_number || "-"}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
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
                                        Tanggal Masuk
                                    </p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                                        {formatDate(tenant.move_in_date)}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
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
                                        Tanggal Keluar
                                    </p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                                        {tenant.move_out_date ? (
                                            formatDate(tenant.move_out_date)
                                        ) : (
                                            <span className="inline-flex px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900">
                                                Aktif Menetap
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Riwayat Pembayaran */}
                    {tenant.payments && tenant.payments.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm dark:shadow-none rounded-2xl border border-gray-100 dark:border-gray-700">
                            <div className="p-5 sm:p-8 text-gray-900 dark:text-gray-100">
                                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-4 mb-5">
                                    <svg
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                        />
                                    </svg>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                                        Riwayat Log Pembayaran
                                    </h3>
                                </div>

                                <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-6 after:bg-gradient-to-l after:from-black/5 after:to-transparent after:pointer-events-none lg:after:hidden">
                                    <div className="overflow-x-auto shadow-inner">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left">
                                            <thead className="bg-gray-50/70 dark:bg-gray-900/50">
                                                <tr>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Tanggal Buku
                                                    </th>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Jumlah Setoran
                                                    </th>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Status
                                                    </th>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Keterangan Audit
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                                {tenant.payments.map(
                                                    (payment) => (
                                                        <tr
                                                            key={payment.id}
                                                            className="hover:bg-gray-50/80 dark:hover:bg-gray-900/50 transition"
                                                        >
                                                            <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-medium">
                                                                {formatDate(
                                                                    payment.payment_date,
                                                                )}
                                                            </td>
                                                            <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                                                                Rp{" "}
                                                                {parseInt(
                                                                    payment.amount,
                                                                ).toLocaleString(
                                                                    "id-ID",
                                                                )}
                                                            </td>
                                                            <td className="px-5 py-4 whitespace-nowrap">
                                                                <span
                                                                    className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                                        payment.status ===
                                                                        "paid"
                                                                            ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900"
                                                                            : payment.status ===
                                                                                "pending"
                                                                              ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900"
                                                                              : "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900"
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
                                                            </td>
                                                            <td className="px-5 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate font-medium">
                                                                {payment.description ||
                                                                    "-"}
                                                            </td>
                                                        </tr>
                                                    ),
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
