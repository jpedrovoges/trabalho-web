<template>
    <ul>
        <li v-for="station of stations" :key="station.name">
            <button>
                {{ station.name }}
            </button>
        </li>
    </ul>
</template>

<script setup lang="ts">
    // TODO load stations from server
    const stations = [
        {
            name: 'Radio 1',
        },
        {
            name: 'Radio 2',
        },
    ]
</script>
