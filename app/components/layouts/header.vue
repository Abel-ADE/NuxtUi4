<template>
    <UHeader class="h-20" :ui="{root:'bg-white dark:bg-neutral-900',right: 'text-red-500', header:'h-20'}"> 
        <template #title>
           Escalas<span class="text-primary">Enfermería</span>
        </template>

        <UNavigationMenu :ui="{link:'[&[data-active]]:text-primary text-inherit transition-colors', linkLabel: 'text-inherit', linkLeadingIcon:'text-inherit' }" :items="menuItems" variant="link"/>
        
        <template #body>
            <UNavigationMenu :ui="{link:'[&[data-active]]:text-primary text-inherit transition-colors', linkLabel: 'text-inherit', linkLeadingIcon:'text-inherit' }" :items="menuItems" orientation="vertical"/>
        </template>

        <template #right>
            <UColorModeButton color="primary" />
        </template>
    </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const menuItems = computed<NavigationMenuItem[]>(() => [
    {
        label: 'Inicio',
        icon: 'i-lucide-house',
        to: '/',
        activeClass: 'text-primary',
    },
    {
        label: 'Escalas',
        icon: 'i-lucide-hospital',
        to: '/escalas',
        activeClass: 'text-primary',
        active: route.path.startsWith('/escala'),
    }
])

</script>