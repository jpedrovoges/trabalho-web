<template>
    <form action="">
        <h1 class="text-32 text-center font-600">
            Login
        </h1>

        <div class="space-y-24 my-48">
            <Input placeholder="Username" icon="bx bxs-user" required />

            <Input placeholder="Password" type="password" icon="bx bxs-lock-alt" required />

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

        <Button type="submit" class="w-full">
            Login
        </Button>

        <p class="text-14 text-center font-600 mt-20">
            Don't have an account?
            <NuxtLink to="/register" class="hover:underline">
                Register
            </NuxtLink>
        </p>
    </form>
</template>

<script setup lang="ts">
    definePageMeta({ layout: 'login' })
</script>
