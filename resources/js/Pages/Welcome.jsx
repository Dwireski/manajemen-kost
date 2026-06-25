import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Selamat Datang" />
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <nav className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center gap-2">
                                <div className="text-2xl"></div>
                                <h1 className="text-gray-800 text-xl font-bold">
                                    Manajemen Kost
                                </h1>
                            </div>
                            <div className="flex gap-3">
                                {auth?.user ? (
                                    <>
                                        <Link
                                            href={route("dashboard")}
                                            className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition"
                                        >
                                            Dashboard
                                        </Link>
                                        <Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                            className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition"
                                        >
                                            Logout
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition shadow-sm"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <div className="inline-block mb-6 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
                            ✨ Solusi Terbaik untuk Manajemen Kost Anda
                        </div>
                        <h2 className="text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
                            Sistem Manajemen
                            <br />
                            <span className="text-blue-500">Kost Modern</span>
                        </h2>
                        <p className="text-xl mb-10 text-gray-600 max-w-2xl mx-auto">
                            Kelola kost, kamar, penyewa, dan pembayaran dengan
                            mudah dan efisien dalam satu platform
                        </p>

                        <div className="flex justify-center gap-4 mt-12">
                            {auth?.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="bg-blue-500 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition shadow-lg"
                                >
                                    Buka Dashboard →
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("register")}
                                        className="bg-blue-500 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-blue-600 transition shadow-lg"
                                    >
                                        Mulai Gratis
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="border-2 border-gray-300 text-gray-700 px-10 py-4 rounded-lg font-bold text-lg hover:border-gray-400 hover:text-gray-900 transition"
                                    >
                                        Login
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-5xl mx-auto">
                            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                                <div className="text-5xl mb-4">🏠</div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                    Kelola Kost
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Kelola data kost dan kamar dengan mudah dan
                                    terorganisir
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                                <div className="text-5xl mb-4">👥</div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                    Data Penyewa
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Pantau penyewa dan masa tinggal dengan
                                    praktis
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                                <div className="text-5xl mb-4">💰</div>
                                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                                    Pembayaran
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Catat dan laporkan pembayaran secara
                                    otomatis
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-500 mb-2">
                                    100%
                                </div>
                                <div className="text-gray-600">Digital</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-500 mb-2">
                                    24/7
                                </div>
                                <div className="text-gray-600">Akses</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-500 mb-2">
                                    Gratis
                                </div>
                                <div className="text-gray-600">Selamanya</div>
                            </div>
                        </div>

                        <div className="mt-20 text-sm text-gray-400">
                            <p>
                                Built with Laravel {laravelVersion} + React +
                                Inertia.js | PHP {phpVersion}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
