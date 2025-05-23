// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  runtimeConfig: {
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_CX_ID: process.env.GOOGLE_CX_ID,
    public: {
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
      GOOGLE_CX_ID: process.env.GOOGLE_CX_ID,
    },
  },

  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image"],
});
