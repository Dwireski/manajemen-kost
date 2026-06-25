import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show({ payment }) {
    const handleDelete = () => {
        if (confirm("Yakin mau hapus data pembayaran ini?")) {
            router.delete(route("payments.destroy", payment.id));
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

    const getStatusBadge = (status) => {
        const badges = {
            paid: "bg-green-100 text-green-800",
            pending: "bg-yellow-100 text-yellow-800",
            overdue: "bg-red-100 text-red-800",
        };
        const labels = {
            paid: "Lunas",
            pending: "Pending",
            overdue: "Terlambat",
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
                    Detail Pembayaran
                </h2>
            }
        >
            <Head title="Detail Pembayaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="text-2xl font-bold">
                                    Detail Pembayaran
                                </h3>
                                <div className="space-x-2">
                                    <Link
                                        href={route(
                                            "payments.edit",
                                            payment.id,
                                        )}
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
                                        Penyewa
                                    </p>
                                    <p className="font-medium">
                                        {payment.tenant?.name || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Telepon
                                    </p>
                                    <p className="font-medium">
                                        {payment.tenant?.phone || "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Kost
                                    </p>
                                    <p className="font-medium">
                                        {payment.tenant?.room?.kost?.name ||
                                            "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Kamar
                                    </p>
                                    <p className="font-medium">
                                        Kamar{" "}
                                        {payment.tenant?.room?.room_number ||
                                            "-"}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Jumlah Pembayaran
                                    </p>
                                    <p className="font-medium text-lg">
                                        Rp{" "}
                                        {parseInt(
                                            payment.amount,
                                        ).toLocaleString("id-ID")}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Tanggal Pembayaran
                                    </p>
                                    <p className="font-medium">
                                        {formatDate(payment.payment_date)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Status
                                    </p>
                                    <div className="mt-1">
                                        {getStatusBadge(payment.status)}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Keterangan
                                    </p>
                                    <p className="font-medium">
                                        {payment.description || "-"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
