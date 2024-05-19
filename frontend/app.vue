<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
    useHead({
        title: 'Home - SiN.music',
        link() {
            return [
                {
                    href: 'https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
                    rel: 'stylesheet',
                },
            ]
        },
    })
</script>

<style>
    html {
        @apply scroll-smooth;
    }

    body {
        @apply text-white;
    }
</style>
