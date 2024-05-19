<template>
    <div class="wrapper">
        <from action="">
            <h1 class="text-32 text-center font-600">
                Register
            </h1>

            <div class="space-y-24 my-48">
                <Input type="text" placeholder="Email" required icon="bx bxs-envelope" />
                <Input type="text" placeholder="Username" required icon="bx bxs-user" />
                <Input type="password" placeholder="Password" required icon="bx bxs-lock-alt" />
            </div>

            <Button type="submit" class="w-full">
                Create Account
            </Button>
        </from>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({ layout: 'login' })
</script>
