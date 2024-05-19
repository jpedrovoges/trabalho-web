<template>
    <div>
        <header
            class="fixed top-0 left-0 w-full flex items-center justify-between py-20 px-[10%]"
        >
            <NuxtLink to="/" class="text-24 font-600">
                SiN.music
            </NuxtLink>

            <nav class="navbar">
                <NuxtLink to="/" class="text-18 font-500">
                    Home
                </NuxtLink>
            </nav>
        </header>

        <div class="flex flex-col justify-center items-center h-screen bg-login bg-cover bg-center">
            <div
                class="max-w-[420px] w-full p-32 border-2 border-gray-50 rounded-10 backdrop-blur-[20px] shadow-[0_0_10px_rgba(0,0,0,0.2)]"
            >
                <slot />
            </div>
        </div>
    </div>
</template>
