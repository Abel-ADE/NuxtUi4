import { UContainer } from '../../../.nuxt/components';
<template>
    <UContainer>Escala {{ slug }}</UContainer>
</template>

<script setup lang="ts">
    const slug = useRoute().params.slug;
</script>