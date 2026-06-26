import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ kost }) {
    const handleDelete = () => {
        if (
            confirm(
                "Yakin mau hapus kost ini? Semua kamar dan data terkait akan ikut terhapus.",
            )
        ) {
            router.delete(route("kosts.destroy", kost.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                        Detail Kost
                    </h2>
                    <Link
                        href={route("kosts.index")}
                        className="text-sm font-medium text-blue-600 hover:text-blue-800 transition flex items-center gap-1.5"
                    >
                        {/* Line Icon: Arrow Back */}
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
            <Head title={`Detail: ${kost.name}`} />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                    {/* Info Utama Kost */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100 transition">
                        <div className="p-5 sm:p-8 text-gray-900">
                            {/* Header Nama & Tombol Aksi */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-gray-100 pb-5 mb-6">
                                <div className="space-y-1">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                                        Properti Manajemen
                                    </span>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                                        {kost.name}
                                    </h3>
                                </div>
                                <div className="flex gap-2.5 w-full sm:w-auto">
                                    <Link
                                        href={route("kosts.edit", kost.id)}
                                        className="flex-1 sm:flex-none bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition text-center text-sm flex items-center justify-center gap-1.5"
                                    >
                                        {/* Line Icon: Pencil/Edit */}
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
                                        <span>Edit Properti</span>
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 sm:flex-none bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold py-2.5 px-4 rounded-xl border border-rose-200 transition text-center text-sm flex items-center justify-center gap-1.5"
                                    >
                                        {/* Line Icon: Trash */}
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

                            {/* Tampilan Foto Properti */}
                            {kost.photo ? (
                                <div className="mb-6 sm:mb-8 relative group overflow-hidden rounded-2xl shadow-inner bg-gray-50">
                                    <img
                                        src={`/${kost.photo}`}
                                        alt={kost.name}
                                        className="w-full h-56 sm:h-80 md:h-[400px] object-cover transition duration-500 group-hover:scale-[1.01]"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </div>
                            ) : (
                                <div className="mb-6 sm:mb-8 rounded-2xl bg-gray-50 border border-dashed border-gray-200 p-8 text-center text-gray-400">
                                    {/* Line Icon: Image Placeholder */}
                                    <svg
                                        className="w-8 h-8 mx-auto mb-2 text-gray-300"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <p className="text-sm">
                                        Belum ada foto properti yang diunggah
                                    </p>
                                </div>
                            )}

                            {/* Grid Informasi Detail Properti */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 bg-gray-50/70 p-4 sm:p-6 rounded-2xl border border-gray-100">
                                <div className="space-y-1 md:col-span-3 border-b border-gray-200/60 pb-3 mb-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        {/* Line Icon: Location */}
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        Lokasi Properti
                                    </p>
                                    <p className="font-semibold text-gray-800 text-base sm:text-lg pl-5">
                                        {kost.address}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        {/* Line Icon: User */}
                                        <svg
                                            className="w-3.5 h-3.5"
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
                                        Nama Pemilik
                                    </p>
                                    <p className="font-bold text-gray-800 text-base pl-5">
                                        {kost.owner_name}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        {/* Line Icon: Phone */}
                                        <svg
                                            className="w-3.5 h-3.5"
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
                                        Kontak Pemilik
                                    </p>
                                    <p className="font-bold text-gray-800 text-base pl-5">
                                        {kost.owner_phone}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                                        {/* Line Icon: Template / Grid */}
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                            />
                                        </svg>
                                        Kapasitas Unit
                                    </p>
                                    <p className="font-bold text-blue-600 text-base pl-5">
                                        {kost.rooms?.length || 0} Kamar
                                        Terdaftar
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section Daftar Kamar */}
                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100">
                        <div className="p-5 sm:p-8 text-gray-900">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-b border-gray-100 pb-4 mb-5">
                                <div>
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                                        Daftar Manajemen Kamar
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        Kelola ketersediaan harga dan status
                                        penyewa unit
                                    </p>
                                </div>
                                <Link
                                    href={route("rooms.create")}
                                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm text-xs sm:text-sm text-center transition flex items-center justify-center gap-1.5 w-full sm:w-auto"
                                >
                                    {/* Line Icon: Plus */}
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
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                    Tambah Unit Kamar
                                </Link>
                            </div>

                            {kost.rooms && kost.rooms.length > 0 ? (
                                <div className="relative overflow-hidden rounded-xl border border-gray-100 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-6 after:bg-gradient-to-l after:from-black/5 after:to-transparent after:pointer-events-none lg:after:hidden">
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200 text-left">
                                            <thead className="bg-gray-50/70">
                                                <tr>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                        Nomor Unit
                                                    </th>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                        Harga Sewa / Bulan
                                                    </th>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                        Status Unit
                                                    </th>
                                                    <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                        Nama Penghuni
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-100">
                                                {kost.rooms.map((room) => (
                                                    <tr
                                                        key={room.id}
                                                        className="hover:bg-gray-50/80 transition"
                                                    >
                                                        <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                                                            <div className="flex items-center gap-2">
                                                                {/* Line Icon: Home / Door Area */}
                                                                <svg
                                                                    className="w-4 h-4 text-gray-400"
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
                                                                <span>
                                                                    Kamar{" "}
                                                                    {
                                                                        room.room_number
                                                                    }
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-gray-700">
                                                            Rp{" "}
                                                            {parseInt(
                                                                room.price,
                                                            ).toLocaleString(
                                                                "id-ID",
                                                            )}
                                                        </td>
                                                        <td className="px-5 py-4 whitespace-nowrap">
                                                            <span
                                                                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${
                                                                    room.status ===
                                                                    "available"
                                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                                                                        : room.status ===
                                                                            "occupied"
                                                                          ? "bg-rose-50 text-rose-700 border-rose-100"
                                                                          : "bg-amber-50 text-amber-700 border-amber-100"
                                                                }`}
                                                            >
                                                                {room.status ===
                                                                "available"
                                                                    ? "✓ Tersedia"
                                                                    : room.status ===
                                                                        "occupied"
                                                                      ? "• Terisi"
                                                                      : "⏳ Perbaikan"}
                                                            </span>
                                                        </td>
                                                        <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                                                            {room.tenants?.[0]
                                                                ?.name ? (
                                                                <div className="flex items-center gap-2 font-medium text-gray-800">
                                                                    {/* Line Icon: User */}
                                                                    <svg
                                                                        className="w-4 h-4 text-gray-400"
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
                                                                    <span>
                                                                        {
                                                                            room
                                                                                .tenants[0]
                                                                                .name
                                                                        }
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <span className="text-gray-400 italic">
                                                                    Kosong
                                                                </span>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-xl border border-dashed border-gray-200 p-8 text-center text-gray-400">
                                    {/* Line Icon: Bed/Room outline placeholder */}
                                    <svg
                                        className="w-8 h-8 mx-auto mb-1 text-gray-300"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9h.01"
                                        />
                                    </svg>
                                    <p className="text-sm">
                                        Belum ada kamar di dalam manajemen kost
                                        ini.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
