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

                        <Button to="/stations" color="outline-red" class="mt-24">
                            Cancelar
                        </Button>

                        <Button color="purple" class="mt-24" :loading="pendingRequest">
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

    const nameRef = ref('')
    const descriptionRef = ref('')
    const frequencyRef = ref('')

    const pendingRequest = ref(false)

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
                    },
                },
            )

            await navigateTo('/stations/my-station')
        }
        catch (error) {
            console.error({ error })
        }

        pendingRequest.value = false
    }
</script>
