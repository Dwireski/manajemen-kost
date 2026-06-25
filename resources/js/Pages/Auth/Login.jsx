import { useEffect } from "react";
import { Link, Head, useForm } from "@inertiajs/react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };

    return (
        <>
            <Head title="Log in" />

            <div className="min-h-screen bg-gray-50 flex flex-col">
                {/* Header dengan link back */}
                <nav className="bg-white border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="text-2xl">🏠</div>
                                <h1 className="text-gray-800 text-xl font-bold">
                                    Manajemen Kost
                                </h1>
                            </Link>
                            <Link
                                href="/"
                                className="text-gray-600 hover:text-gray-900 transition"
                            >
                                ← Kembali ke Beranda
                            </Link>
                        </div>
                    </div>
                </nav>

                {/* Login Form */}
                <div className="flex-1 flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            {/* Icon Kost */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-4">
                                    <span className="text-4xl">🏠</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Selamat Datang Kembali
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Masuk ke akun Manajemen Kost Anda
                                </p>
                            </div>

                            {status && (
                                <div className="mb-4 font-medium text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg p-3">
                                    {status}
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        required
                                        autoFocus
                                        autoComplete="username"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="nama@email.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        required
                                        autoComplete="current-password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.remember}
                                            onChange={(e) =>
                                                setData(
                                                    "remember",
                                                    e.target.checked,
                                                )
                                            }
                                            className="rounded border-gray-300 text-blue-500 shadow-sm focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Ingat saya
                                        </span>
                                    </label>
                                    {canResetPassword && (
                                        <Link
                                            href={route("password.request")}
                                            className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                                        >
                                            Lupa password?
                                        </Link>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                >
                                    {processing ? "Memproses..." : "Masuk"}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600 text-sm">
                                    Belum punya akun?{" "}
                                    <Link
                                        href={route("register")}
                                        className="text-blue-500 hover:text-blue-600 font-semibold"
                                    >
                                        Daftar sekarang
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-8 text-center text-sm text-gray-400">
                            <p>Manajemen Kost © {new Date().getFullYear()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
