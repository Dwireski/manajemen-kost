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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Kost
                </h2>
            }
        >
            <Head title={`Detail: ${kost.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Info Kost */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold">
                                    {kost.name}
                                </h3>
                                <div className="space-x-2">
                                    <Link
                                        href={route("kosts.edit", kost.id)}
                                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={handleDelete}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Hapus
                                    </button>
                                </div>
                            </div>

                            {/* Tampilan Foto Kost Ditambahkan Di Sini */}
                            {kost.photo && (
                                <div className="mb-6">
                                    <img
                                        src={kost.photo}
                                        alt={kost.name}
                                        className="w-full h-64 object-cover rounded-lg border border-gray-200"
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Alamat
                                    </p>
                                    <p className="font-medium">
                                        {kost.address}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Nama Pemilik
                                    </p>
                                    <p className="font-medium">
                                        {kost.owner_name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Telepon Pemilik
                                    </p>
                                    <p className="font-medium">
                                        {kost.owner_phone}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Total Kamar
                                    </p>
                                    <p className="font-medium">
                                        {kost.rooms?.length || 0} kamar
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Daftar Kamar */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">
                                    Daftar Kamar
                                </h3>
                                <Link
                                    href={route("rooms.create")}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                                >
                                    Tambah Kamar
                                </Link>
                            </div>

                            {kost.rooms && kost.rooms.length > 0 ? (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Nomor
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Harga
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Penyewa
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {kost.rooms.map((room) => (
                                            <tr key={room.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {room.room_number}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    Rp{" "}
                                                    {parseInt(
                                                        room.price,
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                            room.status ===
                                                            "available"
                                                                ? "bg-green-100 text-green-800"
                                                                : room.status ===
                                                                    "occupied"
                                                                  ? "bg-red-100 text-red-800"
                                                                  : "bg-yellow-100 text-yellow-800"
                                                        }`}
                                                    >
                                                        {room.status ===
                                                        "available"
                                                            ? "Tersedia"
                                                            : room.status ===
                                                                "occupied"
                                                              ? "Terisi"
                                                              : "Perbaikan"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {room.tenants?.[0]?.name ||
                                                        "-"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-gray-500 text-center py-4">
                                    Belum ada kamar di kost ini.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
