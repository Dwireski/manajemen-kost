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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Tambah Penyewa Baru
                </h2>
            }
        >
            <Head title="Tambah Penyewa" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Pilih Kamar
                                    </label>
                                    <select
                                        value={data.room_id}
                                        onChange={(e) =>
                                            setData("room_id", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="">
                                            -- Pilih Kamar Tersedia --
                                        </option>
                                        {rooms.map((room) => (
                                            <option
                                                key={room.id}
                                                value={room.id}
                                            >
                                                {room.kost?.name} - Kamar{" "}
                                                {room.room_number} (Rp{" "}
                                                {parseInt(
                                                    room.price,
                                                ).toLocaleString("id-ID")}
                                                /bulan)
                                            </option>
                                        ))}
                                    </select>
                                    {errors.room_id && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.room_id}
                                        </p>
                                    )}
                                    {rooms.length === 0 && (
                                        <p className="text-yellow-600 text-sm mt-1">
                                            ⚠️ Tidak ada kamar yang tersedia.
                                            Tambah kamar baru terlebih dahulu.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Nama Penyewa
                                    </label>
                                    <input
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                                        Telepon
                                    </label>
                                    <input
                                        type="text"
                                        value={data.phone}
                                        onChange={(e) =>
                                            setData("phone", e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tanggal Masuk
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        required
                                    />
                                    {errors.move_in_date && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.move_in_date}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tanggal Keluar (Opsional)
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
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.move_out_date && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.move_out_date}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <Link
                                        href={route("tenants.index")}
                                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                    >
                                        Batal
                                    </Link>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
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
