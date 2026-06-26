import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        address: "",
        owner_name: "",
        owner_phone: "",
        photo: null,
    });

    const [photoPreview, setPhotoPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("kosts.store"));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData("photo", file);
            setPhotoPreview(URL.createObjectURL(file));
        } else {
            setData("photo", null);
            setPhotoPreview(null);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                        Tambah Kost Baru
                    </h2>
                    <Link
                        href={route("kosts.index")}
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
            <Head title="Tambah Kost" />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100">
                        <div className="p-5 sm:p-8 text-gray-900">
                            <div className="border-b border-gray-100 pb-4 mb-6">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Registrasi Properti
                                </h3>
                                <p className="text-xs text-gray-500">
                                    Daftarkan aset akomodasi kost baru Anda ke
                                    dalam sistem manajemen
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5 sm:space-y-6"
                                encType="multipart/form-data"
                            >
                                {/* Input Nama */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                                        {/* Line Icon: Office Building */}
                                        <svg
                                            className="w-4 h-4 text-gray-400"
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
                                        Nama Properti Kost
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Masukkan nama properti baru"
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* Input Alamat */}
                                <div className="space-y-1">
                                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                                        {/* Line Icon: Location Pin */}
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                        </svg>
                                        Alamat Lengkap Kost
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        placeholder="Masukkan lokasi koordinat atau alamat operasional lengkap"
                                        rows="3"
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition resize-none"
                                        required
                                    />
                                    {errors.address && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.address}
                                        </p>
                                    )}
                                </div>

                                {/* Grid Dua Kolom Pemilik */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Nama Pemilik */}
                                    <div className="space-y-1">
                                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                                            {/* Line Icon: User */}
                                            <svg
                                                className="w-4 h-4 text-gray-400"
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
                                            Nama Pemilik
                                        </label>
                                        <input
                                            type="text"
                                            value={data.owner_name}
                                            onChange={(e) =>
                                                setData(
                                                    "owner_name",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Nama pengelola aset"
                                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                            required
                                        />
                                        {errors.owner_name && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.owner_name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Telepon Pemilik */}
                                    <div className="space-y-1">
                                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                                            {/* Line Icon: Phone */}
                                            <svg
                                                className="w-4 h-4 text-gray-400"
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
                                            Telepon Pemilik
                                        </label>
                                        <input
                                            type="text"
                                            value={data.owner_phone}
                                            onChange={(e) =>
                                                setData(
                                                    "owner_phone",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Contoh: 0812XXXXXXXX"
                                            className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                            required
                                        />
                                        {errors.owner_phone && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.owner_phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Bagian Unggah Foto */}
                                <div className="space-y-1 border-t border-gray-100 pt-5">
                                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
                                        {/* Line Icon: Photo */}
                                        <svg
                                            className="w-4 h-4 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        Media Dokumentasi Visual
                                    </label>

                                    {/* Preview Foto Baru Langsung Muncul jika dipilih */}
                                    {photoPreview && (
                                        <div className="max-w-md my-3 space-y-1">
                                            <p className="text-xs font-semibold text-emerald-600">
                                                Pratinjau Berkas Foto:
                                            </p>
                                            <div className="rounded-xl overflow-hidden border border-emerald-200 shadow-sm bg-emerald-50/10">
                                                <img
                                                    src={photoPreview}
                                                    alt="Preview Berkas"
                                                    className="w-full h-44 object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        onChange={handlePhotoChange}
                                        className="mt-1 block w-full text-xs sm:text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer transition"
                                        accept="image/*"
                                    />
                                    <p className="text-[11px] text-gray-400 leading-relaxed mt-1.5">
                                        * Pilih satu file foto terbaik yang
                                        merepresentasikan identitas bangunan
                                        depan properti (Maksimal batas berkas
                                        file 2MB).
                                    </p>
                                    {errors.photo && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.photo}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol Batal & Simpan */}
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100">
                                    <Link
                                        href={route("kosts.index")}
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
                                            : "Simpan Aset"}
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
