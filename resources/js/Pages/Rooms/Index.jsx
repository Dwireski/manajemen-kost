import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ rooms, kosts, filters }) {
    const [status, setStatus] = React.useState(filters?.status || "");
    const [kostId, setKostId] = React.useState(filters?.kost_id || "");

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            route("rooms.index"),
            { status, kost_id: kostId },
            { preserveState: true },
        );
    };

    const handleReset = () => {
        setStatus("");
        setKostId("");
        router.get(route("rooms.index"), {}, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm("Yakin mau hapus kamar ini?")) {
            router.delete(`/rooms/${id}`);
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
                        Manajemen Kamar
                    </h2>
                    <Link
                        href={route("rooms.create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                    >
                        <svg
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                        <span>Tambah Kamar</span>
                    </Link>
                </div>
            }
        >
            <Head title="Daftar Kamar" />

            <div className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Filter Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6">
                        <form
                            onSubmit={handleFilter}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
                        >
                            <div className="space-y-1">
                                <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Filter Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full mt-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition text-sm sm:text-base bg-white"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="available">Tersedia</option>
                                    <option value="occupied">Terisi</option>
                                    <option value="maintenance">
                                        Perbaikan
                                    </option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                    Filter Properti Kost
                                </label>
                                <select
                                    value={kostId}
                                    onChange={(e) => setKostId(e.target.value)}
                                    className="w-full mt-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition text-sm sm:text-base bg-white"
                                >
                                    <option value="">Semua Kost</option>
                                    {kosts.map((kost) => (
                                        <option key={kost.id} value={kost.id}>
                                            {kost.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-2 w-full">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl transition shadow-sm text-sm sm:text-base text-center"
                                >
                                    Filter
                                </button>
                                {(status || kostId) && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2.5 px-4 rounded-xl transition text-sm sm:text-base text-center"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                                Daftar Manajemen Kamar
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Total unit terdaftar: {rooms?.length || 0} kamar
                            </p>
                        </div>

                        <div className="relative overflow-hidden after:absolute after:right-0 after:top-0 after:bottom-0 after:w-6 after:bg-gradient-to-l after:from-black/5 after:to-transparent after:pointer-events-none lg:after:hidden">
                            <div className="overflow-x-auto shadow-inner">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left">
                                    <thead className="bg-gray-50/70 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Properti Kost
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                No. Kamar
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Harga/Bulan
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Status Unit
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Penyewa
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                        {rooms && rooms.length > 0 ? (
                                            rooms.map((room) => (
                                                <tr
                                                    key={room.id}
                                                    className="hover:bg-gray-50/80 dark:hover:bg-gray-900/50 transition"
                                                >
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2.5">
                                                            <svg
                                                                className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0"
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
                                                            <div className="font-semibold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                                                                {room.kost
                                                                    ?.name ||
                                                                    "-"}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            <svg
                                                                className="w-4 h-4 text-gray-400 dark:text-gray-500"
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
                                                            <span className="font-bold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                                                                {
                                                                    room.room_number
                                                                }
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-gray-700 dark:text-gray-200">
                                                        Rp{" "}
                                                        {parseInt(
                                                            room.price,
                                                        ).toLocaleString(
                                                            "id-ID",
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        {getStatusBadge(
                                                            room.status,
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                                                        <div className="flex items-center gap-2">
                                                            <svg
                                                                className="w-4 h-4 text-gray-400 dark:text-gray-500"
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
                                                            <span>
                                                                {room.tenants
                                                                    ?.length ||
                                                                    0}{" "}
                                                                penyewa aktif
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                                        <div className="flex gap-1.5">
                                                            <Link
                                                                href={route(
                                                                    "rooms.show",
                                                                    room.id,
                                                                )}
                                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-2.5 py-1 rounded-md transition text-xs"
                                                            >
                                                                Lihat
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "rooms.edit",
                                                                    room.id,
                                                                )}
                                                                className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 px-2.5 py-1 rounded-md transition text-xs"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        room.id,
                                                                    )
                                                                }
                                                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 px-2.5 py-1 rounded-md transition text-xs"
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
                                                    colSpan="6"
                                                    className="px-5 py-8 sm:py-12 text-center"
                                                >
                                                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 italic">
                                                        {status || kostId
                                                            ? "Tidak ada kamar yang sesuai filter."
                                                            : "Belum ada data kamar terdaftar."}
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
