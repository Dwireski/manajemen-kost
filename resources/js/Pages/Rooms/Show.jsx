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
            available: "bg-green-100 text-green-800",
            occupied: "bg-red-100 text-red-800",
            maintenance: "bg-yellow-100 text-yellow-800",
        };
        const labels = {
            available: "Tersedia",
            occupied: "Terisi",
            maintenance: "Perbaikan",
        };
        return (
            <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${badges[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Kamar
                </h2>
            }
        >
            <Head title={`Detail: Kamar ${room.room_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Info Kamar */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold">
                                    Kamar {room.room_number}
                                </h3>
                                <div className="space-x-2">
                                    <Link
                                        href={route("rooms.edit", room.id)}
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

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Kost
                                    </p>
                                    <p className="font-medium">
                                        {room.kost?.name || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Harga per Bulan
                                    </p>
                                    <p className="font-medium">
                                        Rp{" "}
                                        {parseInt(room.price).toLocaleString(
                                            "id-ID",
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>
                                    <div className="mt-1">
                                        {getStatusBadge(room.status)}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Penyewa
                                    </p>
                                    <p className="font-medium">
                                        {room.tenants?.[0]?.name ||
                                            "Belum ada penyewa"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Riwayat Penyewa */}
                    {room.tenants && room.tenants.length > 0 && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h3 className="text-lg font-semibold mb-4">
                                    Riwayat Penyewa
                                </h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Nama
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Telepon
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Tanggal Masuk
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Tanggal Keluar
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {room.tenants.map((tenant) => (
                                            <tr key={tenant.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {tenant.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {tenant.phone}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(
                                                        tenant.move_in_date,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {tenant.move_out_date
                                                        ? new Date(
                                                              tenant.move_out_date,
                                                          ).toLocaleDateString(
                                                              "id-ID",
                                                          )
                                                        : "-"}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
