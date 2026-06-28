import { Link } from "@inertiajs/react";
import { ThemeProvider, useTheme } from "@/Context/ThemeContext";

// Component untuk Toggle Button
function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            ) : (
                <svg
                    className="w-5 h-5 text-yellow-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            )}
        </button>
    );
}

function GuestLayoutContent({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="text-center mb-6 relative">
                    <Link href="/" className="inline-flex items-center gap-3">
                        <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center text-3xl shadow-lg">
                            🏠
                        </div>
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
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8">
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

export default function GuestLayout({ children }) {
    return (
        <ThemeProvider>
            <GuestLayoutContent>{children}</GuestLayoutContent>
        </ThemeProvider>
    );
}
