<script setup lang="ts">
let languages = {
  en: {
    icon: "🇨🇦",
    name: "English",
    level: "Native speaker",
  },
  es: {
    icon: "🇨🇴",
    name: "Spanish",
    level: "Working Proficiency",
  },
  fr: {
    icon: "🇫🇷",
    name: "French",
    level: "Limited Working Proficiency",
  },
  pt: {
    icon: "🇲🇿",
    name: "Portuguese",
    level: "Limited Working Proficiency",
  },
};
</script>

<template>
  <div class="languages">
    <h2>Languages</h2>
    <div class="languages-list">
      <div class="language" v-for="language in languages">
        <div class="icon">
          {{ language.icon }}
        </div>
        <div class="name">
          {{ language.name }}
        </div>
        <div class="level">
          {{ language.level }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.languages {
  div.languages-list {
    display: flex;
    flex-direction: column;
    row-gap: 12px;
    div.language {
      display: grid;
      column-gap: 10px;
      grid-template-columns: 20px 100px 1fr;
    }
  }
}
</style>
