<template>
  <UApp>
    <Header />
    <UMain>
      <slot />
      <UButton
        icon="i-lucide-arrow-up"
        class="fixed right-4 bottom-4"
        onclick="window.scrollTo(0, 0)"
      />
    </UMain>
    <Footer />
    <SpeedInsights />
    <Analytics />
  </UApp>
</template>

<script setup lang="ts">
import Footer from "~/components/layouts/footer.vue";
import Header from "~/components/layouts/header.vue";
import { SpeedInsights } from "@vercel/speed-insights/nuxt";
import { Analytics } from "@vercel/analytics/nuxt";
</script>
