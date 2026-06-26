import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ tenants, filters }) {
    const [search, setSearch] = React.useState(filters?.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("tenants.index"), { search }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch("");
        router.get(route("tenants.index"), {}, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (
            confirm(
                "Yakin mau hapus penyewa ini? Kamar akan dikembalikan ke status tersedia.",
            )
        ) {
            router.delete(`/tenants/${id}`);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                        Manajemen Penyewa
                    </h2>
                    <Link
                        href={route("tenants.create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                    >
                        {/* Line Icon: User Add */}
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span>Tambah Penyewa</span>
                    </Link>
                </div>
            }
        >
            <Head title="Daftar Penyewa" />

            <div className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Search Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 mb-4 sm:mb-6">
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col md:flex-row gap-2 sm:gap-3"
                        >
                            <div className="flex-1 relative">
                                {/* Line Icon: Search */}
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan nama atau telepon..."
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition text-sm sm:text-base"
                                />
                            </div>
                            <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
                                <button
                                    type="submit"
                                    className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl transition shadow-sm text-sm sm:text-base text-center"
                                >
                                    Cari
                                </button>
                                {search && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="flex-1 md:flex-none bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl transition text-sm sm:text-base text-center"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                Daftar Penyewa Aktif
                            </h3>
                            <p className="text-xs text-gray-500">
                                Total entri data: {tenants?.length || 0} penyewa
                                terdaftar
                            </p>
                        </div>

                        {/* Pembungkus relatif dengan efek gradasi indikator geser di ponsel */}
                        <div className="relative overflow-hidden after:absolute after:right-0 after:top-0 after:bottom-0 after:w-6 after:bg-gradient-to-l after:from-black/5 after:to-transparent after:pointer-events-none lg:after:hidden">
                            <div className="overflow-x-auto shadow-inner">
                                <table className="min-w-full divide-y divide-gray-200 text-left">
                                    <thead className="bg-gray-50/70">
                                        <tr>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Nama Penyewa
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Kontak Telepon
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Lokasi Kost
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                No. Kamar
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Tanggal Masuk
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Tanggal Keluar
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {tenants && tenants.length > 0 ? (
                                            tenants.map((tenant) => (
                                                <tr
                                                    key={tenant.id}
                                                    className="hover:bg-gray-50/80 transition"
                                                >
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs flex-shrink-0">
                                                                {tenant.name?.charAt(
                                                                    0,
                                                                ) || "?"}
                                                            </div>
                                                            <div className="font-bold text-gray-900 text-xs sm:text-sm">
                                                                {tenant.name}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 font-medium">
                                                        <div className="flex items-center gap-2">
                                                            {/* Line Icon: Phone */}
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
                                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                                />
                                                            </svg>
                                                            <span>
                                                                {tenant.phone ||
                                                                    "-"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900 font-semibold">
                                                        <div className="flex items-center gap-2">
                                                            {/* Line Icon: Office Building */}
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
                                                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                                                />
                                                            </svg>
                                                            <span>
                                                                {tenant.room
                                                                    ?.kost
                                                                    ?.name ||
                                                                    "-"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            {/* Line Icon: Door/Room */}
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
                                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 border border-purple-100 text-xs font-bold">
                                                                Unit{" "}
                                                                {tenant.room
                                                                    ?.room_number ||
                                                                    "-"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600 font-medium">
                                                        <div className="flex items-center gap-1.5">
                                                            {/* Line Icon: Calendar */}
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
                                                            <span>
                                                                {formatDate(
                                                                    tenant.move_in_date,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600 font-medium">
                                                        <div className="flex items-center gap-1.5">
                                                            {tenant.move_out_date ? (
                                                                <>
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
                                                                    <span>
                                                                        {formatDate(
                                                                            tenant.move_out_date,
                                                                        )}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <span className="inline-flex px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                                    Menetap
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                                        <div className="flex gap-1.5">
                                                            <Link
                                                                href={route(
                                                                    "tenants.show",
                                                                    tenant.id,
                                                                )}
                                                                className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition text-xs"
                                                            >
                                                                Lihat
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "tenants.edit",
                                                                    tenant.id,
                                                                )}
                                                                className="text-yellow-600 hover:text-yellow-800 bg-yellow-50 hover:bg-yellow-100 px-2.5 py-1 rounded-md transition text-xs"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        tenant.id,
                                                                    )
                                                                }
                                                                className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md transition text-xs"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="px-5 py-10 sm:py-14 text-center"
                                                >
                                                    {/* Line Icon: Users Placeholders */}
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
                                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                        />
                                                    </svg>
                                                    <p className="text-xs sm:text-sm text-gray-400 italic">
                                                        {search
                                                            ? "Tidak ada hasil data penghuni penyewa yang cocok."
                                                            : "Belum ada entri log penyewa terdaftar."}
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
