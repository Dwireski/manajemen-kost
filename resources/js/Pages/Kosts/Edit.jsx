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
        _method: "PUT",
    });

    const [photoPreview, setPhotoPreview] = useState(null);

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

    if (!kost || !kost.id) {
        return (
            <AuthenticatedLayout
                header={
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800">
                        Edit Kost
                    </h2>
                }
            >
                <Head title="Edit Kost" />
                <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-xl mx-auto">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center space-y-4">
                            <span className="text-4xl block">⚠️</span>
                            <p className="text-gray-600 font-medium text-sm sm:text-base">
                                Data properti kost tidak ditemukan atau tidak
                                valid.
                            </p>
                            <Link
                                href={route("kosts.index")}
                                className="inline-flex justify-center w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2.5 px-5 rounded-xl transition text-sm"
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
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                        Edit Properti Kost
                    </h2>
                    <Link
                        href={route("kosts.index")}
                        className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                    >
                        ← Kembali ke Manajemen
                    </Link>
                </div>
            }
        >
            <Head title={`Edit Properti: ${kost.name}`} />

            <div className="py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white overflow-hidden shadow-sm rounded-2xl border border-gray-100">
                        <div className="p-5 sm:p-8 text-gray-900">
                            <div className="border-b border-gray-100 pb-4 mb-6">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Informasi Properti
                                </h3>
                                <p className="text-xs text-gray-500">
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
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                                        Nama Properti Kost
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        placeholder="Masukkan nama properti"
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
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                                        Alamat Lengkap
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        placeholder="Masukkan lokasi atau alamat operasional"
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

                                {/* Grid Dua Kolom untuk Owner */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    {/* Nama Pemilik */}
                                    <div className="space-y-1">
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
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
                                        <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
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
                                    <label className="block text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider mb-2">
                                        Berkas Media Foto Kost
                                    </label>

                                    {/* Grid Preview Foto Berdampingan/Responsif */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3">
                                        {/* Preview Foto Lama (jika ada) */}
                                        {kost.photo && !photoPreview && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-semibold text-gray-400">
                                                    Foto Saat Ini:
                                                </p>
                                                <div className="rounded-xl overflow-hidden border border-gray-100 shadow-inner bg-gray-50">
                                                    <img
                                                        src={`/${kost.photo}`}
                                                        alt="Foto Kost"
                                                        className="w-full h-40 object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Preview Foto Baru (jika dipilih) */}
                                        {photoPreview && (
                                            <div className="space-y-1">
                                                <p className="text-xs font-semibold text-emerald-600">
                                                    Preview Foto Baru:
                                                </p>
                                                <div className="rounded-xl overflow-hidden border border-emerald-200 shadow-sm bg-emerald-50/20">
                                                    <img
                                                        src={photoPreview}
                                                        alt="Preview Foto"
                                                        className="w-full h-40 object-cover"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Input File Custom / Clean Design */}
                                    <input
                                        type="file"
                                        onChange={handlePhotoChange}
                                        className="mt-1 block w-full text-xs sm:text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer cursor-pointer transition"
                                        accept="image/*"
                                    />
                                    <p className="text-[11px] text-gray-400 leading-relaxed mt-1.5">
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

                                {/* Tombol Aksi Batal / Simpan */}
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
