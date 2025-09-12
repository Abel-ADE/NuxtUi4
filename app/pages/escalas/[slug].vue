<template>
  <UContainer>
    <UBreadcrumb class="py-4" :items="breadcrumItems"/>
    <UPageBody>
      <UPageCTA :title="data?.name" :description="data?.description"/>
    </UPageBody>
  </UContainer>
</template>

<script setup lang="ts">
import type { Scale } from '~/interfaces/scales';

const route = useRoute();
const slug = computed(() => route.params.slug);

const { data } = await useAsyncData<Scale>(`${slug.value}`,
  () => $fetch(`https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/escalas?slug=eq.${slug.value}`,
      {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dHpicW90dnNlanVpY2F0cnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE4MTMsImV4cCI6MjA3MjY1NzgxM30.Dhf8n6f3rlrTDNu3CPQt-gZbq9zlDIofH58pykaHLpY',
          'Accept': 'application/vnd.pgrst.object+json'
        }
      })
)

const breadcrumItems = [
    {
        label: 'Inicio',
        icon: 'i-lucide-house',
        to: '/'
    },
    {
        label: 'Escalas',
        icon: 'i-lucide-hospital',
        to: '/escalas',
    },
    {
        label: data.value?.name,
        icon: 'i-lucide-clipboard-plus',
        to: '/escalas/'+data.value?.slug,
    }
]

</script>