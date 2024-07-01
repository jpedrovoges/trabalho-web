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
        </div>

        <p ref="description" class="mt-16" :contenteditable="editMode">
            {{ station.description }}
        </p>

        <!-- TODO add musica, ver playlist e editar -->
    </div>
</template>

<script setup lang="ts">
    import Heading from './Heading.vue'
    import { fetchAuthenticated } from '~/helpers/fetch-authenticated'
    import type { Station } from '~/types/station'

    const props = defineProps<{ station: Station }>()
    const emit = defineEmits(['updateStation'])

    const editMode = ref(false)
    const name = ref<ComponentPublicInstance<typeof Heading>>()
    const description = ref<HTMLParagraphElement>()

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
