import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ payments, filters }) {
    const [search, setSearch] = React.useState(filters?.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("payments.index"),
            { search },
            { preserveState: true },
        );
    };

    const handleReset = () => {
        setSearch("");
        router.get(route("payments.index"), {}, { preserveState: true });
    };

    const handleDelete = (id) => {
        if (confirm("Yakin mau hapus data pembayaran ini?")) {
            router.delete(`/payments/${id}`);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            paid: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900",
            pending:
                "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900",
            overdue:
                "bg-rose-50 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900",
        };
        const labels = {
            paid: "✓ Lunas",
            pending: "⏳ Pending",
            overdue: "⚠ Terlambat",
        };
        return (
            <span
                className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${badges[status]}`}
            >
                {labels[status]}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const formatCurrency = (amount) => {
        return `Rp ${parseInt(amount).toLocaleString("id-ID")}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <h2 className="font-semibold text-lg sm:text-xl text-gray-800 dark:text-gray-100 leading-tight">
                        Manajemen Pembayaran
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                        <Link
                            href={route("payments.export-pdf")}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-sm"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <span>Export PDF</span>
                        </Link>
                        <Link
                            href={route("payments.create")}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-xl shadow-sm transition flex items-center justify-center gap-2 text-sm"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>Catat Pembayaran</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Riwayat Pembayaran" />

            <div className="py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Search Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 p-4 sm:p-6 mb-4 sm:mb-6">
                        <form
                            onSubmit={handleSearch}
                            className="flex flex-col md:flex-row gap-2 sm:gap-3"
                        >
                            <div className="flex-1 relative">
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari berdasarkan nama penyewa atau nomor telepon..."
                                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-400 transition text-sm sm:text-base"
                                />
                            </div>
                            <div className="flex gap-2 sm:gap-3 w-full md:w-auto">
                                <button
                                    type="submit"
                                    className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl transition shadow-sm text-sm sm:text-base text-center"
                                >
                                    Cari
                                </button>
                                {search && (
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="flex-1 md:flex-none bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-semibold py-2.5 sm:py-3 px-5 sm:px-6 rounded-xl transition text-sm sm:text-base text-center"
                                    >
                                        Reset
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Table Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                                Riwayat Transaksi Masuk
                            </h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Total log sistem: {payments?.length || 0}{" "}
                                transaksi tercatat
                            </p>
                        </div>

                        <div className="relative overflow-hidden after:absolute after:right-0 after:top-0 after:bottom-0 after:w-6 after:bg-gradient-to-l after:from-black/5 after:to-transparent after:pointer-events-none lg:after:hidden">
                            <div className="overflow-x-auto shadow-inner">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left">
                                    <thead className="bg-gray-50/70 dark:bg-gray-900/50">
                                        <tr>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Penyewa
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Alokasi Unit
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Jumlah Pembayaran
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Tanggal Buku
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Keterangan Audit
                                            </th>
                                            <th className="px-5 py-3.5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Aksi
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                                        {payments && payments.length > 0 ? (
                                            payments.map((payment) => (
                                                <tr
                                                    key={payment.id}
                                                    className="hover:bg-gray-50/80 dark:hover:bg-gray-900/50 transition"
                                                >
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-9 h-9 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xs flex-shrink-0">
                                                                {payment.tenant?.name?.charAt(
                                                                    0,
                                                                ) || "?"}
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-gray-900 dark:text-gray-100 text-xs sm:text-sm">
                                                                    {payment
                                                                        .tenant
                                                                        ?.name ||
                                                                        "-"}
                                                                </div>
                                                                <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1 mt-0.5">
                                                                    <svg
                                                                        className="w-3 h-3 text-gray-400 dark:text-gray-500"
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
                                                                    <span>
                                                                        {payment
                                                                            .tenant
                                                                            ?.phone ||
                                                                            "-"}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-1.5">
                                                                <svg
                                                                    className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
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
                                                                <span>
                                                                    {payment
                                                                        .tenant
                                                                        ?.room
                                                                        ?.kost
                                                                        ?.name ||
                                                                        "-"}
                                                                </span>
                                                            </div>
                                                            <div className="text-[11px] text-gray-400 dark:text-gray-500 font-medium flex items-center gap-1.5 mt-0.5 pl-5">
                                                                <span>
                                                                    Unit Kamar{" "}
                                                                    {payment
                                                                        .tenant
                                                                        ?.room
                                                                        ?.room_number ||
                                                                        "-"}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                                                        {formatCurrency(
                                                            payment.amount,
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium">
                                                        <div className="flex items-center gap-1.5">
                                                            <svg
                                                                className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500"
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
                                                            <span>
                                                                {formatDate(
                                                                    payment.payment_date,
                                                                )}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap">
                                                        {getStatusBadge(
                                                            payment.status,
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-4 text-xs font-medium text-gray-500 dark:text-gray-400 max-w-xs truncate">
                                                        {payment.description ||
                                                            "-"}
                                                    </td>
                                                    <td className="px-5 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                                                        <div className="flex gap-1.5">
                                                            <Link
                                                                href={route(
                                                                    "payments.show",
                                                                    payment.id,
                                                                )}
                                                                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 px-2.5 py-1 rounded-md transition text-xs"
                                                            >
                                                                Lihat
                                                            </Link>
                                                            <Link
                                                                href={route(
                                                                    "payments.edit",
                                                                    payment.id,
                                                                )}
                                                                className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 bg-yellow-50 dark:bg-yellow-900/30 hover:bg-yellow-100 dark:hover:bg-yellow-900/50 px-2.5 py-1 rounded-md transition text-xs"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        payment.id,
                                                                    )
                                                                }
                                                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 px-2.5 py-1 rounded-md transition text-xs"
                                                            >
                                                                Hapus
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="px-5 py-10 sm:py-14 text-center"
                                                >
                                                    <svg
                                                        className="w-8 h-8 mx-auto mb-2 text-gray-300 dark:text-gray-600"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                        />
                                                    </svg>
                                                    <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 italic">
                                                        {search
                                                            ? "Tidak ada data pembayaran yang sesuai kriteria pencarian."
                                                            : "Belum ada log data transaksi pembayaran terdaftar."}
                                                    </p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
