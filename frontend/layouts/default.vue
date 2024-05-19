<template>
    <div>
        <header
            class="fixed top-0 left-0 w-full flex items-center justify-between py-20 px-[10%]"
        >
            <NuxtLink to="/" class="text-24 font-600">
                SiN.music
            </NuxtLink>

            <nav class="navbar">
                <NuxtLink to="/login" class="text-18 font-500">
                    Login
                </NuxtLink>
            </nav>
        </header>

        <slot />
    </div>
</template>
