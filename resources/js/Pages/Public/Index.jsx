import React from "react";
import { Head, Link } from "@inertiajs/react";

export default function Index({ kosts, filters }) {
    const [search, setSearch] = React.useState(filters?.search || "");

    const handleSearch = (e) => {
        e.preventDefault();
        window.location.href = route("public.index", { search });
    };

    const formatCurrency = (amount) => {
        if (!amount) return "Hubungi Kami";
        return `Rp ${parseInt(amount).toLocaleString("id-ID")}`;
    };

    return (
        <>
            <Head title="Cari Kost - Manajemen Kost" />

            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg">
                                    🏠
                                </div>
                                <span className="font-bold text-gray-800 text-lg">
                                    Manajemen Kost
                                </span>
                            </Link>
                            <div className="flex gap-3">
                                <a
                                    href={route("login")}
                                    className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition"
                                >
                                    Login
                                </a>
                                <a
                                    href={route("register")}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition shadow-sm"
                                >
                                    Daftar
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-8">
                            <h2 className="text-5xl font-bold mb-4">
                                Temukan Kost Impianmu
                            </h2>
                            <p className="text-xl text-blue-100">
                                {kosts.length} kost tersedia untuk kamu pilih
                            </p>
                        </div>

                        {/* Search Bar - Modern Design */}
                        <form
                            onSubmit={handleSearch}
                            className="max-w-2xl mx-auto"
                        >
                            <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center gap-2">
                                <div className="flex items-center gap-3 px-6 flex-1">
                                    <svg
                                        className="w-5 h-5 text-gray-400 flex-shrink-0"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search..."
                                        className="flex-1 py-3 text-gray-700 focus:outline-none text-base"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition rounded-full hover:bg-gray-100"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                                    </svg>
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-full transition shadow-sm"
                                >
                                    Cari
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 mb-2">
                                    {kosts.length}
                                </div>
                                <div className="text-gray-600">
                                    Kost Tersedia
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 mb-2">
                                    {kosts.reduce(
                                        (acc, k) =>
                                            acc + k.available_rooms_count,
                                        0,
                                    )}
                                </div>
                                <div className="text-gray-600">
                                    Kamar Kosong
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 mb-2">
                                    100%
                                </div>
                                <div className="text-gray-600">
                                    Terverifikasi
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-600 mb-2">
                                    24/7
                                </div>
                                <div className="text-gray-600">Support</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Kost Cards */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            Kost Tersedia
                        </h3>
                        <p className="text-gray-600">
                            Pilihan kost terbaik untuk kamu
                        </p>
                    </div>

                    {kosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {kosts.map((kost) => (
                                <Link
                                    key={kost.id}
                                    href={route("public.show", kost.id)}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-blue-200 transition group"
                                >
                                    {/* Card Header dengan Foto */}
                                    <div className="relative h-48 overflow-hidden bg-gray-100">
                                        {kost.photo ? (
                                            <img
                                                src={kost.photo}
                                                alt={kost.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src =
                                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23e2e8f0" width="400" height="300"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3E🏠 Kost%3C/text%3E%3C/svg%3E';
                                                }}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                                                <div className="text-6xl opacity-40">
                                                    🏠
                                                </div>
                                            </div>
                                        )}

                                        {/* Overlay gradient untuk readability */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                                        {/* Badge Kamar Tersedia */}
                                        {kost.available_rooms_count > 0 && (
                                            <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                                                {kost.available_rooms_count}{" "}
                                                Kamar
                                            </div>
                                        )}

                                        {/* Badge Lokasi */}
                                        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                                            📍 Kost
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* Title */}
                                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition">
                                            {kost.name}
                                        </h3>

                                        {/* Address */}
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex items-start gap-1">
                                            <svg
                                                className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400"
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

                                        {/* Owner Info */}
                                        <div className="space-y-1.5 mb-4 pb-4 border-b border-gray-100">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-gray-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                    />
                                                </svg>
                                                <span className="truncate">
                                                    {kost.owner_name}
                                                </span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <svg
                                                    className="w-4 h-4 mr-2 text-gray-400"
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
                                                <span>{kost.owner_phone}</span>
                                            </div>
                                        </div>

                                        {/* Price Section */}
                                        <div className="mb-4">
                                            <p className="text-xs text-gray-500 mb-1">
                                                Mulai dari
                                            </p>
                                            <p className="text-xl font-bold text-blue-600">
                                                {kost.min_price ? (
                                                    <>
                                                        Rp{" "}
                                                        {parseInt(
                                                            kost.min_price,
                                                        ).toLocaleString(
                                                            "id-ID",
                                                        )}
                                                        <span className="text-sm text-gray-500 font-normal">
                                                            /bulan
                                                        </span>
                                                    </>
                                                ) : (
                                                    <span className="text-lg text-gray-600">
                                                        Hubungi Kami
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        {/* Button */}
                                        <div className="bg-blue-50 text-blue-700 text-center py-2.5 rounded-lg font-semibold group-hover:bg-blue-600 group-hover:text-white transition">
                                            Lihat Detail →
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                            <div className="text-6xl mb-4">🏠</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                Belum Ada Kost Tersedia
                            </h3>
                            <p className="text-gray-600">
                                Maaf, saat ini belum ada kost yang tersedia.
                            </p>
                        </div>
                    )}
                </div>

                {/* Why Choose Us Section */}
                <div className="bg-white border-t border-gray-200 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Kenapa Pilih Kami?
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Kami memberikan pengalaman terbaik untuk mencari
                                kost
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                    ✓
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    Terverifikasi
                                </h4>
                                <p className="text-gray-600">
                                    Semua kost telah diverifikasi dan dipastikan
                                    kualitasnya
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                    💰
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    Harga Transparan
                                </h4>
                                <p className="text-gray-600">
                                    Tidak ada biaya tersembunyi, harga yang
                                    tertera adalah harga final
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                                    🤝
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    Support 24/7
                                </h4>
                                <p className="text-gray-600">
                                    Tim kami siap membantu kamu kapan saja
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How It Works Section */}
                <div className="bg-gray-50 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-12">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                Cara Kerja
                            </h3>
                            <p className="text-gray-600 text-lg">
                                Tiga langkah mudah untuk menemukan kost impianmu
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                                <div className="text-5xl font-bold text-blue-500 mb-4">
                                    01
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    Cari Kost
                                </h4>
                                <p className="text-gray-600">
                                    Gunakan fitur pencarian untuk menemukan kost
                                    sesuai kebutuhanmu
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                                <div className="text-5xl font-bold text-blue-500 mb-4">
                                    02
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    Hubungi Pemilik
                                </h4>
                                <p className="text-gray-600">
                                    Langsung hubungi pemilik kost melalui
                                    WhatsApp atau telepon
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
                                <div className="text-5xl font-bold text-blue-500 mb-4">
                                    03
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-2">
                                    Sewa Kost
                                </h4>
                                <p className="text-gray-600">
                                    Lakukan survei dan sewa kost impianmu dengan
                                    mudah
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h3 className="text-3xl font-bold mb-4">
                            Punya Kost dan Ingin Menyewakan?
                        </h3>
                        <p className="text-xl text-blue-100 mb-8">
                            Daftarkan kost kamu sekarang dan jangkau lebih
                            banyak calon penyewa
                        </p>
                        <a
                            href={route("register")}
                            className="inline-block bg-white text-blue-600 font-bold py-4 px-10 rounded-lg hover:bg-blue-50 transition shadow-lg"
                        >
                            Daftar Sekarang →
                        </a>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t border-gray-200 py-12">
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

                        <div className="border-t border-gray-200 mt-10 pt-8 text-center">
                            <p className="text-gray-500 text-sm">
                                © 2026 Manajemen Kost. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
