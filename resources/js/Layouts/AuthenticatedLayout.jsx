import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";

export default function Authenticated({ header, children }) {
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
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    // Helper untuk cek active menu
    const isActive = (pattern) => {
        return route().current(pattern);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation Bar - Storeify Style */}
            <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
                                <span className="font-bold text-gray-800 text-lg hidden sm:block">
                                    Manajemen Kost
                                </span>
                            </Link>
                        </div>

                        {/* Menu Items - Tengah */}
                        <div className="hidden md:flex items-center space-x-1">
                            <Link
                                href={route("dashboard")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    isActive("dashboard")
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                Dashboard
                            </Link>
                            <Link
                                href={route("kosts.index")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    isActive("kosts.*")
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                Kost
                            </Link>
                            <Link
                                href={route("rooms.index")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    isActive("rooms.*")
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                Kamar
                            </Link>
                            <Link
                                href={route("tenants.index")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    isActive("tenants.*")
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                Penyewa
                            </Link>
                            <Link
                                href={route("payments.index")}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                                    isActive("payments.*")
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                }`}
                            >
                                Pembayaran
                            </Link>
                        </div>

                        {/* User Menu - Kanan */}
                        <div className="hidden md:flex items-center gap-3">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                            {auth.user.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-gray-700">
                                            {auth.user.name}
                                        </span>
                                        <svg
                                            className="w-4 h-4 text-gray-400"
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
                                    <Dropdown.Link href={route("profile.edit")}>
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
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
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
                        " md:hidden bg-white border-t border-gray-200"
                    }
                >
                    <div className="pt-2 pb-3 space-y-1 px-4">
                        <Link
                            href={route("dashboard")}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActive("dashboard")
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            Dashboard
                        </Link>
                        <Link
                            href={route("kosts.index")}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActive("kosts.*")
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            Kost
                        </Link>
                        <Link
                            href={route("rooms.index")}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActive("rooms.*")
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            Kamar
                        </Link>
                        <Link
                            href={route("tenants.index")}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActive("tenants.*")
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            Penyewa
                        </Link>
                        <Link
                            href={route("payments.index")}
                            className={`block px-3 py-2 rounded-md text-base font-medium ${
                                isActive("payments.*")
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            Pembayaran
                        </Link>
                    </div>

                    {/* Mobile User Menu */}
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {auth.user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <div className="font-medium text-base text-gray-800">
                                        {auth.user.name}
                                    </div>
                                    <div className="font-medium text-sm text-gray-500">
                                        {auth.user.email}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 px-4">
                            <Link
                                href={route("profile.edit")}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Profile
                            </Link>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50"
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Flash Messages */}
            {flashMessage && (
                <div className="fixed top-20 right-4 z-50 max-w-sm">
                    <div
                        className={`px-4 py-3 rounded shadow-lg border ${
                            flashType === "success"
                                ? "bg-green-100 border-green-400 text-green-700"
                                : "bg-red-100 border-red-400 text-red-700"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="block">{flashMessage}</span>
                            <button
                                onClick={() => setFlashMessage(null)}
                                className="ml-4 text-xl font-bold"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Page Header */}
            {header && (
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}
