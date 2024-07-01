<template>
    <NuxtLink
        :to="`/stations/${station.slug}`"
        class="flex items-center gap-24 py-24 px-32
        bg-gray-900 border border-gray-800 rounded-8 hover:bg-gray-800"
    >
        <!-- <img src="" alt="station image" class="size-48"> -->
        <i class="bx bx-equalizer text-48" />
        <div>
            <p class="text-18 font-600">
                {{ station.name }}
            </p>
            <span class="text-14 text-gray-400">({{ station.frequency }})</span>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
    import type { Station } from '~/types/station'

    defineProps<{ station: Station }>()
</script>
