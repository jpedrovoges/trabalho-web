<template>
    <component
        :is="to ? NuxtLink : 'button'"
        :to="to"
        :disabled="loading"
        :class="ButtonColor[color]"
        class="inline-flex items-center justify-center
            max-h-48 px-16 py-8 gap-12 rounded-8 font-600 text-black
            transition-colors shadow-[0_0_10px_rgba(0,0,0,0.2)]
            disabled:pointer-events-none"
    >
        <i v-if="loading" class="text-24 bx bx-loader-alt animate-spin" />
        <slot v-else />
    </component>
</template>

<script setup lang="ts">
    import type { RouteLocationRaw } from 'vue-router'
    import { ButtonColor } from './constants'
    import { NuxtLink } from '#components'

    withDefaults(
        defineProps<{
            color?: keyof typeof ButtonColor
            to?: RouteLocationRaw
            loading?: boolean
        }>(),
        {
            color: 'white',
        },
    )
</script>
