import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ room, kosts }) {
    const { data, setData, put, processing, errors } = useForm({
        kost_id: room.kost_id,
        room_number: room.room_number,
        price: room.price,
        status: room.status,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("rooms.update", room.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-100 leading-tight">
                        Edit Unit Kamar
                    </h2>
                    <Link
                        href={route("rooms.index")}
                        className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                    >
                        ← Kembali ke Manajemen Unit
                    </Link>
                </div>
            }
        >
            <Head title="Edit Kamar" />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm dark:shadow-none rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="p-5 sm:p-8 text-gray-900 dark:text-gray-100">
                            {/* Header Section */}
                            <div className="border-b border-gray-100 dark:border-gray-700 pb-4 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    Informasi Unit Kamar
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Perbarui relasi properti, harga sewa
                                    bulanan, dan status operasional unit
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5 sm:space-y-6"
                            >
                                {/* Pilihan Properti Kost */}
                                <div className="space-y-1">
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Pilih Properti Kost
                                    </label>
                                    <select
                                        value={data.kost_id}
                                        onChange={(e) =>
                                            setData("kost_id", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition bg-white"
                                        required
                                    >
                                        <option value="">
                                            -- Hubungkan ke Properti Kost --
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
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Nomor / Kode Unit Kamar
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
                                            placeholder="Contoh: A-01, 102, dll"
                                            className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
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
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            Harga per Bulan (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            value={data.price}
                                            onChange={(e) =>
                                                setData("price", e.target.value)
                                            }
                                            placeholder="Masukkan nominal angka saja"
                                            className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                            min="0"
                                            required
                                        />
                                        {errors.price && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ️ {errors.price}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Status Kamar */}
                                <div className="space-y-1">
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Status Operasional Unit
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition bg-white font-medium"
                                        required
                                    >
                                        <option value="available">
                                            ✓ Tersedia (Kosong)
                                        </option>
                                        <option value="occupied">
                                            • Terisi (Ada Penghuni)
                                        </option>
                                        <option value="maintenance">
                                            ⏳ Perbaikan (Maintenance)
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.status}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol Batal & Simpan */}
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <Link
                                        href={route("rooms.index")}
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
                                            : "Simpan Perubahan"}
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
