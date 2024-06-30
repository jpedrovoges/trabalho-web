<template>
    <div class="relative">
        <input
            v-model="modelValue"
            :placeholder="placeholder"
            :type="type"
            :required="required"
            class="w-full h-48 p-20 bg-transparent border-2 border-gray-50 rounded-32
            outline-none placeholder:text-gray-400"
        >
        <Icon
            v-if="icon"
            class="absolute top-1/2 right-20 -translate-y-1/2 text-20"
            :icon-name="icon"
        />
    </div>
</template>

<script setup lang="ts">
    import type { InputTypeHTMLAttribute } from 'vue'

    const modelValue = defineModel<string>('modelValue')

    defineProps<{
        icon?: string
        type?: InputTypeHTMLAttribute
        required?: boolean
        placeholder?: string
    }>()
</script>
