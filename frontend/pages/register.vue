<template>
    <div>
        <h1 class="text-32 text-center font-600">
            Register
        </h1>

        <form @submit.prevent>
            <div class="space-y-24 my-48">
                <Input placeholder="Email" required icon="bx bxs-envelope" />
                <Input placeholder="Username" required icon="bx bxs-user" />
                <Input type="password" placeholder="Password" required icon="bx bxs-lock-alt" />
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
</script>
