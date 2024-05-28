<template>
    <i :class="iconName" />
</template>

<script setup lang="ts">
    defineProps<{
        iconName: string
    }>()
</script>
