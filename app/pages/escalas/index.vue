<template>
  <UContainer>
    <UBreadcrumb class="py-4" :items="breadcrumItems" />
    <UPageBody>
      <section class="flex flex-col gap-10">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted text-center">
          Escalas de Enfermería</h2>
        <div class="flex gap-4">
          <USelectMenu v-model="selected" :items="categorias" value-key="id" label-key="category_name" placeholder="Categoría" :search-input="{placeholder:'Buscar...'}" :ui="{base: 'w-full'}" />
          <UButton label="Borrar filtros" icon="i-lucide-funnel-x" @click="selected = undefined"/>
        </div>
        <UPageGrid>
          <UPageCard 
          v-for="scale in escalasMostradas" :key="scale.id" :title="scale.name" :description="scale.description"
            :to="'escalas/' + scale.slug" :highlight="true" highlight-color="neutral">
            <template #header>
              <UBadge 
              v-for="{ categories } in scale.categories_scales" :key="categories.id"
                :ui="{ base: `text-${categories.category_color}-500 bg-${categories.category_color}-50` }" size="md"
                variant="soft">
                <template #leading>
                  <UIcon :name="'i-lucide:' + categories.category_icon" />
                </template>
                {{ categories.category_name }}
              </UBadge>
            </template>
          </UPageCard>
        </UPageGrid>
      </section>
    </UPageBody>
  </UContainer>
</template>

<script setup lang="ts">
import type { Category, Scale } from '~/interfaces/scales';

const selected = ref<number>();
const escalasMostradas = computed(() => {
  if(!selected.value) return escalas.value;
  return escalasFiltradas.value;
})

const escalasFiltradas = computed(() => {
  const arrayEscalas : Scale[] = [];
  const escalasIterator = escalas.value!.values();
  for (const escala of escalasIterator) {
    const categoriasIterator = escala.categories_scales!.values();
    for (const categoria of categoriasIterator) {
      const isCategorySelected = categoria.categories.id === selected.value;
      if(isCategorySelected) arrayEscalas.push(escala);
    }
}
  return arrayEscalas;
}) 

const { data: escalas } = await useAsyncData<Scale[]>(`allScales`,
  () =>
    $fetch(`https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/scales?select=*,categories_scales(id, id_scale, categories(*))`,
      {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dHpicW90dnNlanVpY2F0cnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE4MTMsImV4cCI6MjA3MjY1NzgxM30.Dhf8n6f3rlrTDNu3CPQt-gZbq9zlDIofH58pykaHLpY'
        }
      })
)

const { data: categorias } = await useAsyncData<Category[]>('categories',
  () =>
    $fetch('https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/categories?select=*',
      {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dHpicW90dnNlanVpY2F0cnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE4MTMsImV4cCI6MjA3MjY1NzgxM30.Dhf8n6f3rlrTDNu3CPQt-gZbq9zlDIofH58pykaHLpY'
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
  }
]
</script>
