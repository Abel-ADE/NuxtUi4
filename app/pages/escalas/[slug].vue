<template>
    <div>Escala {{ slug }}</div>
</template>

<script setup lang="ts">
    const slug = useRoute().params.slug;
</script>