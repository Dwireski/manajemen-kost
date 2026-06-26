import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function Show({ kost }) {
    const formatCurrency = (amount) => {
        if (!amount) return "Hubungi Kami";
        return `Rp ${parseInt(amount).toLocaleString("id-ID")}`;
    };

    return (
        <>
            <Head title={kost.name} />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg">
                                    🏠
                                </div>
                                <span className="font-bold text-gray-800 text-base sm:text-lg">
                                    Manajemen Kost
                                </span>
                            </Link>
                            <Link
                                href={route("public.index")}
                                className="flex items-center gap-1 sm:gap-2 text-blue-500 hover:text-blue-600 font-medium transition text-sm sm:text-base"
                            >
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                <span className="hidden sm:inline">
                                    Kembali
                                </span>
                                <span className="sm:hidden">Back</span>
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Hero Section dengan Foto */}
                <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden">
                    {kost.photo ? (
                        <img
                            src={`/${kost.photo}`}
                            alt={kost.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.parentElement.classList.add(
                                    "bg-gradient-to-r",
                                    "from-blue-500",
                                    "to-blue-600",
                                );
                                e.target.style.display = "none";
                            }}
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-blue-600"></div>
                    )}

                    {/* Overlay gelap untuk readability text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Content di atas foto */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
                                <span className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                                    Kost Putra
                                </span>
                                {kost.available_rooms.length > 0 && (
                                    <span className="bg-green-500 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                                        Tersedia
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 drop-shadow-lg">
                                {kost.name}
                            </h1>
                            <p className="text-sm sm:text-base md:text-xl flex items-center gap-2 drop-shadow-lg">
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="line-clamp-2">
                                    {kost.address}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content - Stacked Vertikal dengan Gap */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 space-y-4 sm:space-y-6">
                    {/* 1. Informasi Kost */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Informasi Kost
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                    🏠
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                                        Nama Kost
                                    </p>
                                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                        {kost.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                    📍
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                                        Alamat
                                    </p>
                                    <p className="font-semibold text-gray-900 text-sm">
                                        {kost.address}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                    👤
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                                        Pemilik
                                    </p>
                                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                        {kost.owner_name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                                    📱
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                                        Kontak
                                    </p>
                                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                                        {kost.owner_phone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Kamar Tersedia */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Kamar Tersedia
                        </h2>

                        {kost.available_rooms.length > 0 ? (
                            <div className="space-y-3 sm:space-y-4">
                                {kost.available_rooms.map((room) => (
                                    <div
                                        key={room.id}
                                        className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:border-blue-300 hover:shadow-md transition"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-lg sm:text-xl flex-shrink-0">
                                                        🚪
                                                    </div>
                                                    <h3 className="text-base sm:text-lg font-bold text-gray-900">
                                                        Kamar {room.room_number}
                                                    </h3>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        ✓ Tersedia
                                                    </span>
                                                    <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        AC
                                                    </span>
                                                    <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                        WiFi
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-left sm:text-right">
                                                <p className="text-xs sm:text-sm text-gray-500 mb-1">
                                                    Harga per bulan
                                                </p>
                                                <p className="text-2xl sm:text-3xl font-bold text-blue-600">
                                                    {formatCurrency(room.price)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg border border-gray-200">
                                <div className="text-3xl sm:text-4xl mb-3">
                                    😔
                                </div>
                                <p className="text-sm sm:text-base text-gray-600 font-medium">
                                    Semua kamar sedang terisi
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 mt-1 px-2">
                                    Hubungi pemilik untuk info ketersediaan
                                    berikutnya
                                </p>
                            </div>
                        )}
                    </div>

                    {/* 3. Fasilitas */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Fasilitas
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                                    WiFi
                                </span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                                    AC
                                </span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                                    Kasur
                                </span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                                    K. Mandi Dalam
                                </span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                                    Akses 24 Jam
                                </span>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                <svg
                                    className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span className="text-xs sm:text-sm text-gray-700 font-medium">
                                    Parkir
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* 4. Hubungi Pemilik */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Hubungi Pemilik
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                            {/* Info Pemilik */}
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl sm:text-2xl flex-shrink-0">
                                        👤
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Pemilik Kost
                                        </p>
                                        <p className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                                            {kost.owner_name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl sm:text-2xl flex-shrink-0">
                                        📱
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500">
                                            Telepon / WhatsApp
                                        </p>
                                        <p className="font-semibold text-gray-900 text-base sm:text-lg truncate">
                                            {kost.owner_phone}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 text-center">
                                    Respon cepat • Verifikasi pemilik • Aman
                                </p>
                            </div>

                            {/* Tombol Kontak */}
                            <div className="space-y-3 sm:space-y-4">
                                <a
                                    href={`https://wa.me/${kost.owner_phone.replace(/\D/g, "")}?text=Halo, saya tertarik dengan kost ${kost.name}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 sm:py-4 rounded-xl transition shadow-sm text-base sm:text-lg"
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    Chat WhatsApp
                                </a>

                                <a
                                    href={`tel:${kost.owner_phone}`}
                                    className="flex items-center justify-center gap-2 sm:gap-3 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 sm:py-4 rounded-xl transition shadow-sm text-base sm:text-lg"
                                >
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                    Telepon Sekarang
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-10 sm:py-12 md:py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 px-2">
                            Punya Kost dan Ingin Menyewakan?
                        </h3>
                        <p className="text-base sm:text-xl text-blue-100 mb-6 sm:mb-8 px-2">
                            Daftarkan kost kamu sekarang dan jangkau lebih
                            banyak calon penyewa
                        </p>
                        <a
                            href={route("register")}
                            className="inline-block bg-white text-blue-600 font-bold py-3 sm:py-4 px-6 sm:px-10 rounded-lg hover:bg-blue-50 transition shadow-lg text-sm sm:text-base"
                        >
                            Daftar Sekarang →
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 py-8 sm:py-10 md:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg">
                                        🏠
                                    </div>
                                    <span className="font-bold text-gray-800 text-lg">
                                        Manajemen Kost
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm leading-relaxed">
                                    Platform pencarian kost terpercaya dengan
                                    kost terverifikasi dan harga transparan.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4">
                                    Navigasi
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-600 hover:text-blue-600 text-sm transition"
                                        >
                                            Beranda
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={route("login")}
                                            className="text-gray-600 hover:text-blue-600 text-sm transition"
                                        >
                                            Login
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={route("register")}
                                            className="text-gray-600 hover:text-blue-600 text-sm transition"
                                        >
                                            Daftar
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4">
                                    Informasi
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-blue-600 text-sm transition"
                                        >
                                            Tentang Kami
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-blue-600 text-sm transition"
                                        >
                                            Syarat & Ketentuan
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-blue-600 text-sm transition"
                                        >
                                            Kebijakan Privasi
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-4">
                                    Kontak
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-gray-600 text-sm">
                                        <span>📧</span>
                                        <span>cs@manajemenkost.com</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600 text-sm">
                                        <span>📱</span>
                                        <span>+62 812-3456-7890</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600 text-sm">
                                        <span>📍</span>
                                        <span>Malang, Jawa Timur</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 mt-8 sm:mt-10 pt-6 sm:pt-8 text-center">
                            <p className="text-gray-500 text-xs sm:text-sm">
                                © 2026 Manajemen Kost. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
