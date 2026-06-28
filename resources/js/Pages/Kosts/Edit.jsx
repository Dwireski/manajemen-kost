import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ kost }) {
    const { data, setData, post, processing, errors } = useForm({
        name: kost.name || "",
        address: kost.address || "",
        owner_name: kost.owner_name || "",
        owner_phone: kost.owner_phone || "",
        photo: null,
        photos: [],
        deleted_photo_ids: [],
        _method: "PUT",
    });

    const [photoPreview, setPhotoPreview] = useState(null);
    const [existingPhotos, setExistingPhotos] = useState(kost.photos || []);
    const [galleryPreviews, setGalleryPreviews] = useState([]);
    const [deletedPhotoIds, setDeletedPhotoIds] = useState([]);

    const getPhotoUrl = (photoPath) => {
        if (!photoPath) return null;
        if (
            photoPath.startsWith("http://") ||
            photoPath.startsWith("https://")
        ) {
            return photoPath;
        }
        const cleanPath = photoPath.replace(/^\/+/, "");
        return `/${cleanPath}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("kosts.update", kost.id));
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

    const handleNewGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const currentTotal =
            existingPhotos.length + data.photos.length - deletedPhotoIds.length;
        const remainingSlots = 10 - currentTotal;
        const filesToAdd = files.slice(0, remainingSlots);

        if (filesToAdd.length === 0) {
            alert("Maksimal 10 foto galeri!");
            return;
        }

        const updatedPhotos = [...data.photos, ...filesToAdd];
        setData("photos", updatedPhotos);

        const newPreviews = filesToAdd.map((file) => URL.createObjectURL(file));
        setGalleryPreviews([...galleryPreviews, ...newPreviews]);

        e.target.value = "";
    };

    const removeNewPhoto = (index) => {
        const updatedPhotos = data.photos.filter((_, i) => i !== index);
        const updatedPreviews = galleryPreviews.filter((_, i) => i !== index);

        setData("photos", updatedPhotos);
        setGalleryPreviews(updatedPreviews);
    };

    const removeExistingPhoto = (photoId) => {
        if (!confirm("Hapus foto ini dari galeri?")) return;

        setExistingPhotos(existingPhotos.filter((p) => p.id !== photoId));

        const updatedDeletedIds = [...deletedPhotoIds, photoId];
        setDeletedPhotoIds(updatedDeletedIds);
        setData("deleted_photo_ids", updatedDeletedIds);
    };

    const currentGalleryCount =
        existingPhotos.length + data.photos.length - deletedPhotoIds.length;

    if (!kost || !kost.id) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-100">
                        Edit Kost
                    </h2>
                }
            >
                <Head title="Edit Kost" />
                <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-xl mx-auto">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 text-center space-y-4">
                            <span className="text-4xl block">⚠️</span>
                            <p className="text-gray-600 dark:text-gray-300 font-medium text-sm sm:text-base">
                                Data properti kost tidak ditemukan atau tidak
                                valid.
                            </p>
                            <Link
                                href={route("kosts.index")}
                                className="inline-flex justify-center w-full sm:w-auto bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2.5 px-5 rounded-xl transition text-sm"
                            >
                                Kembali ke Daftar
                            </Link>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-100 leading-tight">
                        Edit Properti Kost
                    </h2>
                    <Link
                        href={route("kosts.index")}
                        className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition"
                    >
                        ← Kembali ke Manajemen
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Properti: ${kost.name}`} />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm dark:shadow-none rounded-2xl border border-gray-100 dark:border-gray-700">
                        <div className="p-5 sm:p-8 text-gray-900 dark:text-gray-100">
                            <div className="border-b border-gray-100 dark:border-gray-700 pb-4 mb-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                    Informasi Properti
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    Perbarui data detail kelola properti
                                    akomodasi Anda
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-5 sm:space-y-6"
                                encType="multipart/form-data"
                            >
                                {/* Input Nama */}
                                <div className="space-y-1">
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Nama Properti Kost
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Masukkan nama properti"
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
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Alamat Lengkap
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        placeholder="Masukkan lokasi atau alamat operasional"
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

                                {/* Grid Dua Kolom untuk Owner */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
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
                                            placeholder="Nama lengkap pengelola"
                                            className="mt-1 block w-full rounded-xl border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 shadow-sm focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20 p-3 text-sm sm:text-base transition"
                                            required
                                        />
                                        {errors.owner_name && (
                                            <p className="text-rose-500 text-xs font-medium mt-1">
                                                ⚠️ {errors.owner_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
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
                                            placeholder="Contoh: 081234567xxx"
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
                                {/* FOTO UTAMA (COVER) */}
                                {/* ========================================= */}
                                <div className="space-y-1 border-t border-gray-100 dark:border-gray-700 pt-5">
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider mb-2">
                                        Foto Utama (Cover)
                                    </label>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                                        {kost.photo && !photoPreview && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500">
                                                    Foto Saat Ini:
                                                </p>
                                                <div className="rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-inner bg-gray-50 dark:bg-gray-900/30">
                                                    <img
                                                        src={getPhotoUrl(
                                                            kost.photo,
                                                        )}
                                                        alt="Foto Kost"
                                                        className="w-full h-40 object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display =
                                                                "none";
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {photoPreview && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                                    Preview Foto Baru:
                                                </p>
                                                <div className="rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-800 shadow-sm bg-emerald-50/20 dark:bg-emerald-900/10">
                                                    <img
                                                        src={photoPreview}
                                                        alt="Preview Foto"
                                                        className="w-full h-40 object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <input
                                        type="file"
                                        onChange={handlePhotoChange}
                                        className="mt-1 block w-full text-xs sm:text-sm text-gray-500 dark:text-gray-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 dark:file:bg-blue-900/30 file:text-blue-700 dark:file:text-blue-300 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/50 file:cursor-pointer cursor-pointer transition"
                                        accept="image/*"
                                    />
                                    <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed mt-1.5">
                                        * Unggah foto berformat gambar baru
                                        untuk memperbarui dokumentasi aset
                                        visual properti (Maks. 2MB). Biarkan
                                        kosong jika tidak ingin diubah.
                                    </p>
                                    {errors.photo && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.photo}
                                        </p>
                                    )}
                                </div>

                                {/* ========================================= */}
                                {/* ✅ GALERI FOTO - FITUR BARU */}
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
                                            {currentGalleryCount} / 10 foto
                                        </span>
                                    </div>

                                    {/* ✅ Tampilkan Foto Lama yang Sudah Ada */}
                                    {existingPhotos.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                Foto yang sudah ada:
                                            </p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {existingPhotos.map((photo) => (
                                                    <div
                                                        key={photo.id}
                                                        className="relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-none bg-gray-50 dark:bg-gray-900/30"
                                                    >
                                                        <img
                                                            src={getPhotoUrl(
                                                                photo.url,
                                                            )}
                                                            alt={`Galeri ${photo.id}`}
                                                            className="w-full h-28 sm:h-32 object-cover"
                                                            onError={(e) => {
                                                                e.target.style.display =
                                                                    "none";
                                                            }}
                                                        />
                                                        <div className="absolute top-1.5 left-1.5 bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                                                            #
                                                            {photo.sort_order +
                                                                1}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                removeExistingPhoto(
                                                                    photo.id,
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
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* ✅ Area Upload Foto Baru */}
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
                                                Klik untuk tambah foto baru
                                            </p>
                                            <p className="text-[11px] text-gray-400 dark:text-gray-500">
                                                Bisa pilih banyak file sekaligus
                                                (max 10 foto total)
                                            </p>
                                            <input
                                                type="file"
                                                multiple
                                                onChange={
                                                    handleNewGalleryChange
                                                }
                                                accept="image/*"
                                                disabled={
                                                    currentGalleryCount >= 10
                                                }
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                            />
                                        </div>
                                    </div>

                                    {/* ✅ Preview Foto Baru yang Belum Diupload */}
                                    {galleryPreviews.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                                Foto baru yang akan diupload:
                                            </p>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {galleryPreviews.map(
                                                    (preview, index) => (
                                                        <div
                                                            key={`new-${index}`}
                                                            className="relative group rounded-xl overflow-hidden border border-emerald-200 dark:border-emerald-800 shadow-sm dark:shadow-none bg-emerald-50/20 dark:bg-emerald-900/10"
                                                        >
                                                            <img
                                                                src={preview}
                                                                alt={`Foto Baru ${index + 1}`}
                                                                className="w-full h-28 sm:h-32 object-cover"
                                                            />
                                                            <div className="absolute top-1.5 left-1.5 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                                                                NEW
                                                            </div>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeNewPhoto(
                                                                        index,
                                                                    )
                                                                }
                                                                className="absolute top-1.5 right-1.5 bg-rose-500 hover:bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-md transition opacity-0 group-hover:opacity-100"
                                                                title="Batalkan upload foto ini"
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
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
                                        * Galeri foto akan ditampilkan sebagai
                                        carousel di halaman detail publik kost.
                                    </p>
                                    {errors.photos && (
                                        <p className="text-rose-500 text-xs font-medium mt-1">
                                            ⚠️ {errors.photos}
                                        </p>
                                    )}
                                </div>

                                {/* Tombol Aksi */}
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
