<script setup lang="ts">

import { faGithub } from "@fortawesome/free-brands-svg-icons";

const BASE = import.meta.env.BASE_URL;
const HEADSHOT = `${BASE}profile.jpg`;

// Row 1 data (monochrome FA icons)
const contactTop = {
  home:  { icon: "fa-solid fa-house", text: "PEI, Canada" },
  phone: { icon: "fa-solid fa-phone", text: "+1 902 916 4466", href: "tel:+19029164466" }
};


// Row 2 data (citizenships)
const citizenships = [
  { flag: "🇺🇸", name: "USA" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇨🇴", name: "Colombia" }
];

// Row 3 data (only email)
const email = { icon: "fa-solid fa-envelope", text: "andrew@greensandco.ca", href: "mailto:andrew@greensandco.ca" };

</script>

<template>
  <header class="cv-header">
    <div class="left">
      <img :src="HEADSHOT" alt="Profile photo" class="headshot" />
    </div>

    <div class="right">
      <h1 class="my-name">Andrew Raymer</h1>

      <!-- Row 1: location + phone (2-column) -->
      <div class="row row-1">
        <div class="item">
          <i :class="contactTop.home.icon" class="icon"></i>
          <span>{{ contactTop.home.text }}</span>
        </div>
        <div class="item">
          <i :class="contactTop.phone.icon" class="icon"></i>
          <a :href="contactTop.phone.href">{{ contactTop.phone.text }}</a>
        </div>
      </div>

      <!-- Row 2: citizenships single line -->
      <div class="row row-2">
        <span class="label">Citizen:</span>
        <span
          class="citizen"
          v-for="c in citizenships"
          :key="c.name"
        >
          <span class="flag">{{ c.flag }}</span> {{ c.name }}
        </span>
      </div>

      <hr class="divider" />

      <!-- Row 3: email only -->
      <div class="row row-3">
        <i :class="email.icon" class="icon"></i>
        <a class="email" :href="email.href">{{ email.text }}</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cv-header {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: center;
}
.headshot {
  width: 100%;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
}

/* name */
.my-name {
  margin: 0 0 8px 0;
}

/* shared rows */
.row { margin-top: 6px; }
.item { display: flex; align-items: center; gap: 10px; }

/* Row 1: keep as 2-column grid */
.row-1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  align-items: center;
}

/* Row 2: single line, italic secondary tone */
.row-2 {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: baseline;
  color: var(--color-text-soft);
  font-style: italic;
  margin-top: 4px;
}
.row-2 .label {
  font-style: normal;
  color: var(--color-text);
  margin-right: 6px;
}
.row-2 .flag { font-size: 16px; line-height: 1; }

/* divider */
.divider {
  border: none;
  border-top: 2px solid var(--color-text-soft);
  opacity: 0.4;
  margin: 10px 0;
}

/* Row 3: email only */
.row-3 {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* monochrome FA icons */
.icon {
  font-size: 1.1rem;
  line-height: 1;
  color: var(--color-text);        /* same color as the email icon/link */
}

/* links */
a { color: inherit; text-decoration: underline; }

/* small screens */
@media (max-width: 700px) {
  .cv-header { grid-template-columns: 1fr; }
  .row-1 { grid-template-columns: 1fr; }
}
</style>