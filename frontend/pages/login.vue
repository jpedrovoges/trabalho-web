<template>
    <div>
        <h1 class="text-32 text-center font-600">
            Login
        </h1>

        <form @submit.prevent="submitAuthenticate">
            <div class="space-y-24 mt-48">
                <Input
                    v-model="emailInput"
                    placeholder="Email"
                    type="email"
                    icon="bx bxs-user"
                    required
                />

                <Input
                    v-model="passwordInput"
                    placeholder="Password"
                    type="password"
                    icon="bx bxs-lock-alt"
                    required
                />

                <div class="text-14 text-right">
                    <NuxtLink
                        to="/forgot-password"
                        class="hover:underline"
                    >
                        Forgot Password?
                    </NuxtLink>
                </div>
            </div>

            <Button class="w-full mt-24" :loading="pendingRequest">
                Login
            </Button>
        </form>

        <p class="text-14 text-center mt-20">
            Don't have an account?
            <NuxtLink to="/register" class="font-600 hover:underline">
                Register
            </NuxtLink>
        </p>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({ layout: 'login' })

    const emailInput = ref('')
    const passwordInput = ref('')
    const pendingRequest = ref(false)

    async function submitAuthenticate() {
        pendingRequest.value = true

        try {
            const response = await $fetch<{ token: string }>(
                useRuntimeConfig().public.baseApiUrl + '/user/login',
                {
                    method: 'POST',
                    body: {
                        email: emailInput.value,
                        password: passwordInput.value,
                    },
                },
            )

            localStorage.setItem('jwt', response.token)

            await navigateTo('/stations')
        }
        catch (error) {
            console.log({ error })
        }

        pendingRequest.value = false
    }
</script>
