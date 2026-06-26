import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create({ rooms }) {
    const { data, setData, post, processing, errors } = useForm({
        room_id: "",
        name: "",
        phone: "",
        move_in_date: "",
        move_out_date: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("tenants.store"));
    };

    // ✅ FUNGSI FORMATCURRENCY YANG DITAMBAHKAN
    const formatCurrency = (amount) => {
        if (!amount) return "Rp 0";
        return `Rp ${parseInt(amount).toLocaleString("id-ID")}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                        Tambah Penyewa Baru
                    </h2>
                    <Link
                        href={route("tenants.index")}
                        className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
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
                        Kembali ke Daftar
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Penyewa" />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100">
                        <div className="p-5 sm:p-8 text-gray-900">
                            <div className="border-b border-gray-100 pb-4 mb-6">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Registrasi Penghuni
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Daftarkan profil penyewa baru dan alokasikan
                                    unit kamar yang tersedia
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5 sm:space-y-6"
                            >
                                {/* Pilihan Kamar */}
                                <div className="space-y-1">
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
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
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            />
                                        </svg>
                                        Pilih Kamar Tersedia
                                    </label>
                                    <select
                                        value={data.room_id}
                                        onChange={(e) =>
                                            setData("room_id", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition bg-white"
                                        required
                                        disabled={rooms.length === 0}
                                    >
                                        <option value="">
                                            -- Hubungkan dengan Kode Unit Kamar
                                            --
                                        </option>
                                        {rooms.map((room) => (
                                            <option
                                                key={room.id}
                                                value={room.id}
                                            >
                                                {room.kost?.name} - Kamar{" "}
                                                {room.room_number} (
                                                {formatCurrency(room.price)}
                                                /bulan)
                                            </option>
                                        ))}
                                    </select>
                                    {errors.room_id && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.room_id}
                                        </p>
                                    )}
                                    {rooms.length === 0 && (
                                        <p className="text-amber-600 text-xs font-medium mt-1.5 flex items-center gap-1">
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
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                                />
                                            </svg>
                                            Tidak ada unit kamar kosong yang
                                            tersedia. Sila tambahkan data kamar
                                            baru terlebih dahulu.
                                        </p>
                                    )}
                                </div>

                                {/* Grid Dua Kolom untuk Nama & Telepon */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Nama Penyewa */}
                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
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
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                            Nama Lengkap Penyewa
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            placeholder="Masukkan nama lengkap penghuni"
                                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                            required
                                        />
                                        {errors.name && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Telepon */}
                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
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
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                            Nomor Telepon / WhatsApp
                                        </label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            placeholder="Contoh: 081234567xxx"
                                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                            required
                                        />
                                        {errors.phone && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Grid Dua Kolom untuk Tanggal */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Tanggal Masuk */}
                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
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
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Tanggal Mulai Masuk
                                        </label>
                                        <input
                                            type="date"
                                            value={data.move_in_date}
                                            onChange={(e) =>
                                                setData(
                                                    "move_in_date",
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition bg-white"
                                            required
                                        />
                                        {errors.move_in_date && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.move_in_date}
                                            </p>
                                        )}
                                    </div>

                                    {/* Tanggal Keluar */}
                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider flex items-center gap-1.5">
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
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            Tanggal Keluar Berakhir (Opsional)
                                        </label>
                                        <input
                                            type="date"
                                            value={data.move_out_date}
                                            onChange={(e) =>
                                                setData(
                                                    "move_out_date",
                                                    e.target.value,
                                                )
                                            }
                                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition bg-white"
                                        />
                                        {errors.move_out_date && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.move_out_date}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Tombol Batal & Simpan */}
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100">
                                    <Link
                                        href={route("tenants.index")}
                                        className="w-full sm:w-auto text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-5 rounded-xl transition text-sm sm:text-base"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={
                                            processing || rooms.length === 0
                                        }
                                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm hover:shadow transition disabled:opacity-50 text-sm sm:text-base"
                                    >
                                        {processing
                                            ? "Menyimpan..."
                                            : "Simpan Penyewa"}
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
