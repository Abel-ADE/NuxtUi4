<template>
  <UContainer>
    <UBreadcrumb class="py-4" :items="breadcrumItems" />
    <UPageBody>
     <EscalasGrid title="Escalas de enfermería" heading="h1" :filtred="true"/>
    </UPageBody>
  </UContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from '@nuxt/ui';


const breadcrumItems: BreadcrumbItem[] = [
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
]
</script>
