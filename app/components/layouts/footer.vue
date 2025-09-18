<template>
  <UFooter class="bg-neutral-900 dark:bg-primary-950 text-white p-10">
    <template #default>
      <div class="flex flex-col gap-4">
        <p class="text-center font-bold text-2xl m-0 p-0">Escalas <span class="text-primary">Enfermería</span></p>
        <p class="text-center text-gray-300 text-sm m-0 p-0">
          Copyright © {{ new Date().getFullYear() }}
        </p>
      </div>
      <ColoresImportados />
    </template>
  </UFooter>
</template>
