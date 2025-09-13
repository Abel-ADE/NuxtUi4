<template>
  <UContainer>
    <UBreadcrumb class="py-4" :items="breadcrumItems"/>
    <UPageBody>
      <!-- CTA -->
      <UPageCTA 
      :title="escala?.name"
      :description="escala?.description"
      variant="soft"
      :ui="{container: 'p-4 sm:p-4 lg:p-8'}"/>

      <p>{{'Question: '+ actualQuestion }} </p>
      <p>{{'Select: '+ value }} </p>
      {{ responses }}

      <!-- Stepper -->
      <UStepper ref="stepper" :items="preguntas!">
      <template #content="{ item }">
        <UCard class="mt-4">
          <template #header>
            <h3 class="text-xl font-semibold">{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </template>
          <template #default>
            <URadioGroup v-model="value" :items="item.responses" />
          </template>
        </UCard>
      </template>
    </UStepper>

    <!-- Buttons Stepper -->
    <div class="flex gap-2 justify-between mt-4">
      <UButton
        leading-icon="i-lucide-arrow-left"
        :disabled="!stepper?.hasPrev"
        @click="stepper?.prev(), value=0, actualQuestion--"
      >
        Prev
      </UButton>

      <UButton
        trailing-icon="i-lucide-arrow-right"
        @click="
        responses.push({questionId: actualQuestion, value: value}),
        value=0, 
        stepper?.next(),
        (actualQuestion < preguntas!.length) ? actualQuestion++ :''
        "
      >
        Next
      </UButton>
    </div>

    </UPageBody>
  </UContainer>
</template>

<script setup lang="ts">
import type { Question, Scale } from '~/interfaces/scales';

//Definición de variables
const stepper = useTemplateRef('stepper');
const route = useRoute();
const slug = computed(() => route.params.slug);

//Para obtener el valor de la escala
const value = ref(0);
const actualQuestion = ref(1);
const responses = ref<Responses[]>([
]);

interface Responses {
  questionId: number,
  value: number,
}


//Escala
const { data: escala } = await useAsyncData<Scale>(`${slug.value}`,
  () => $fetch(`https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/scales?slug=eq.${slug.value}`,
      {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dHpicW90dnNlanVpY2F0cnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE4MTMsImV4cCI6MjA3MjY1NzgxM30.Dhf8n6f3rlrTDNu3CPQt-gZbq9zlDIofH58pykaHLpY',
          'Accept': 'application/vnd.pgrst.object+json'
        }
      })
)

//Breadcrum
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
        label: escala.value?.name,
        icon: 'i-lucide-clipboard-plus',
        to: '/escalas/'+escala.value?.slug,
    }
]

//Preguntas
const { data: preguntas } = await useAsyncData<Question[]>(`preguntas-${escala.value?.slug}`,
  () => $fetch(`https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/questions?id_scale=eq.${escala.value?.id}&select=*,responses(*)`,
      {
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dHpicW90dnNlanVpY2F0cnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE4MTMsImV4cCI6MjA3MjY1NzgxM30.Dhf8n6f3rlrTDNu3CPQt-gZbq9zlDIofH58pykaHLpY',
        }
      })
)



</script>