import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ kosts, filters }) {
    const [search, setSearch] = React.useState(filters?.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route("kosts.index"), { search }, { preserveState: true });
    };

    const handleReset = () => {
        setSearch("");
        router.get(route("kosts.index"), {}, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (
            confirm(
                "Yakin mau hapus kost ini? Semua kamar dan data terkait akan ikut terhapus.",
            )
        ) {
            router.delete(route("kosts.destroy", id), {
                onSuccess: () => console.log("Kost berhasil dihapus"),
                onError: (errors) => {
                    console.error("Error:", errors);
                    alert("Gagal menghapus kost.");
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                        Manajemen Properti Kost
                    </h2>
                    <Link
                        href={route("kosts.create")}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
                    >
                        {/* Line Icon: Plus */}
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
                        <span>Tambah Properti</span>
                    </Link>
                </div>
            }
        >
            <Head title="Daftar Kost" />

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
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan nama, pemilik, atau lokasi alamat..."
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
                                Daftar Aset Kost
                            </h3>
                            <p className="text-xs text-gray-500">
                                Total pengelolaan: {kosts?.length || 0} lokasi
                                properti
                            </p>
                        </div>

                        <div className="relative overflow-hidden after:absolute after:right-0 after:top-0 after:bottom-0 after:w-6 after:bg-gradient-to-l after:from-black/5 after:to-transparent after:pointer-events-none lg:after:hidden">
                            <div className="overflow-x-auto shadow-inner">
                                <table className="min-w-full divide-y divide-gray-200 text-left">
                                    <thead className="bg-gray-50/70">
                                        <tr>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Foto Aset
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Nama Properti
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Lokasi Alamat
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Nama Pemilik
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Kontak Telepon
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Total Unit
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                                Aksi Kelola
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {kosts && kosts.length > 0 ? (
                                            kosts.map((kost) => (
                                                <tr
                                                    key={kost.id}
                                                    className="hover:bg-gray-50/80 transition"
                                                >
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        {kost.photo ? (
                                                            <img
                                                                src={`/${kost.photo}`}
                                                                alt={kost.name}
                                                                className="w-11 h-11 object-cover rounded-xl border border-gray-100 shadow-sm"
                                                            />
                                                        ) : (
                                                            /* Line Icon: Placeholder Image Outline */
                                                            <div className="w-11 h-11 bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                                                                <svg
                                                                    className="w-5 h-5"
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
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap font-bold text-gray-900 text-xs sm:text-sm">
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
                                                                {kost.name ||
                                                                    "-"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 text-xs sm:text-sm text-gray-500 max-w-xs truncate font-medium">
                                                        <div className="flex items-center gap-2">
                                                            {/* Line Icon: Location Map Pin */}
                                                            <svg
                                                                className="w-4 h-4 text-gray-400 flex-shrink-0"
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
                                                            <span className="truncate">
                                                                {kost.address ||
                                                                    "-"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-800 font-semibold">
                                                        <div className="flex items-center gap-2">
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
                                                                {kost.owner_name ||
                                                                    "-"}
                                                            </span>
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
                                                                {kost.owner_phone ||
                                                                    "-"}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100 gap-1">
                                                            {/* Line Icon: Hashes/Number */}
                                                            <svg
                                                                className="w-3 h-3 text-purple-500"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                                                                />
                                                            </svg>
                                                            {kost.rooms
                                                                ? kost.rooms
                                                                      .length
                                                                : 0}{" "}
                                                            Kamar
                                                        </span>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                                        <div className="flex gap-1.5">
                                                            <Link
                                                                href={route(
                                                                    "kosts.show",
                                                                    kost.id,
                                                                )}
                                                                className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition text-xs"
                                                            >
                                                                Lihat
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "kosts.edit",
                                                                    kost.id,
                                                                )}
                                                                className="text-yellow-600 hover:text-yellow-800 bg-yellow-50 hover:bg-yellow-100 px-2.5 py-1 rounded-md transition text-xs"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        kost.id,
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
                                                    <p className="text-xs sm:text-sm text-gray-400 italic">
                                                        {search
                                                            ? "Tidak ada hasil properti kost yang sesuai pencarian."
                                                            : "Belum ada data properti aset kost terdaftar."}
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
