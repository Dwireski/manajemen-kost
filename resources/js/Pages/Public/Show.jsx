import React, { useState, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
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

function PublicShow({ kost }) {
    // ✅ State untuk carousel
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    // ✅ State untuk swipe tracking
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);

    // ✅ Gabungkan foto utama + galeri
    const allPhotos = React.useMemo(() => {
        const photos = [];
        if (kost.photo) {
            photos.push({ url: kost.photo, isCover: true });
        }
        if (kost.photos && kost.photos.length > 0) {
            kost.photos.forEach((photo) => {
                photos.push({
                    url: photo.file_path || photo.url,
                    isCover: false,
                });
            });
        }
        return photos;
    }, [kost]);

    const formatCurrency = (amount) => {
        if (!amount) return "Hubungi Kami";
        return `Rp ${parseInt(amount).toLocaleString("id-ID")}`;
    };

    // ✅ Helper: handle URL foto (eksternal vs lokal)
    const getPhotoUrl = (photoPath) => {
        if (!photoPath) return null;
        if (
            photoPath.startsWith("http://") ||
            photoPath.startsWith("https://")
        ) {
            return photoPath;
        }

        let cleanPath = photoPath;
        if (cleanPath.startsWith("kosts/")) {
            cleanPath = cleanPath.substring(6);
        }

        cleanPath = cleanPath.replace(/^\/+/, "");
        return `/${cleanPath}`;
    };

    // ✅ Navigasi carousel
    const nextPhoto = () => {
        if (allPhotos.length > 0) {
            setCurrentPhotoIndex((prev) => (prev + 1) % allPhotos.length);
        }
    };

    const prevPhoto = () => {
        if (allPhotos.length > 0) {
            setCurrentPhotoIndex(
                (prev) => (prev - 1 + allPhotos.length) % allPhotos.length,
            );
        }
    };

    const goToPhoto = (index) => {
        setCurrentPhotoIndex(index);
    };

    // ✅ SWIPE HANDLERS - Touch Events (Mobile)
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        touchEndX.current = e.touches[0].clientX;
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        touchEndX.current = e.touches[0].clientX;
        const offset = touchEndX.current - touchStartX.current;
        setDragOffset(offset);
    };

    const handleTouchEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const swipeDistance = touchEndX.current - touchStartX.current;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                prevPhoto();
            } else {
                nextPhoto();
            }
        }

        setDragOffset(0);
    };

    // ✅ SWIPE HANDLERS - Mouse Events (Desktop Drag)
    const handleMouseDown = (e) => {
        touchStartX.current = e.clientX;
        touchEndX.current = e.clientX;
        setIsDragging(true);
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        touchEndX.current = e.clientX;
        const offset = touchEndX.current - touchStartX.current;
        setDragOffset(offset);
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);

        const swipeDistance = touchEndX.current - touchStartX.current;
        const minSwipeDistance = 50;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                prevPhoto();
            } else {
                nextPhoto();
            }
        }

        setDragOffset(0);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            handleMouseUp();
        }
    };

    return (
        <ThemeProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg">
                                    🏠
                                </div>
                                <span className="font-bold text-gray-800 dark:text-gray-100 text-base sm:text-lg">
                                    Manajemen Kost
                                </span>
                            </Link>
                            <div className="flex items-center gap-2 sm:gap-3">
                                <ThemeToggle />
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex items-center gap-1 sm:gap-2 text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 font-medium transition text-sm sm:text-base cursor-pointer"
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
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* ========================================= */}
                {/* ✅ CAROUSEL FOTO GALERI + SWIPE SUPPORT */}
                {/* ========================================= */}
                {allPhotos.length > 0 ? (
                    <div className="relative">
                        {/* Main Carousel - DENGAN SWIPE */}
                        <div
                            className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] overflow-hidden bg-gray-900 select-none cursor-grab active:cursor-grabbing"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseLeave}
                        >
                            {allPhotos.map((photo, index) => (
                                <div
                                    key={index}
                                    className={`absolute inset-0 transition-opacity duration-500 ${
                                        index === currentPhotoIndex
                                            ? "opacity-100"
                                            : "opacity-0"
                                    }`}
                                    style={{
                                        transform:
                                            index === currentPhotoIndex &&
                                            isDragging
                                                ? `translateX(${dragOffset}px)`
                                                : "translateX(0)",
                                        transition: isDragging
                                            ? "none"
                                            : "opacity 500ms, transform 300ms",
                                    }}
                                >
                                    <img
                                        src={getPhotoUrl(photo.url)}
                                        alt={`${kost.name} - Foto ${index + 1}`}
                                        className="w-full h-full object-cover pointer-events-none"
                                        draggable={false}
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                        }}
                                    />
                                </div>
                            ))}

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>

                            {/* Navigation Buttons */}
                            {allPhotos.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            prevPhoto();
                                        }}
                                        className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
                                        aria-label="Previous photo"
                                    >
                                        <svg
                                            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 19l-7-7 7-7"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            nextPhoto();
                                        }}
                                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-10"
                                        aria-label="Next photo"
                                    >
                                        <svg
                                            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </>
                            )}

                            {/* Photo Counter */}
                            {allPhotos.length > 1 && (
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold">
                                    {currentPhotoIndex + 1} / {allPhotos.length}
                                </div>
                            )}

                            {/* Swipe Hint (hanya muncul di mobile) */}
                            {allPhotos.length > 1 && (
                                <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] sm:hidden pointer-events-none animate-pulse">
                                    ← Geser untuk ganti foto →
                                </div>
                            )}

                            {/* Badge */}
                            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto pointer-events-none">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                                    <span className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium text-white">
                                        Kost Putra
                                    </span>
                                    {kost.available_rooms.length > 0 && (
                                        <span className="bg-green-500 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium text-white">
                                            Tersedia
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
                                    {kost.name}
                                </h1>
                                <p className="text-sm sm:text-base text-white/90 flex items-center gap-2 drop-shadow">
                                    <svg
                                        className="w-4 h-4 flex-shrink-0"
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
                                    <span className="line-clamp-1 sm:line-clamp-2">
                                        {kost.address}
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Thumbnail Gallery - ✅ DARK MODE */}
                        {allPhotos.length > 1 && (
                            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 sm:p-4">
                                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                    {allPhotos.map((photo, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToPhoto(index)}
                                            className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                                                index === currentPhotoIndex
                                                    ? "border-blue-500 dark:border-blue-400 ring-2 ring-blue-200 dark:ring-blue-900"
                                                    : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                                            }`}
                                        >
                                            <img
                                                src={getPhotoUrl(photo.url)}
                                                alt={`Thumbnail ${index + 1}`}
                                                className="w-full h-full object-cover"
                                                draggable={false}
                                                onError={(e) => {
                                                    e.target.style.display =
                                                        "none";
                                                }}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    /* Fallback jika tidak ada foto */
                    <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-r from-blue-500 to-blue-600">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 text-white">
                            <div className="max-w-7xl mx-auto">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
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
                )}

                {/* Main Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 space-y-4 sm:space-y-6">
                    {/* Informasi Kost - ✅ DARK MODE */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
                            Informasi Kost
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                                    🏠
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        Nama Kost
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                                        {kost.name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                                    📍
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        Alamat
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                                        {kost.address}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                                    👤
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        Pemilik
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                                        {kost.owner_name}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                                    📱
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        Kontak
                                    </p>
                                    <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base">
                                        {kost.owner_phone}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Kamar Tersedia - ✅ DARK MODE */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
                            Kamar Tersedia
                        </h2>

                        {kost.available_rooms.length > 0 ? (
                            <div className="space-y-3 sm:space-y-4">
                                {kost.available_rooms.map((room) => (
                                    <div
                                        key={room.id}
                                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 sm:p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md dark:hover:shadow-gray-900/50 transition"
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 text-lg sm:text-xl flex-shrink-0">
                                                        🚪
                                                    </div>
                                                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                                                        Kamar {room.room_number}
                                                    </h3>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                                                        ✓ Tersedia
                                                    </span>
                                                    <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                                                        AC
                                                    </span>
                                                    <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
                                                        WiFi
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="text-left sm:text-right">
                                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">
                                                    Harga per bulan
                                                </p>
                                                <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                                                    {formatCurrency(room.price)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 sm:py-12 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-3xl sm:text-4xl mb-3">
                                    😔
                                </div>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium">
                                    Semua kamar sedang terisi
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-1 px-2">
                                    Hubungi pemilik untuk info ketersediaan
                                    berikutnya
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Fasilitas - ✅ DARK MODE */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
                            Fasilitas
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                            {[
                                "WiFi",
                                "AC",
                                "Kasur",
                                "K. Mandi Dalam",
                                "Akses 24 Jam",
                                "Parkir",
                            ].map((facility) => (
                                <div
                                    key={facility}
                                    className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700"
                                >
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 dark:text-green-400 flex-shrink-0"
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
                                    <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">
                                        {facility}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hubungi Pemilik - ✅ DARK MODE */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-700 p-4 sm:p-6 md:p-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">
                            Hubungi Pemilik
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                            <div className="space-y-3 sm:space-y-4">
                                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 text-xl sm:text-2xl flex-shrink-0">
                                        👤
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Pemilik Kost
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-base sm:text-lg truncate">
                                            {kost.owner_name}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-700">
                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 text-xl sm:text-2xl flex-shrink-0">
                                        📱
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Telepon / WhatsApp
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-base sm:text-lg truncate">
                                            {kost.owner_phone}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                    Respon cepat • Verifikasi pemilik • Aman
                                </p>
                            </div>

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

                {/* Footer - ✅ DARK MODE */}
                <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 sm:py-10 md:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-9 h-9 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg">
                                        🏠
                                    </div>
                                    <span className="font-bold text-gray-800 dark:text-gray-100 text-lg">
                                        Manajemen Kost
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Platform pencarian kost terpercaya dengan
                                    kost terverifikasi dan harga transparan.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    Navigasi
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="/"
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition"
                                        >
                                            Beranda
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={route("login")}
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition"
                                        >
                                            Login
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={route("register")}
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition"
                                        >
                                            Daftar
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    Informasi
                                </h4>
                                <ul className="space-y-3">
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition"
                                        >
                                            Tentang Kami
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition"
                                        >
                                            Syarat & Ketentuan
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="#"
                                            className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-sm transition"
                                        >
                                            Kebijakan Privasi
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
                                    Kontak
                                </h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <span>📧</span>
                                        <span>cs@manajemenkost.com</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <span>📱</span>
                                        <span>+62 812-3456-7890</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                                        <span>📍</span>
                                        <span>Malang, Jawa Timur</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 sm:mt-10 pt-6 sm:pt-8 text-center">
                            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                                © 2026 Manajemen Kost. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </ThemeProvider>
    );
}

export default PublicShow;
