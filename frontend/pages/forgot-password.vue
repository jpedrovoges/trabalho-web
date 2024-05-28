<template>
    <div class="wrapper">
        <from action="">
            <h1 class="text-32 text-center font-600">
                Reset password
            </h1>
            <div class="mt-48 mb-16">
                <Input
                    type="text"
                    placeholder="Email"
                    required
                    icon="bx bxs-envelope"
                />
            </div>

            <Button type="submit" class="w-full">
                Send Code
            </Button>
        </from>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({ layout: 'login' })
</script>
