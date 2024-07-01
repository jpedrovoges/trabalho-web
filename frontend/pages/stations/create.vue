<template>
    <div class="min-h-screen p-[10%]">
        <div class="max-w-[620px] mx-auto">
            <div class="flex items-center justify-between">
                <Heading>
                    Nova estação
                </Heading>
            </div>

            <form class="mt-48" @submit.prevent="submitCreateStation">
                <div class="space-y-24">
                    <div class="grid grid-cols-2 gap-24">
                        <Input
                            v-model="nameRef"
                            label="Nome"
                            placeholder="Uma rádio bacana"
                            required
                        />
                        <Input
                            v-model="frequencyRef"
                            label="Frequência da rádio"
                            placeholder="108.1"
                            required
                        />

                        <!-- TODO use textarea -->
                        <Input
                            v-model="descriptionRef"
                            label="Descrição"
                            placeholder="A rádio feita pra quem gosta de uma boa música!"
                            class="col-span-2"
                            required
                        />
                    </div>
                </div>

                <div class="mt-48">
                    <div class="flex items-center justify-between">
                        <p class="text-18 font-600">
                            Monte sua playlist
                        </p>

                        <div class="relative group">
                            <Input placeholder="Pesquisar musicas" @click="displayMusics = !displayMusics" />

                            <ul
                                v-show="displayMusics"
                                class="absolute z-10 top-full h-208 w-full mt-16 space-y-4 overflow-y-scroll"
                            >
                                <li v-for="music of allMusics" :key="music.name">
                                    <MusicInfo
                                        :music="music"
                                        image-size="small"
                                        removable
                                        @click="addMusicToPlaylist(music)"
                                    />
                                </li>
                            </ul>
                        </div>
                    </div>

                    <ul class="mt-16 space-y-16">
                        <li
                            v-for="(music, index) in playlist"
                            :key="music.name"
                            class="flex items-center gap-24 py-12 px-24
                            bg-gray-900 border border-gray-800 rounded-8 hover:bg-gray-800"
                        >
                            <span class="text-14 text-gray-400">{{ index + 1 }}</span>

                            <img :src="music.image" class="size-64 rounded-8">

                            <div>
                                <p class="text-18 font-500">
                                    {{ music.name }}
                                </p>
                                <span class="text-14 text-gray-400">{{ music.artist }}</span>
                            </div>

                            <Button
                                type="button"
                                color="outline-red"
                                class="ml-auto"
                                @click="removeMusic(music.id)"
                            >
                                <i class="bx bxs-trash-alt" />
                            </Button>
                        </li>
                    </ul>

                    <div class="grid grid-cols-2 gap-24">
                        <Button to="/stations" color="outline-red" class="mt-24">
                            Cancelar
                        </Button>

                        <Button
                            type="submit"
                            color="purple"
                            class="mt-24"
                            :loading="pendingRequest"
                        >
                            Criar nova rádio
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { fetchAuthenticated } from '~/helpers/fetch-authenticated'
    import type { Music } from '~/types'

    const allMusics = inject<Ref<Music[]>>('musics')
    const updateStations = inject<{ updateStations: Function }>('stations')?.updateStations

    const nameRef = ref('')
    const descriptionRef = ref('')
    const frequencyRef = ref('')

    const playlist = ref<Music[]>([])
    const pendingRequest = ref(false)
    const displayMusics = ref(false)

    function addMusicToPlaylist(music: Music) {
        playlist.value.push(music)

        displayMusics.value = false
    }

    function removeMusic(musicId: number) {
        playlist.value = playlist.value.filter(music => music.id !== musicId)
    }

    async function submitCreateStation() {
        pendingRequest.value = true

        try {
            await fetchAuthenticated(
                '/station/create',
                {
                    method: 'POST',
                    body: {
                        name: nameRef.value,
                        frequency: frequencyRef.value,
                        description: descriptionRef.value,
                        musicIds: playlist.value.map(music => music.id),
                    },
                },
            )

            updateStations && await updateStations()

            await navigateTo('/stations/my-station')
        }
        catch (error) {
            console.error({ error })
        }

        pendingRequest.value = false
    }
</script>
