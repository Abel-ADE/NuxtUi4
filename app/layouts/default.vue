<template>
    <UApp>
        <Header />
        <UMain>
            <slot />
        </UMain>
        <Footer />
    </UApp>
</template>

<script setup lang="ts">
import Footer from '~/components/layouts/footer.vue';
import Header from '~/components/layouts/header.vue';
</script>