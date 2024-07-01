<template>
    <div class="min-h-screen p-[10%]">
        <div class="flex items-center justify-between">
            <Heading>
                Estações de Rádio
            </Heading>
        </div>

        <ul
            v-if="stations"
            class="grid grid-cols-3 gap-24 mt-48"
        >
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
    import type { Station } from '~/types'

    const stations = inject<Ref<Station[]>>('stations')
</script>
