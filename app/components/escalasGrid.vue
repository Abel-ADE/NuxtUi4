<template>
    <section class="flex flex-col gap-10">
        <component :is="heading" class="text-2xl md:text-3xl text-pretty tracking-tight font-bold text-highlighted text-center">
            {{ title }}
        </component>
        <div v-if="filtred" class="flex gap-4 justify-end">
            <USelect 
            v-model="selected" :items="categorias" value-key="id" label-key="category_name"
                placeholder="Categoría" :ui="{ base: 'w-[10rem]' }" />
            <UButton  label="Borrar filtros" icon="i-lucide-funnel-x" @click="selected = undefined" />
        </div>
        <UPageGrid>
            <UPageCard 
            v-for="scale in escalasMostradas" :key="scale.id" :title="scale.name" :description="scale.description"
                :to="'escalas/' + scale.slug" variant="subtle" :ui="{container:'shadow-lg rounded-lg dark:border-solid dark:border-gray-700 dark:border-2'}">
                <template #header>
                    <div class="flex gap-2">
                        <UBadge 
                        v-for="{ categories } in scale.categories_scales" :key="categories.id"
                            :ui="{ base: `text-${categories.category_color}-500 dark:text-${categories.category_color}-50 bg-${categories.category_color}-50 dark:bg-${categories.category_color}-900` }"
                            size="md" variant="soft">
                            <template #leading>
                                <UIcon :name="'i-lucide:' + categories.category_icon" />
                            </template>
                            {{ categories.category_name }}
                        </UBadge>
                    </div>
                </template>
            </UPageCard>
        </UPageGrid>
    </section>
</template>

<script setup lang="ts">
import type { Category, Scale } from '~/interfaces/scales';

interface Props {
    filtred?: boolean,
    limit?: number,
    title: string,
    heading: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
}

const props = defineProps<Props>();
const limitUrl = computed(() => props.limit ? `limit=${props.limit}` : '')

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


const { data: escalas } = await useAsyncData<Scale[]>(`allScales-limit-${props.limit}`,
    () =>
        $fetch(`https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/scales?select=*,categories_scales(id, id_scale, categories(*))&${limitUrl.value}`,
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
</script>