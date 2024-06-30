<template>
    <div>
        <h1 class="text-32 text-center font-600">
            Register
        </h1>

        <form @submit.prevent="submitCreateUser">
            <div class="space-y-24 my-48">
                <Input
                    v-model="emailInput"
                    type="email"
                    placeholder="Email"
                    required
                    icon="bx bxs-envelope"
                />
                <Input
                    v-model="usernameInput"
                    placeholder="Username"
                    required
                    icon="bx bxs-user"
                />
                <Input
                    v-model="passwordInput"
                    type="password"
                    placeholder="Password"
                    required
                    icon="bx bxs-lock-alt"
                />
            </div>

            <Button class="w-full">
                Create Account
            </Button>

            <p class="text-14 text-center mt-20">
                Already have an account?
                <NuxtLink to="/login" class="font-600 hover:underline">
                    Sign in
                </NuxtLink>
            </p>
        </form>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({ layout: 'login' })

    const emailInput = ref('')
    const usernameInput = ref('')
    const passwordInput = ref('')

    async function submitCreateUser() {
        try {
            await $fetch(useRuntimeConfig().public.baseApiUrl + '/users', {
                method: 'POST',
                body: {
                    email: emailInput.value,
                    username: usernameInput.value,
                    password: passwordInput.value,
                },
            })

            await navigateTo('/login')
        }
        catch (error) {
            console.log(error)
        }
    }
</script>
