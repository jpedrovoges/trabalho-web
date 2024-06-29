<template>
    <div
        class="fixed bottom-0 w-full h-80 grid grid-cols-[1fr_auto_1fr] items-center
        px-32 bg-black/40 backdrop-blur-md"
    >
        <div>
            <i
                :key="audioRef?.paused ? 'paused' : 'playing'"
                class="bx text-32 select-none"
                :class="audioRef?.paused ? 'bx-album' : 'bxs-album animate-spin'"
            />
        </div>

        <div class="flex justify-center">
            <button @click="toggleAudio">
                <i
                    :key="loadingAudio ? 'loading' : 'pause'"
                    class="bx text-48 select-none"
                    :class="{
                        'bx-play': audioRef?.paused && !loadingAudio,
                        'bx-pause': !audioRef?.paused && !loadingAudio,
                        'bx-loader-alt animate-spin': loadingAudio && !audioRef?.paused,
                    }"
                />
            </button>
        </div>

        <div class="w-fit ml-auto">
            <i class="bx bx-volume-low text-20 select-none" />
            <input type="range" min="0" max="100" @input="setVolume">
        </div>

        <audio ref="audioRef" autoplay>
            <source src="http://localhost:3333/music" type="audio/mp3">
        </audio>
    </div>
</template>

<script setup lang="ts">
    const loadingAudio = ref(false)
    const audioRef = ref<HTMLAudioElement | null>(null)

    async function toggleAudio() {
        if (!audioRef.value)
            return

        if (!audioRef.value.paused)
            // TODO stop loading audio from server on pause
            return audioRef.value.pause()

        loadingAudio.value = true

        await audioRef.value.play()

        loadingAudio.value = false
    }

    function setVolume(e: Event) {
        if (!audioRef.value)
            return

        // Divide by 100 since audio volume range is between 0 and 1
        audioRef.value.volume = (e.target as HTMLInputElement).valueAsNumber / 100
    }

    onMounted(() => {
        if (audioRef.value)
            // Set initial audio volume to half
            audioRef.value.volume = 0.5
    })
</script>
