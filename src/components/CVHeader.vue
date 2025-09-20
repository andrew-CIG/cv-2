<script setup lang="ts">
// import { faGithub } from "@fortawesome/free-brands-svg-icons";

const BASE = import.meta.env.BASE_URL;
const HEADSHOT = `${BASE}profile.jpg`;

const contactTop = {
  home: { 
    icon: "fa-solid fa-house", 
    text: "PEI, Canada" 
  },
  phone: { 
    icon: "fa-solid fa-phone", 
    text: "+1 902 916 4466", 
    href: "tel:+19029164466" }
};

const citizenships = [
  { flag: "us", name: "USA" },
  { flag: "au", name: "Australia" },
  { flag: "co", name: "Colombia" },
]

const email = { 
  icon: "Fa-solid fa-envelope", 
  text: "andrew@greensandco.ca", 
  href: "mailto:andrew@greensandco.ca" 
};
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
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.headshot {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 200px;
  box-shadow: 0px 3px 24px 3px var(--color-shadow);
}

.my-name {
  font-size: 3em;
  font-weight: 700;
  width: 100%;
  text-align: left;
}

.row { margin-top: 6px; }
.item { display: flex; align-items: left; gap: 6px; }

.row-1 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px; /* old version */
  min-width: 300px;  /* old version */
  row-gap: 0.5em; /* old version */
  height: 24px;  /* old version */
  line-height: 20px;  /* old version */
  /* new version = gap: 12px 24px; */
  /* new version = align-items: center; */
}

.row-2 {
  display: flex;
  flex-wrap: wrap;
  gap: 6px; /* new version = 12px */
  align-items: baseline;
  text-align: left;
  font-style: normal;
  /* new version *//* color: var(--color-text-soft); */ 
  /* new version *//* font-style: italic; */ 
  /* new version *//* margin-top: 4px; */ 
}
.row-2 .label {
  font-style: normal;
  color: var(--color-text);
  margin-right: 6px;
}
.row-2 .flag { font-size: 16px; line-height: 1; }

.divider {
  border: none;
  border-top: 2px solid var(--color-text);
  opacity: 0.8;
  margin: 10px 0;
}

.row-3 {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  font-size: 1.1rem;
  line-height: 1;
  color: var(--color-tet);
}

a { color: inherit; text-decoration: underline; }

/* Old version: 
  div.contact-info {
    display: flex;
    flex-direction: column;
    min-width: 300px;
    row-gap: 0.5em;

    div.basic-info-grid,
    div.contact-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1em;
      font-size: 1em;

      div.info-element {
        display: flex;
        flex-direction: row;
        overflow: hidden;
        column-gap: 8px;
        height: 24px;
        line-height: 20px;

        div.icon {
          height: 1em;
          font-size: 1em;
          width: 1em;
        }

        div.text {
          font-weight: 600;
        }
      }
    }
  }
}
*/

@media (max-width: 700px) {
  .cv-header {grid-template-columns: 1fr; }
  .row-1 { grid-template-columns: 1fr; }
}

/* Old version: 

@media (max-width: 700px) {
  header {
    img.profile-picture {
      $size: 150px;
      width: $size;
      height: $size;
      object-fit: cover;
      border-radius: $size;
      box-shadow: 0px 3px 24px 3px var(--color-shadow);
    }
  }
}

@media screen and (max-width: 650px) {
  header {
    display: flex;
    flex-direction: column;
    align-items: center;

    div.contact-info {
      min-width: 80px;

      div.basic-info-grid,
      div.contact-info-grid {
        grid-template-columns: 1fr;
        align-items: center;
        column-gap: 8px;
      }
    }
  }
}
*/
</style>

