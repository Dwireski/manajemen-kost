import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-6">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-lg"></div>
                        <div className="text-left">
                            <h1 className="text-2xl font-bold text-white">
                                Manajemen Kost
                            </h1>
                            <p className="text-blue-100 text-sm">
                                Selamat datang kembali
                            </p>
                        </div>
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                    {children}
                </div>

                {/* Footer */}
                <div className="text-center mt-6">
                    <p className="text-blue-100 text-xs sm:text-sm">
                        © 2026 Manajemen Kost. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
