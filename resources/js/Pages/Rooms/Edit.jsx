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
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit Kamar
                </h2>
            }
        >
            <Head title="Edit Kamar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Pilih Kost
                                    </label>
                                    <select
                                        value={data.kost_id}
                                        onChange={(e) =>
                                            setData("kost_id", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">
                                            -- Pilih Kost --
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
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.kost_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nomor Kamar
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.room_number && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.room_number}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Harga per Bulan (Rp)
                                    </label>
                                    <input
                                        type="number"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        min="0"
                                        required
                                    />
                                    {errors.price && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Status
                                    </label>
                                    <select
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="available">
                                            Tersedia
                                        </option>
                                        <option value="occupied">Terisi</option>
                                        <option value="maintenance">
                                            Perbaikan
                                        </option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Link
                                        href={route("rooms.index")}
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
