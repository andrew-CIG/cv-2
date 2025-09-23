<script setup lang="ts">
import Other from "@/assets/snippets/other.md";
import { marked } from "marked";
</script>

<template>
  <div class="other">
    <h2>Hobbies & Interests</h2>
    <p v-html="marked.parse(Other)"></p>
  </div>
</template>

<style lang="scss" scoped>
</style>
