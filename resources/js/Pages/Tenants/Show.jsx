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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail Penyewa
                </h2>
            }
        >
            <Head title={`Detail: ${tenant.name}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Info Penyewa */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold">
                                    {tenant.name}
                                </h3>
                                <div className="space-x-2">
                                    <Link
                                        href={route("tenants.edit", tenant.id)}
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
                                        Telepon
                                    </p>
                                    <p className="font-medium">
                                        {tenant.phone}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Kost
                                    </p>
                                    <p className="font-medium">
                                        {tenant.room?.kost?.name || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Kamar
                                    </p>
                                    <p className="font-medium">
                                        Kamar {tenant.room?.room_number || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tanggal Masuk
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(tenant.move_in_date)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tanggal Keluar
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(tenant.move_out_date)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Riwayat Pembayaran */}
                    {tenant.payments && tenant.payments.length > 0 && (
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <h3 className="text-lg font-semibold mb-4">
                                    Riwayat Pembayaran
                                </h3>
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Jumlah
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                                Keterangan
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tenant.payments.map((payment) => (
                                            <tr key={payment.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {formatDate(
                                                        payment.payment_date,
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap font-semibold">
                                                    Rp{" "}
                                                    {parseInt(
                                                        payment.amount,
                                                    ).toLocaleString("id-ID")}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                            payment.status ===
                                                            "paid"
                                                                ? "bg-green-100 text-green-800"
                                                                : payment.status ===
                                                                    "pending"
                                                                  ? "bg-yellow-100 text-yellow-800"
                                                                  : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {payment.status ===
                                                        "paid"
                                                            ? "Lunas"
                                                            : payment.status ===
                                                                "pending"
                                                              ? "Pending"
                                                              : "Terlambat"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {payment.description || "-"}
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
