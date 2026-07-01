import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ room }) {
    const handleDelete = () => {
        if (confirm("Yakin mau hapus kamar ini?")) {
            router.delete(route("rooms.destroy", room.id));
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            available:
                "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900",
            occupied:
                "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900",
            maintenance:
                "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900",
        };
        const labels = {
            available: "✓ Tersedia",
            occupied: "• Terisi",
            maintenance: "⏳ Perbaikan",
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
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-100 leading-tight">
                        Detail Kamar
                    </h2>
                    <Link
                        href={route("rooms.index")}
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
            <Head title={`Detail: Kamar ${room.room_number}`} />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                    {/* Info Kamar */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm dark:shadow-none rounded-2xl border border-gray-100 dark:border-gray-700 transition">
                        <div className="p-5 sm:p-8 text-gray-900 dark:text-gray-100">
                            {/* Header Nama & Tombol Aksi */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-100 dark:border-gray-700 pb-5 mb-6">
                                <div className="space-y-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border border-purple-100 dark:border-purple-900">
                                        Manajemen Unit
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <svg
                                            className="w-7 h-7 text-gray-700 dark:text-gray-300"
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
                                        <span>Kamar {room.room_number}</span>
                                    </h3>
                                </div>
                                <div className="flex gap-2.5 w-full sm:w-auto">
                                    <Link
                                        href={route("rooms.edit", room.id)}
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
                                        <span>Edit Kamar</span>
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

                            {/* Grid Informasi Detail Kamar */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6 bg-gray-50/70 dark:bg-gray-900/50 p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
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
                                    <p className="font-bold text-gray-800 dark:text-gray-100 text-base">
                                        {room.kost?.name || "-"}
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
                                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Harga per Bulan
                                    </p>
                                    <p className="font-bold text-gray-800 dark:text-gray-100 text-base">
                                        Rp{" "}
                                        {parseInt(room.price).toLocaleString(
                                            "id-ID",
                                        )}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
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
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        Status Operasional
                                    </p>
                                    <div>{getStatusBadge(room.status)}</div>
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
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>
                                        Penyewa Saat Ini
                                    </p>
                                    <p className="font-bold text-gray-800 dark:text-gray-100 text-base">
                                        {room.tenants?.[0]?.name ? (
                                            <span className="text-blue-600 dark:text-blue-400">
                                                {room.tenants[0].name}
                                            </span>
                                        ) : (
                                            <span className="text-gray-400 dark:text-gray-500 italic font-medium">
                                                Belum Ada
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Riwayat Penyewa */}
                    {room.tenants && room.tenants.length > 0 && (
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
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                        />
                                    </svg>
                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                                        Riwayat Penyewa Unit
                                    </h3>
                                </div>

                                <div className="relative overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-6 after:bg-gradient-to-l after:from-black/5 after:to-transparent after:pointer-events-none lg:after:hidden">
                                    <div className="overflow-x-auto shadow-inner">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left">
                                            <thead className="bg-gray-50/70 dark:bg-gray-900/50">
                                                <tr>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Nama Lengkap
                                                    </th>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Kontak Telepon
                                                    </th>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Tanggal Masuk
                                                    </th>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                        Tanggal Keluar
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                                {room.tenants.map((tenant) => (
                                                    <tr
                                                        key={tenant.id}
                                                        className="hover:bg-gray-50/80 dark:hover:bg-gray-900/50 transition"
                                                    >
                                                        <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">
                                                            {tenant.name}
                                                        </td>
                                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-medium">
                                                            {tenant.phone ||
                                                                "-"}
                                                        </td>
                                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-medium">
                                                            {new Date(
                                                                tenant.move_in_date,
                                                            ).toLocaleDateString(
                                                                "id-ID",
                                                                {
                                                                    day: "2-digit",
                                                                    month: "short",
                                                                    year: "numeric",
                                                                },
                                                            )}
                                                        </td>
                                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 font-medium">
                                                            {tenant.move_out_date ? (
                                                                new Date(
                                                                    tenant.move_out_date,
                                                                ).toLocaleDateString(
                                                                    "id-ID",
                                                                    {
                                                                        day: "2-digit",
                                                                        month: "short",
                                                                        year: "numeric",
                                                                    },
                                                                )
                                                            ) : (
                                                                <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-900 px-2 py-0.5 rounded-md text-xs">
                                                                    Aktif
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
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
