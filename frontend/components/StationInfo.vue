<template>
    <div class="">
        <div class="flex gap-24 items-end">
            <Heading ref="name" :contenteditable="editMode">
                {{ station.name }}
            </Heading>

            <span class="text-20 text-gray-400">({{ station.frequency }})</span>

            <Button color="ghost" @click="toggleEdit">
                <i
                    :key="editMode ? 'save' : 'edit'"
                    class="text-24 bx"
                    :class="editMode ? 'bx-save' : 'bxs-edit-alt'"
                />
            </Button>

            <button class="ml-auto" @click="streamAudio">
                <i class="bx bx-play-circle text-56 text-green-500" />
            </button>
        </div>

        <p ref="description" class="mt-16 text-gray-400" :contenteditable="editMode">
            {{ station.description }}
        </p>

        <div class="mt-64">
            <p class="text-18 font-600">
                Playlist
            </p>

            <ul class="mt-24 space-y-16">
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
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Heading from './Heading.vue'
    import { fetchAuthenticated } from '~/helpers/fetch-authenticated'
    import type { Music, Station } from '~/types'

    const musics = inject<Ref<Music[]>>('musics')
    const props = defineProps<{ station: Station }>()
    const emit = defineEmits(['updateStation'])

    const editMode = ref(false)
    const name = ref<ComponentPublicInstance<typeof Heading>>()
    const description = ref<HTMLParagraphElement>()

    const playlist = computed(() => {
        if (!props.station.musicIds || !musics)
            return []

        return musics.value.filter(music => props.station.musicIds?.includes(music.id))
    })

    async function toggleEdit() {
        if (!editMode.value || !name.value || !description.value)
            return editMode.value = !editMode.value

        const stationNameElement = name.value?.$el as HTMLHeadElement

        const nameText = stationNameElement.innerText
        const descriptionText = description.value?.innerText

        if (!nameText || !descriptionText)
            return editMode.value = !editMode.value

        try {
            await fetchAuthenticated<{ station: Station }>(
                `/station/${ props.station.id }`,
                {
                    method: 'PATCH',
                    body: {
                        name: nameText,
                        description: descriptionText,
                    },
                },
            )

            emit('updateStation')
        }
        catch (error) {
            console.log(error)

            stationNameElement.innerText = props.station.name
            description.value.innerText = props.station.description
        }

        editMode.value = !editMode.value
    }
</script>
