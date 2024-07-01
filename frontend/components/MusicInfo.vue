<template>
    <div
        class="flex items-center gap-24 py-12 px-24
        bg-gray-900 border border-gray-800 rounded-8 hover:bg-gray-800"
    >
        <img
            :src="music.image"
            class="size-64 rounded-8"
            :class="{
                'size-64': size === 'default',
                'size-32': size === 'small',
            }"
        >

        <div>
            <p class="text-18 font-500">
                {{ music.name }}
            </p>
            <span class="text-14 text-gray-400">{{ music.artist }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Music } from '~/types'

    withDefaults(
        defineProps<{
            music: Music
            size?: 'small' | 'default'
        }>(),
        {
            size: 'default',
        },
    )
</script>
