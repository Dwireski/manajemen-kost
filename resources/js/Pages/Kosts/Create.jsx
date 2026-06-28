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
        photos: [],
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [galleryPreviews, setGalleryPreviews] = useState([]);

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

    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const remainingSlots = 10 - data.photos.length;
        const filesToAdd = files.slice(0, remainingSlots);

        const updatedPhotos = [...data.photos, ...filesToAdd];
        setData("photos", updatedPhotos);

        const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
        setGalleryPreviews([...galleryPreviews, ...newPreviews]);

        e.target.value = "";
    };

    const removeGalleryPhoto = (index) => {
        const updatedPhotos = data.photos.filter((_, i) => i !== index);
        const updatedPreviews = galleryPreviews.filter((_, i) => i !== index);

        setData("photos", updatedPhotos);
        setGalleryPreviews(updatedPreviews);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-100 leading-tight">
                        Tambah Kost Baru
                    </h2>
                    <Link
                        href={route("kosts.index")}
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
                        Kembali ke Daftar
                    </Link>
                </div>
            }
        >
            <Head title="Tambah Kost" />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm dark:shadow-none rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="p-5 sm:p-8 text-gray-900 dark:text-gray-100">
                            <div className="border-b border-gray-100 dark:border-gray-700 pb-4 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    Registrasi Properti
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
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
                                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <svg
                                            className="w-4 h-4 text-gray-400 dark:text-gray-500"
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
                                        className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
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
                                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <svg
                                            className="w-4 h-4 text-gray-400 dark:text-gray-500"
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
                                        className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition resize-none"
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
                                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            <svg
                                                className="w-4 h-4 text-gray-400 dark:text-gray-500"
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
                                            className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
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
                                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            <svg
                                                className="w-4 h-4 text-gray-400 dark:text-gray-500"
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
                                            className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                            required
                                        />
                                        {errors.owner_phone && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.owner_phone}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* ========================================= */}
                                {/* BAGIAN UNGGAH FOTO UTAMA (COVER) */}
                                {/* ========================================= */}
                                <div className="space-y-1 border-t border-gray-100 dark:border-gray-700 pt-5">
                                    <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                                        <svg
                                            className="w-4 h-4 text-gray-400 dark:text-gray-500"
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
                                        Foto Utama (Cover)
                                    </label>

                                    {photoPreview && (
                                        <div className="max-w-md my-3 space-y-1">
                                            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                                Pratinjau Foto Cover:
                                            </p>
                                            <div className="rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-800 shadow-sm bg-emerald-50/10 dark:bg-emerald-900/10">
                                                <img
                                                    src={photoPreview}
                                                    alt="Preview Cover"
                                                    className="w-full h-44 object-cover"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        onChange={handlePhotoChange}
                                        className="mt-1 block w-full text-xs sm:text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 file:cursor-pointer cursor-pointer transition"
                                        accept="image/*"
                                    />
                                    <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed mt-1.5">
                                        * Pilih satu file foto terbaik yang
                                        merepresentasikan identitas bangunan
                                        depan properti (Maksimal batas berkas
                                        file 2MB).
                                    </p>
                                    {errors.photo && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ️ {errors.photo}
                                        </p>
                                    )}
                                </div>

                                {/* ========================================= */}
                                {/* ✅ BAGIAN BARU: GALERI FOTO (MULTI-UPLOAD) */}
                                {/* ========================================= */}
                                <div className="space-y-3 border-t border-gray-100 dark:border-gray-700 pt-5">
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                            <svg
                                                className="w-4 h-4 text-gray-400 dark:text-gray-500"
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
                                            Galeri Foto Tambahan
                                        </label>
                                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                                            {data.photos.length} / 10 foto
                                        </span>
                                    </div>

                                    {/* Area Upload Galeri */}
                                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 sm:p-6 bg-gray-50/50 dark:bg-gray-900/30 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-900/20 transition relative">
                                        <div className="text-center">
                                            <svg
                                                className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500 mb-2"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                                />
                                            </svg>
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
                                                Klik untuk pilih foto tambahan
                                            </p>
                                            <p className="text-[11px] text-gray-400 dark:text-gray-500">
                                                Bisa pilih banyak file sekaligus
                                                (max 10 foto, masing-masing max
                                                2MB)
                                            </p>
                                            <input
                                                type="file"
                                                multiple
                                                onChange={handleGalleryChange}
                                                accept="image/*"
                                                disabled={
                                                    data.photos.length >= 10
                                                }
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                                style={{ position: "relative" }}
                                            />
                                        </div>
                                    </div>

                                    {/* Grid Preview Galeri */}
                                    {galleryPreviews.length > 0 && (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                                            {galleryPreviews.map(
                                                (preview, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none bg-gray-50 dark:bg-gray-900/30"
                                                    >
                                                        <img
                                                            src={preview}
                                                            alt={`Galeri ${index + 1}`}
                                                            className="w-full h-28 sm:h-32 object-cover"
                                                        />
                                                        {/* Overlay nomor urut */}
                                                        <div className="absolute top-1.5 left-1.5 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                                                            #{index + 1}
                                                        </div>
                                                        {/* Tombol hapus */}
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeGalleryPhoto(
                                                                    index,
                                                                )
                                                            }
                                                            className="absolute top-1.5 right-1.5 bg-rose-500 hover:bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md transition opacity-0 group-hover:opacity-100"
                                                            title="Hapus foto ini"
                                                        >
                                                            <svg
                                                                className="w-3.5 h-3.5"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2.5"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M6 18L18 6M6 6l12 12"
                                                                />
                                                            </svg>
                                                        </button>
                                                        {/* Nama file (truncate) */}
                                                        <div className="px-2 py-1.5 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                                                                {data.photos[
                                                                    index
                                                                ]?.name ||
                                                                    `Foto ${index + 1}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ),
                                            )}
                                        </div>
                                    )}

                                    {/* Info Text */}
                                    <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
                                        * Foto-foto tambahan akan ditampilkan
                                        sebagai galeri di halaman detail kost.
                                        Anda bisa memilih banyak file sekaligus
                                        dari folder yang sama.
                                    </p>
                                    {errors.photos && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.photos}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol Batal & Simpan */}
                                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <Link
                                        href={route("kosts.index")}
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
