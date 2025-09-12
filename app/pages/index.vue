<template>
  <UContainer>
    <UPageBody>
      <UPageCTA 
      title="Todas las escalas de enfermería en una sola web"
      description="Las escalas de enfermería son una gran herramienta a la hora de hacer un buen análisis clínico, descúbre la gran variedad que te ofrece esta página y pasa al siguiente nivel"
      variant="soft" :links="ctaLinks" />
      <section class="flex flex-col gap-10">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center">Escalas destacadas</h2>
        <UPageGrid>
          <UPageCard v-for="(scale, index) in escalas" :key="index" v-bind="scale" />
        </UPageGrid>
      </section>
    </UPageBody>
  </UContainer>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui';
import type { Scale } from '~/interfaces/scales';

const ctaLinks = ref<ButtonProps[]>([
  {
    label: 'Ver escalas',
    color: 'neutral',
    to: '/escalas'
  }
])

const { data } = await useAsyncData<Scale[]>('featuredScales',
  () =>
    $fetch('https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/escalas?limit=6',
      {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dHpicW90dnNlanVpY2F0cnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE4MTMsImV4cCI6MjA3MjY1NzgxM30.Dhf8n6f3rlrTDNu3CPQt-gZbq9zlDIofH58pykaHLpY'
        }
      })
)

const escalas = data.value?.map((escala) => {
  return {
    title: escala.name,
    description: escala.description,
    to: 'escalas/'+escala.slug
  }
})
</script>
