<template>
    <UApp>
        <Header />
        <UMain>
            <slot />
            <UButton 
            icon="i-lucide-arrow-up" 
            color="neutral" 
            class="fixed md:right-8 right-4 bottom-8"
            onclick="window.scrollTo(0, 0)"/>
        </UMain>
        <Footer />
    </UApp>
</template>

<script setup lang="ts">
import Footer from '~/components/layouts/footer.vue';
import Header from '~/components/layouts/header.vue';
</script>