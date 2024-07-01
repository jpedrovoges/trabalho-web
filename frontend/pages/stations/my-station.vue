<template>
    <div class="p-[10%]">
        <template v-if="loadingStation">
            <i class="block text-48 text-center bx bx-loader-alt animate-spin" />
        </template>

        <MyStationInfo v-else-if="station" :station="station" @update-station="getUserStation" />

        <template v-else>
            <Heading>
                Ops...
            </Heading>

            <p class="text-24">
                Parece que você ainda nao possui nenhuma estação.<br>
                Deseja criar sua primeira?
            </p>

            <Button color="purple" to="/stations/create" class="mt-24">
                Criar estação
                <i class="bx bxs-plus-circle" />
            </Button>
        </template>
    </div>
</template>

<script setup lang="ts">
    import type { FetchError } from 'ofetch'
    import { fetchAuthenticated } from '~/helpers/fetch-authenticated'
    import type { Station } from '~/types/station'

    const loadingStation = ref(false)
    const station = ref<Station | null>(null)

    async function getUserStation() {
        loadingStation.value = true

        try {
            const response = await fetchAuthenticated<{ station: Station }>('/station/my')

            station.value = response.station
        }
        catch (e) {
            const error = e as FetchError

            console.log(error.data.message)
        }

        loadingStation.value = false
    }

    definePageMeta({
        middleware: 'auth',
    })

    onBeforeMount(async () => await getUserStation())
</script>
