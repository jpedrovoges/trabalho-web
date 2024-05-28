<template>
    <div>
        <h1 class="text-32 text-center font-600">
            Reset password
        </h1>

        <form @submit.prevent>
            <div class="mt-48 mb-16">
                <Input
                    type="email"
                    placeholder="Email"
                    required
                    icon="bx bxs-envelope"
                />
            </div>

            <Button class="w-full">
                Send Code
            </Button>
        </form>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({ layout: 'login' })
</script>
