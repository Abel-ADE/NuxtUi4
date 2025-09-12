<template>
    <UApp>
        <Header />
        <UMain>
            <UContainer class="p-4">
                <UBreadcrumb :items="breadcrumItems" />
                <slot />
            </UContainer>
        </UMain>
        <Footer />
    </UApp>
</template>

<script setup lang="ts">
import Footer from '~/components/layouts/footer.vue';
import Header from '~/components/layouts/header.vue';
import type { BreadcrumbItem } from '@nuxt/ui'

const breadcrumItems = ref<BreadcrumbItem[]>([
    {
        label: 'Components',
        icon: 'i-lucide-box',
        to: '/docs/components'
    }
])


</script>