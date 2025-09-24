<template>
  <UContainer>
    <UBreadcrumb class="py-4" :items="breadcrumItems" />
    <UPageBody>
      <!-- CTA -->
      <UPageCTA
        :title="scale?.name"
        :description="scale?.description"
        variant="naked"
        :ui="{ container: 'p-4 sm:p-4 lg:p-8' }"
      />

      <!-- Respuestas: {{ responses }} <br />
      {{ "Resultado: " + result }} <br />
      {{ "¿Hay paso siguiente? " + stepper?.hasNext }} <br />
      {{ "Mostrar resultados: " + showResult }} <br /> -->
      <!-- Interpretaciones: {{interpretations }} <br> -->

      <!-- Stepper -->
      <UStepper
        v-if="!showResult"
        ref="stepper"
        v-model="idQuestion"
        :items="questions!"
        :ui="{ description: 'hidden', title: 'hidden sm:block' }"
        :disabled="true"
        :linear="true"
        :size="sizeStepper"
        @next="stepperNext()"
        @prev="stepperPrev()"
      >
        <template #content="{ item }">
          <UCard class="mt-4">
            <template #header>
              <h3 class="text-xl font-semibold">{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </template>
            <template #default>
              <URadioGroup v-model="valueQuestion" :items="item.responses" />
            </template>
          </UCard>
        </template>
      </UStepper>

      <!-- Buttons Stepper -->
      <div v-if="!showResult" class="flex gap-2 justify-between mt-4">
        <UButton
          leading-icon="i-lucide-arrow-left"
          :disabled="!stepper?.hasPrev"
          @click="stepper?.prev()"
        >
          Anterior
        </UButton>

        <UButton
          v-if="isAnswered"
          :disabled="valueQuestion === undefined"
          @click="showResult = true"
        >
          Finalizar
        </UButton>

        <UButton
          v-else
          trailing-icon="i-lucide-arrow-right"
          :disabled="valueQuestion === undefined"
          @click="stepper?.next()"
        >
          Siguiente
        </UButton>
      </div>

      <!-- Mostrando los resultados -->
      <div v-if="showResult">
        <UTabs
          :items="[{ label: 'Resultado', slot: 'resultTab' as const }, { label: 'Escala de valores', slot: 'scaleTab' as const }]"
          :unmount-on-hide="false"
          variant="link"
          class="w-full"
        >
          <template #resultTab>
            <div
              class="min-h-80 flex flex-col gap-2 items-center justify-center text-center rounded-lg bg-neutral-100 dark:bg-elevated/50"
            >
              <h3 class="text-6xl font-bold">{{ result }}</h3>
              <p class="text-3xl">{{ conclusion }}</p>
            </div>
          </template>

          <template #scaleTab>
            <div
              class="min-h-80 flex flex-col gap-2 items-center justify-center rounded-lg bg-neutral-100 dark:bg-elevated/50 p-6"
            >
              <UTable
                class="text-xl w-full md:w-11/12"
                :data="interpretations"
                :ui="{ th: 'text-center', td: 'text-center' }"
                :sorting="[{ id: 'min', desc: false }]"
              />
            </div>
          </template>
        </UTabs>
      </div>
    </UPageBody>
  </UContainer>
</template>

<script setup lang="ts">
import type { StepperItem } from "@nuxt/ui";
import type {
  Interpretation,
  Question,
  ResponsesScale,
  Scale,
} from "~/interfaces/scales";

//Definición de variables
const stepper = useTemplateRef<StepperItem>("stepper");
const route = useRoute();
const showResult = ref(false);
const slug = computed(() => route.params.slug);
const isAnswered = computed(
  () =>
    !stepper.value?.hasNext &&
    responses.value.length === questions.value?.length
);
const conclusion = computed(
  () =>
    interpretations.value?.find(
      (int) => int.min <= result.value! && int.max >= result.value!
    )?.conclusion
);

//Variables para obtener el valor de la scale
const valueQuestion = ref<number | undefined>(undefined);
const idQuestion = ref(0);
const response = computed<ResponsesScale>(() => {
  return {
    questionId: idQuestion.value,
    value: valueQuestion.value,
  };
});
const responses = ref<ResponsesScale[]>([]);

//Métodos para obtener el valor de la scale
const stepperNext = () => {
  valueQuestion.value = undefined;
};

const stepperPrev = () => {
  responses.value.pop();
  valueQuestion.value =
    responses.value.find((res) => res.questionId === idQuestion.value)?.value ||
    undefined;
};

watch(response, (newResponse) => {
  if (newResponse.value !== undefined) {
    responses.value = responses.value.filter(
      (res) => res.questionId !== newResponse.questionId
    );
    responses.value.push(newResponse);
  }
});

//Resultado dinámico del formulario
const result = computed(() => {
  return responses.value
    .map((res) => res.value)
    .reduce((accum, currentVal) => accum! + currentVal!, 0);
});

//Datos de la scale
const { data: scale } = await useAsyncData<Scale>(`${slug.value}`, () =>
  $fetch(
    `https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/scales?slug=eq.${slug.value}`,
    {
      headers: {
        apikey:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dHpicW90dnNlanVpY2F0cnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE4MTMsImV4cCI6MjA3MjY1NzgxM30.Dhf8n6f3rlrTDNu3CPQt-gZbq9zlDIofH58pykaHLpY",
        Accept: "application/vnd.pgrst.object+json",
      },
    }
  )
);

//Datos del Breadcrum
const breadcrumItems = [
  {
    label: "Inicio",
    icon: "i-lucide-house",
    to: "/",
  },
  {
    label: "Escalas",
    icon: "i-lucide-hospital",
    to: "/escalas",
  },
  {
    label: scale.value?.name,
    icon: "i-lucide-clipboard-plus",
    to: "/escalas/" + scale.value?.slug,
  },
];

//Datos de las questions
const { data: questions } = await useAsyncData<Question[]>(
  `questions-${scale.value?.slug}`,
  () =>
    $fetch(
      `https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/questions?id_scale=eq.${scale.value?.id}&select=*,responses(*)`,
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dHpicW90dnNlanVpY2F0cnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE4MTMsImV4cCI6MjA3MjY1NzgxM30.Dhf8n6f3rlrTDNu3CPQt-gZbq9zlDIofH58pykaHLpY",
        },
      }
    )
);

//Datos de las interpretations
const { data: interpretations } = await useAsyncData<Interpretation[]>(
  `Interpretations-${scale.value?.id}`,
  () =>
    $fetch(
      `https://nwtzbqotvsejuicatrzm.supabase.co/rest/v1/interpretations?select=min,max,conclusion&id_scale=eq.${scale.value?.id}`,
      {
        headers: {
          apikey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dHpicW90dnNlanVpY2F0cnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwODE4MTMsImV4cCI6MjA3MjY1NzgxM30.Dhf8n6f3rlrTDNu3CPQt-gZbq9zlDIofH58pykaHLpY",
        },
      }
    )
);

//Para hacer el stepper más responsive
const widthScreen = ref(0);

const handleResize = () => {
  widthScreen.value = window.innerWidth;
};

const sizeStepper = computed(() => {
  if (widthScreen.value >= 768) return "md";
  if (widthScreen.value >= 640) return "sm";
  return "xs";
});

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});
</script>
