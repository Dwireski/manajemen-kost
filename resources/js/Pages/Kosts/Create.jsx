import React from "react";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("kosts.store"));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-lg sm:text-xl text-gray-800 leading-tight">
                    Tambah Kost Baru
                </h2>
            }
        >
            <Head title="Tambah Kost" />

            <div className="py-4 sm:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-4 sm:p-6 text-gray-900">
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 sm:space-y-6"
                                encType="multipart/form-data"
                            >
                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Nama Kost
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 sm:p-3 text-sm sm:text-base"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Alamat
                                    </label>
                                    <textarea
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 sm:p-3 text-sm sm:text-base"
                                        required
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                                            {errors.address}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700">
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 sm:p-3 text-sm sm:text-base"
                                        required
                                    />
                                    {errors.owner_name && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                                            {errors.owner_name}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700">
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2.5 sm:p-3 text-sm sm:text-base"
                                        required
                                    />
                                    {errors.owner_phone && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                                            {errors.owner_phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs sm:text-sm font-medium text-gray-700">
                                        Foto Kost
                                    </label>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            setData("photo", e.target.files[0])
                                        }
                                        className="mt-1 block w-full text-xs sm:text-sm text-gray-500 file:mr-3 sm:file:mr-4 file:py-2 file:px-3 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                        accept="image/*"
                                    />
                                    {errors.photo && (
                                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                                            {errors.photo}
                                        </p>
                                    )}
                                </div>

                                <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-4">
                                    <Link
                                        href={route("kosts.index")}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2.5 sm:py-2 px-4 rounded text-sm sm:text-base text-center"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2.5 sm:py-2 px-4 rounded disabled:opacity-50 text-sm sm:text-base"
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
