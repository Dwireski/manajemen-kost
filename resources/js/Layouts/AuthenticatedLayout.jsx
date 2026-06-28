import { useState, useEffect } from "react";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { ThemeProvider, useTheme } from "@/Context/ThemeContext";

// Component untuk Toggle Button
function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            aria-label="Toggle theme"
        >
            {theme === "light" ? (
                // Moon Icon (Dark Mode)
                <svg
                    className="w-5 h-5 text-gray-600 dark:text-gray-300"
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
                // Sun Icon (Light Mode)
                <svg
                    className="w-5 h-5 text-yellow-500"
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

function AuthenticatedLayout({ header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);
    const [flashMessage, setFlashMessage] = useState(null);
    const [flashType, setFlashType] = useState("success");

    const page = usePage();
    const auth = page.props?.auth;
    const flash = page.props?.flash;

    useEffect(() => {
        if (flash?.success) {
            setFlashMessage(flash.success);
            setFlashType("success");
            const timer = setTimeout(() => setFlashMessage(null), 4000);
            return () => clearTimeout(timer);
        } else if (flash?.error) {
            setFlashMessage(flash.error);
            setFlashType("error");
            const timer = setTimeout(() => setFlashMessage(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!auth || !auth.user) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                        Loading...
                    </p>
                </div>
            </div>
        );
    }

    // Helper untuk cek active menu
    const isActive = (pattern) => {
        return route().current(pattern);
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Top Navigation Bar - Storeify Style */}
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo - Kiri */}
                            <div className="flex-shrink-0">
                                <Link
                                    href={route("dashboard")}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg">
                                        🏠
                                    </div>
                                    <span className="font-bold text-gray-800 dark:text-gray-100 text-base sm:text-lg hidden sm:block">
                                        Manajemen Kost
                                    </span>
                                </Link>
                            </div>

                            {/* Menu Items - Tengah */}
                            <div className="hidden md:flex items-center space-x-1">
                                <Link
                                    href={route("dashboard")}
                                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive("dashboard")
                                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    href={route("kosts.index")}
                                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive("kosts.*")
                                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    Kost
                                </Link>
                                <Link
                                    href={route("rooms.index")}
                                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive("rooms.*")
                                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    Kamar
                                </Link>
                                <Link
                                    href={route("tenants.index")}
                                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive("tenants.*")
                                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    Penyewa
                                </Link>
                                <Link
                                    href={route("payments.index")}
                                    className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition ${
                                        isActive("payments.*")
                                            ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                                    }`}
                                >
                                    Pembayaran
                                </Link>
                            </div>

                            {/* User Menu & Theme Toggle - Kanan */}
                            <div className="hidden md:flex items-center gap-3">
                                {/* Theme Toggle Button */}
                                <ThemeToggle />

                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                                                {auth.user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden lg:inline">
                                                {auth.user.name}
                                            </span>
                                            <svg
                                                className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route("profile.edit")}
                                        >
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route("logout")}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>

                            {/* Mobile Menu Button */}
                            <div className="md:hidden flex items-center gap-2">
                                {/* Theme Toggle Mobile */}
                                <ThemeToggle />

                                <button
                                    onClick={() =>
                                        setShowingNavigationDropdown(
                                            (previousState) => !previousState,
                                        )
                                    }
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                                >
                                    <svg
                                        className="h-6 w-6"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            className={
                                                !showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                        <path
                                            className={
                                                showingNavigationDropdown
                                                    ? "inline-flex"
                                                    : "hidden"
                                            }
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    <div
                        className={
                            (showingNavigationDropdown ? "block" : "hidden") +
                            " md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 max-h-[calc(100vh-4rem)] overflow-y-auto"
                        }
                    >
                        <div className="pt-2 pb-3 space-y-1 px-4">
                            <Link
                                href={route("dashboard")}
                                className={`block px-3 py-2.5 rounded-md text-sm sm:text-base font-medium ${
                                    isActive("dashboard")
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route("kosts.index")}
                                className={`block px-3 py-2.5 rounded-md text-sm sm:text-base font-medium ${
                                    isActive("kosts.*")
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                }`}
                            >
                                Kost
                            </Link>
                            <Link
                                href={route("rooms.index")}
                                className={`block px-3 py-2.5 rounded-md text-sm sm:text-base font-medium ${
                                    isActive("rooms.*")
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                }`}
                            >
                                Kamar
                            </Link>
                            <Link
                                href={route("tenants.index")}
                                className={`block px-3 py-2.5 rounded-md text-sm sm:text-base font-medium ${
                                    isActive("tenants.*")
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                }`}
                            >
                                Penyewa
                            </Link>
                            <Link
                                href={route("payments.index")}
                                className={`block px-3 py-2.5 rounded-md text-sm sm:text-base font-medium ${
                                    isActive("payments.*")
                                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                }`}
                            >
                                Pembayaran
                            </Link>
                        </div>

                        {/* Mobile User Menu */}
                        <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                            <div className="px-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200 truncate">
                                            {auth.user.name}
                                        </div>
                                        <div className="font-medium text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {auth.user.email}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1 px-4">
                                <Link
                                    href={route("profile.edit")}
                                    className="block px-3 py-2.5 rounded-md text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    Profile
                                </Link>
                                <Link
                                    href={route("logout")}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-3 py-2.5 rounded-md text-sm sm:text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Flash Messages */}
                {flashMessage && (
                    <div className="fixed top-20 right-2 sm:right-4 left-2 sm:left-auto z-50 max-w-sm">
                        <div
                            className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg shadow-lg border text-sm sm:text-base ${
                                flashType === "success"
                                    ? "bg-green-100 dark:bg-green-900/30 border-green-400 dark:border-green-600 text-green-700 dark:text-green-400"
                                    : "bg-red-100 dark:bg-red-900/30 border-red-400 dark:border-red-600 text-red-700 dark:text-red-400"
                            }`}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <span className="block">{flashMessage}</span>
                                <button
                                    onClick={() => setFlashMessage(null)}
                                    className="text-lg sm:text-xl font-bold flex-shrink-0"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Page Header */}
                {header && (
                    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                        <div className="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                {/* Main Content */}
                <main>{children}</main>
            </div>
        </ThemeProvider>
    );
}

export default AuthenticatedLayout;
