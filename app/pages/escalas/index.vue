<template>
    <UContainer>
    <UPageBody>
      <section class="flex flex-col gap-10">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center">Escalas de Enfermería</h2>
        <UPageGrid>
          <UPageCard v-for="scale in escalas" :key="scale.id" v-bind="scale" />
        </UPageGrid>
      </section>
    </UPageBody>
  </UContainer>
</template>

<script setup lang="ts">
import type { Scale } from '~/interfaces/scales';

const { data } = await useAsyncData<Scale[]>('allScales',
  () =>
    $fetch('https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/escalas',
      {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dHpicW90dnNlanVpY2F0cnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE4MTMsImV4cCI6MjA3MjY1NzgxM30.Dhf8n6f3rlrTDNu3CPQt-gZbq9zlDIofH58pykaHLpY'
        }
      })
)

const escalas = data.value?.map((escala) => {
  return {
    id: escala.id,
    title: escala.name,
    description: escala.description,
    to: 'escalas/'+escala.slug
  }
})
</script>
