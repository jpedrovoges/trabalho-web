<template>
    <div class="min-h-screen p-[10%]">
        <div class="flex items-center justify-between">
            <Heading>
                Estações de Rádio
            </Heading>
        </div>

        <ul class="grid grid-cols-3 gap-24 mt-48">
            <li
                v-for="station in stations"
                :key="station.name"
                class="border-t-gray-600"
            >
                <Station :station="station" />
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
    import type { Station } from '~/types/station'

    const stations = computed(() => data.value?.length ? data.value : [])

    const { data } = await useFetch<Station[]>(
        useRuntimeConfig().public.baseApiUrl + '/station/all',
    )
</script>
