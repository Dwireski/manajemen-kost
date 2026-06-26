import { Head, Link, useForm } from "@inertiajs/react";

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    return (
        <>
            <Head title="Register" />

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

                {/* Register Form */}
                <div className="flex-1 flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-md">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                            {/* Icon Kost */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-full mb-4">
                                    <span className="text-4xl">🏠</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Daftar Akun Baru
                                </h2>
                                <p className="text-gray-600 mt-2">
                                    Buat akun Manajemen Kost Anda
                                </p>
                            </div>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Nama Lengkap
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                        autoFocus
                                        autoComplete="name"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="John Doe"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

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
                                        autoComplete="new-password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium text-gray-700 mb-2"
                                    >
                                        Konfirmasi Password
                                    </label>
                                    <input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value,
                                            )
                                        }
                                        required
                                        autoComplete="new-password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        placeholder="••••••••"
                                    />
                                    {errors.password_confirmation && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.password_confirmation}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                >
                                    {processing ? "Memproses..." : "Daftar"}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600 text-sm">
                                    Sudah punya akun?{" "}
                                    <Link
                                        href={route("login")}
                                        className="text-blue-500 hover:text-blue-600 font-semibold"
                                    >
                                        Masuk di sini
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
