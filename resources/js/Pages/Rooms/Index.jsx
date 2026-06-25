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
            available: "bg-green-100 text-green-700 border border-green-200",
            occupied: "bg-red-100 text-red-700 border border-red-200",
            maintenance:
                "bg-yellow-100 text-yellow-700 border border-yellow-200",
        };
        const labels = {
            available: "✓ Tersedia",
            occupied: "✗ Terisi",
            maintenance: "⚙ Perbaikan",
        };
        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${badges[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Manajemen Kamar
                    </h2>
                    <Link
                        href={route("rooms.create")}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-sm transition flex items-center gap-2"
                    >
                        <svg
                            className="w-5 h-5"
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
                        Tambah Kamar
                    </Link>
                </div>
            }
        >
            <Head title="Daftar Kamar" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {/* Filter Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                        <form
                            onSubmit={handleFilter}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Filter Status
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                >
                                    <option value="">Semua Status</option>
                                    <option value="available">Tersedia</option>
                                    <option value="occupied">Terisi</option>
                                    <option value="maintenance">
                                        Perbaikan
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Filter Kost
                                </label>
                                <select
                                    value={kostId}
                                    onChange={(e) => setKostId(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                >
                                    <option value="">Semua Kost</option>
                                    {kosts.map((kost) => (
                                        <option key={kost.id} value={kost.id}>
                                            {kost.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-end gap-2">
                                <button
                                    type="submit"
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition shadow-sm"
                                >
                                    Filter
                                </button>
                                {(status || kostId) && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Daftar Kamar
                            </h3>
                            <p className="text-sm text-gray-500">
                                Total: {rooms?.length || 0} kamar
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Kost
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            No. Kamar
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Harga/Bulan
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Penyewa
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {rooms && rooms.length > 0 ? (
                                        rooms.map((room) => (
                                            <tr
                                                key={room.id}
                                                className="hover:bg-gray-50 transition"
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600"></div>
                                                        <div className="font-medium text-gray-900">
                                                            {room.kost?.name ||
                                                                "-"}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-800 font-semibold">
                                                        {room.room_number}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                    Rp{" "}
                                                    {parseInt(
                                                        room.price,
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {getStatusBadge(
                                                        room.status,
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {room.tenants?.length || 0}{" "}
                                                    penyewa
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex gap-2">
                                                        <Link
                                                            href={route(
                                                                "rooms.show",
                                                                room.id,
                                                            )}
                                                            className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-md transition"
                                                        >
                                                            Lihat
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                "rooms.edit",
                                                                room.id,
                                                            )}
                                                            className="text-yellow-600 hover:text-yellow-800 bg-yellow-50 hover:bg-yellow-100 px-3 py-1 rounded-md transition"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    room.id,
                                                                )
                                                            }
                                                            className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition"
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
                                                className="px-6 py-12 text-center"
                                            >
                                                <div className="text-4xl mb-2"></div>
                                                <p className="text-gray-500">
                                                    {status || kostId
                                                        ? "Tidak ada kamar yang sesuai filter."
                                                        : "Belum ada data kamar."}
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
        </AuthenticatedLayout>
    );
}
