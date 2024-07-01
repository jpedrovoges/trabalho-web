<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup lang="ts">
    import type { Music, RawStation } from './types'

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
        useFetch<RawStation[]>(baseApi + '/station/all'),
    ])

    provide('musics', musics)
    provide('stations', (stations?.value ?? []).map(station => ({
        ...station,
        music_ids: undefined,
        musicIds: station.music_ids
            ? Array.from(station.music_ids.split(','), v => parseInt(v, 10))
            : [],
    })))
</script>

<style>
    html {
        @apply scroll-smooth;
    }

    body {
        @apply text-gray-50 bg-gray-950;
    }
</style>
