<template>
    <div>
        <h1 class="text-32 text-center font-600">
            Login
        </h1>

        <form @submit.prevent="submitAuthenticate">
            <div class="space-y-24 my-48">
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

                <div class="flex justify-between items-center text-14">
                    <label><input type="checkbox"> Remember Me</label>

                    <NuxtLink
                        to="/forgot-password"
                        class="hover:underline"
                    >
                        Forgot Password?
                    </NuxtLink>
                </div>
            </div>

            <Button class="w-full">
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

    async function submitAuthenticate() {
        try {
            // TODO get JWT token
            const response = await $fetch<{ token: string }>(useRuntimeConfig().public.baseApiUrl + '/session', {
                method: 'POST',
                body: JSON.stringify({
                    email: emailInput.value,
                    password: passwordInput.value,
                }),
            })

            // TODO set JWT token into LocalStorage
            localStorage.setItem('token', response.token)
        }
        catch (error) {
            console.log(error)
        }
    }
</script>
