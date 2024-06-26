<template>
    <div>
        <audio ref="audio" autoplay>
            <source src="http://localhost:3333/music" type="audio/mp3">
        </audio>

        <button class="flex flex-col gap-8 items-center" @click="play">
            <i class="bx bx-play-circle text-32 select-none" />
            Press to start listening
        </button>
    </div>
</template>

<script setup lang="ts">
    const audio = ref<HTMLAudioElement | null>(null)

    function play() {
        audio.value?.play()
    }
</script>
