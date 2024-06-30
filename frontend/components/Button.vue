<template>
    <component
        :is="to ? NuxtLink : 'button'"
        :to="to"
        :disabled="loading"
        class="inline-flex items-center justify-center
            max-h-48 px-24 py-12 gap-12 bg-gray-50 rounded-32 font-600 text-black
            hover:bg-gray-300 transition-colors shadow-[0_0_10px_rgba(0,0,0,0.2)]
            disabled:pointer-events-none"
    >
        <i v-if="loading" class="text-24 bx bx-loader-alt animate-spin" />
        <slot v-else />
    </component>
</template>

<script setup lang="ts">
    import type { RouteLocationRaw } from 'vue-router'
    import { NuxtLink } from '#components'

    defineProps<{
        to?: RouteLocationRaw
        loading?: boolean
    }>()
</script>
