import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ kosts }) {
    const { data, setData, post, processing, errors } = useForm({
        kost_id: "",
        room_number: "",
        price: "",
        status: "available",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("rooms.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                        Tambah Kamar Baru
                    </h2>
                    <Link
                        href={route("rooms.index")}
                        className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                    >
                        {/* Line Icon: Arrow Left */}
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
                        Kembali ke Daftar
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Kamar" />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100">
                        <div className="p-5 sm:p-8 text-gray-900">
                            <div className="border-b border-gray-100 pb-4 mb-6">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Registrasi Kamar
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Tambahkan unit kamar baru dan hubungkan ke
                                    lokasi properti kost induk
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5 sm:space-y-6"
                            >
                                {/* Pilihan Properti Kost */}
                                <div className="space-y-1">
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                                        {/* Line Icon: Office Building */}
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
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                        Hubungkan ke Properti Kost
                                    </label>
                                    <select
                                        value={data.kost_id}
                                        onChange={(e) =>
                                            setData("kost_id", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition bg-white"
                                        required
                                    >
                                        <option value="">
                                            -- Pilih Lokasi Kost Induk --
                                        </option>
                                        {kosts.map((kost) => (
                                            <option
                                                key={kost.id}
                                                value={kost.id}
                                            >
                                                {kost.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.kost_id && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.kost_id}
                                        </p>
                                    )}
                                </div>

                                {/* Grid Dua Kolom untuk Detail Kamar */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Nomor Kamar */}
                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                                            {/* Line Icon: Key / Card identifier */}
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
                                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                                />
                                            </svg>
                                            Nomor / Kode Kamar
                                        </label>
                                        <input
                                            type="text"
                                            value={data.room_number}
                                            onChange={(e) =>
                                                setData(
                                                    "room_number",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Contoh: 101, A-02, B3"
                                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                            required
                                        />
                                        {errors.room_number && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.room_number}
                                            </p>
                                        )}
                                    </div>

                                    {/* Harga per Bulan */}
                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                                            {/* Line Icon: Cash / Currency tag */}
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
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Harga per Bulan (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            placeholder="Contoh: 750000"
                                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                            min="0"
                                            required
                                        />
                                        {errors.price && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.price}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Status Operasional */}
                                <div className="space-y-1">
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
                                        {/* Line Icon: Shield / Check status */}
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
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                        Status Awal Unit
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition bg-white"
                                        required
                                    >
                                        <option value="available">
                                            Tersedia (Kosong)
                                        </option>
                                        <option value="occupied">
                                            Terisi (Ada Penyewa)
                                        </option>
                                        <option value="maintenance">
                                            Perbaikan (Maintenance)
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.status}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol Batal & Simpan */}
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100">
                                    <Link
                                        href={route("rooms.index")}
                                        className="w-full sm:w-auto text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-5 rounded-xl transition text-sm sm:text-base"
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
                                            : "Simpan Kamar"}
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
