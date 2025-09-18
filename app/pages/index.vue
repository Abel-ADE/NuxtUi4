<template>
  <UContainer>
    <UPageBody>
      <section class="flex flex-col gap-10 p-8 sm:p-8 lg:p-16">
          <div class="flex flex-col gap-6 text-center">
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-bold">Todas las escalas de enfermería en una sola web</h1>
            <p class="text-lg sm:text-xl w-4/5 mx-auto">
              Las escalas de enfermería son una gran herramienta a la hora de
              hacer un buen análisis clínico, descúbre la gran variedad que te
              ofrece esta página y pasa al siguiente nivel
            </p>
          </div>
          <div class="flex justify-center align-middle gap-4 w-3/5 mx-auto">
            <UButton label="Ver escalas" to="/escalas" size="lg" />
          </div>
      </section>
      <EscalasGrid title="Escalas destacadas" heading="h2" :limit="3" />
    </UPageBody>
  </UContainer>
</template>

<script setup lang="ts">

</script>
