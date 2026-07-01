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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-100 leading-tight">
                        Catat Pembayaran Baru
                    </h2>
                    <Link
                        href={route("payments.index")}
                        className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition flex items-center gap-1"
                    >
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
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Kembali ke Riwayat
                    </Link>
                </div>
            }
        >
            <Head title="Catat Pembayaran" />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm dark:shadow-none rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="p-5 sm:p-8 text-gray-900 dark:text-gray-100">
                            <div className="border-b border-gray-100 dark:border-gray-700 pb-4 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    Form Transaksi Masuk
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Catat invoice atau pelunasan tagihan sewa
                                    bulanan dari penghuni
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5 sm:space-y-6"
                            >
                                {/* Pilihan Penyewa */}
                                <div className="space-y-1">
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
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
                                        Pilih Penghuni / Penyewa
                                    </label>
                                    <select
                                        value={data.tenant_id}
                                        onChange={(e) =>
                                            setData("tenant_id", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition bg-white"
                                        required
                                    >
                                        <option value="">
                                            -- Hubungkan dengan Nama Penyewa --
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
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.tenant_id}
                                        </p>
                                    )}
                                </div>

                                {/* Grid Dua Kolom untuk Nominal & Tanggal */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Jumlah Pembayaran */}
                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                                            <svg
                                                className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Jumlah Pembayaran (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={data.amount}
                                            onChange={(e) =>
                                                setData(
                                                    "amount",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Masukkan nominal angka pelunasan"
                                            className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                            min="0"
                                            required
                                        />
                                        {errors.amount && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.amount}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tanggal Pembayaran */}
                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                                            <svg
                                                className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
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
                                            className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition bg-white"
                                            required
                                        />
                                        {errors.payment_date && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.payment_date}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Status Pembayaran */}
                                <div className="space-y-1">
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        Status Buku Audit
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition bg-white font-medium"
                                        required
                                    >
                                        <option value="paid">
                                            Lunas (Paid)
                                        </option>
                                        <option value="pending">
                                            Pending (Menunggu Verifikasi)
                                        </option>
                                        <option value="overdue">
                                            Terlambat (Overdue)
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.status}
                                        </p>
                                    )}
                                </div>

                                {/* Keterangan */}
                                <div className="space-y-1">
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
                                        <svg
                                            className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                            />
                                        </svg>
                                        Keterangan Catatan Audit (Opsional)
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Contoh: Pembayaran deposit awal sewa & tagihan bulan depan"
                                        rows="3"
                                        className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition resize-none"
                                    />
                                    {errors.description && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.description}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol Aksi Batal / Simpan */}
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <Link
                                        href={route("payments.index")}
                                        className="w-full sm:w-auto text-center bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2.5 px-5 rounded-xl transition text-sm sm:text-base"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm hover:shadow transition disabled:opacity-50 text-sm sm:text-base"
                                    >
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan Log"}
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
