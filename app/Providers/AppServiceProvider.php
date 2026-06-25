<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL; // Memuat facade URL untuk mengatur skema protokol

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        /**
         * Memaksa Laravel agar selalu menggunakan skema HTTPS pada semua URL, 
         * Aset (Vite/Inertia), dan Route Form/Axios jika berada di environment production.
         */
        if (config('app.env') === 'production' || env('FORCE_HTTPS') === true) {
            URL::forceScheme('https');
        }
    }
}