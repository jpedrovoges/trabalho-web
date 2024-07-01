<template>
    <h1
        class="inline text-40 font-600 highlight"
    >
        <slot />
    </h1>
</template>

<style scoped>
    .highlight {
        background: linear-gradient(
            to top,
            transparent 10%,
            theme('colors.purple.900') 10%,
            theme('colors.purple.900') 35%,
            transparent 35%
        );
    }
</style>
