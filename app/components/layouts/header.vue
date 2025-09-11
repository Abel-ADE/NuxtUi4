<template>
    <UHeader> 
        <template #title>
           Escalas Enfermería
        </template>

        <UNavigationMenu :items="menuItems" />
        
        <template #body>
            <UNavigationMenu :items="menuItems" orientation="vertical"/>
        </template>

        <template #right>
            <UColorModeButton />
        </template>
    </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const menuItems = ref<NavigationMenuItem[]>([
    {
        label: 'Inicio',
        icon: 'i-lucide-house',
        to: '/'
    },
    {
        label: 'Escalas',
        icon: 'i-lucide-hospital',
        to: '/escalas',
    }
])

</script>