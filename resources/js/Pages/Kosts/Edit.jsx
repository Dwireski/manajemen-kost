import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function Edit({ kost }) {
    const { data, setData, post, processing, errors } = useForm({
        name: kost.name || "",
        address: kost.address || "",
        owner_name: kost.owner_name || "",
        owner_phone: kost.owner_phone || "",
        photo: null, // Ditambahkan untuk upload foto
        _method: "PUT",
    });

    // State untuk preview foto baru yang dipilih
    const [photoPreview, setPhotoPreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("kosts.update", kost.id));
    };

    // Handler untuk preview foto sebelum upload
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
                    <h2 className="font-semibold text-xl text-gray-800">
                        Edit Kost
                    </h2>
                }
            >
                <Head title="Edit Kost" />
                <div className="py-12">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white p-6 rounded-lg">
                            <p className="text-red-500">
                                Data kost tidak ditemukan.
                            </p>
                            <Link
                                href={route("kosts.index")}
                                className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Kembali
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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Kost
                </h2>
            }
        >
            <Head title="Edit Kost" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Tambahkan encType untuk mendukung upload file */}
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                encType="multipart/form-data"
                            >
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nama Kost
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Alamat
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                        required
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                        required
                                    />
                                    {errors.owner_name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.owner_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                        required
                                    />
                                    {errors.owner_phone && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.owner_phone}
                                        </p>
                                    )}
                                </div>

                                {/* Input Upload Foto Ditambahkan Di Sini */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Foto Kost
                                    </label>

                                    {/* Preview Foto Lama (jika ada) */}
                                    {kost.photo && !photoPreview && (
                                        <div className="mt-2 mb-3">
                                            <p className="text-xs text-gray-500 mb-1">
                                                Foto saat ini:
                                            </p>
                                            <img
                                                src={kost.photo}
                                                alt="Foto Kost"
                                                className="w-full h-48 object-cover rounded-md border border-gray-300"
                                            />
                                        </div>
                                    )}

                                    {/* Preview Foto Baru (jika dipilih) */}
                                    {photoPreview && (
                                        <div className="mt-2 mb-3">
                                            <p className="text-xs text-gray-500 mb-1">
                                                Preview foto baru:
                                            </p>
                                            <img
                                                src={photoPreview}
                                                alt="Preview Foto"
                                                className="w-full h-48 object-cover rounded-md border border-gray-300"
                                            />
                                        </div>
                                    )}

                                    <input
                                        type="file"
                                        onChange={handlePhotoChange}
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        accept="image/*"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Upload foto baru untuk mengganti foto
                                        lama (Max 2MB). Kosongkan jika tidak
                                        ingin mengubah.
                                    </p>
                                    {errors.photo && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.photo}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Link
                                        href={route("kosts.index")}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        {processing ? "Menyimpan..." : "Update"}
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
