<template>
    <UHeader> 
        <template #title>
           Escalas Enfermería
        </template>

         <UNavigationMenu  :items="menuItems"/>

        <template #body>
            <UNavigationMenu  :items="menuItems" orientation="vertical" />
        </template>

        <template #right>
            <UColorModeButton />
        </template>
    </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';
import type { ArrayOrNested } from '@nuxt/ui/runtime/types/utils.js';


const menuItems = ref<ArrayOrNested<NavigationMenuItem>>([
    {
        label: 'Inicio',
        icon: 'ic:baseline-home',
        to: '/'
    },
    {
        label: 'Escalas',
        icon: 'ic:baseline-accessibility-new',
        to: '/escalas',
        children : [
            {
                label: 'Escala 1',
                to: '/escalas/1'
            },
            {
                label: 'Escala 2',
                to: '/escalas/2'
            },
            {
                label: 'Escala 3',
                to: '/escalas/3'
            },
            {
                label: 'Escala 4',
                to: '/escalas/4'
            }
        ]
    }
])

</script>