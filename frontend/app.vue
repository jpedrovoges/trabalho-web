<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
    import type { Music, Station } from './types'

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

    const baseApi = useRuntimeConfig().public.baseApiUrl

    const [{ data: musics }, { data: stations }] = await Promise.all([
        useFetch<Music[]>(baseApi + '/music'),
        useFetch<Station[]>(baseApi + '/station/all'),
    ])

    provide('musics', musics)
    provide('stations', stations)
</script>

<style>
    html {
        @apply scroll-smooth;
    }

    body {
        @apply text-gray-50 bg-gray-950;
    }
</style>
