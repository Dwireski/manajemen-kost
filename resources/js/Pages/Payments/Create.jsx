import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ tenants }) {
    const { data, setData, post, processing, errors } = useForm({
        tenant_id: "",
        amount: "",
        payment_date: new Date().toISOString().split("T")[0],
        status: "paid",
        description: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("payments.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Catat Pembayaran Baru
                </h2>
            }
        >
            <Head title="Catat Pembayaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Pilih Penyewa
                                    </label>
                                    <select
                                        value={data.tenant_id}
                                        onChange={(e) =>
                                            setData("tenant_id", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">
                                            -- Pilih Penyewa --
                                        </option>
                                        {tenants.map((tenant) => (
                                            <option
                                                key={tenant.id}
                                                value={tenant.id}
                                            >
                                                {tenant.name} -{" "}
                                                {tenant.room?.kost?.name} (Kamar{" "}
                                                {tenant.room?.room_number})
                                            </option>
                                        ))}
                                    </select>
                                    {errors.tenant_id && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.tenant_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Jumlah Pembayaran (Rp)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.amount}
                                        onChange={(e) =>
                                            setData("amount", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Contoh: 500000"
                                        min="0"
                                        required
                                    />
                                    {errors.amount && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.amount}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tanggal Pembayaran
                                    </label>
                                    <input
                                        type="date"
                                        value={data.payment_date}
                                        onChange={(e) =>
                                            setData(
                                                "payment_date",
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.payment_date && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.payment_date}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status Pembayaran
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="paid">Lunas</option>
                                        <option value="pending">Pending</option>
                                        <option value="overdue">
                                            Terlambat
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Keterangan (Opsional)
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        placeholder="Contoh: Pembayaran bulan Juni 2026"
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Link
                                        href={route("payments.index")}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        {processing ? "Menyimpan..." : "Simpan"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
