<template>
    <div class="max-w-[620px] mx-auto pt-[10%]">
        <StationInfo v-if="station" :station="station" />
    </div>
</template>

<script setup lang="ts">
    import type { Station } from '~/types'

    const stations = inject<Ref<Station[]>>('stations')
    const { slug } = useRoute().params as unknown as { slug: string }

    console.log(stations?.value)

    const station = stations?.value?.find(station => station.slug === slug)
</script>
