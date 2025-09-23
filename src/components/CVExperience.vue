<script setup lang="ts">
import Moz2009 from "@/assets/experiences/2009-mozambique.md";
import MM2011 from "@/assets/experiences/2011-MM.md";
import MM2013 from "@/assets/experiences/2013-MM.md";
import Oakville2015 from "@/assets/experiences/2015-oakville.md";
import FPG2015 from "@/assets/experiences/2015-fpg.md";
import move2019 from "@/assets/experiences/2019-move.md";
import CIG2020 from "@/assets/experiences/2020-cig.md";
import { marked } from "marked";


const BASE = import.meta.env.BASE_URL; // e.g., "/cv-2/"
const mdToHtml = (s: string): string=>
  marked.parse(s, { async: false }) as string;

// Map normalized names -> actual PNG filenames (without extension)
const iconAliases: Record<string, string> = {
  'sap': 'SAP',
  'powerbi': 'powerBI',
  'sagex3': 'sageX3',
  'python': 'python',
  'clusa': 'CLUSA',
  'core': 'CORE',
  'csp': 'CSP',
  'fpg': 'FPG',
  'habitat_pei': 'habitat_pei',
  'mdg': 'MDG',
  'mm': 'MM',
  'oakville': 'Oakville',
  'technoserve': 'technoserve',
};

const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/\s+/g, '').replace(/[\.+-]/g, '');

const iconSrc = (name: string, folder = 'companies') => {
  const key = normalize(name);
  const file = iconAliases[key] ?? name;
  return `${BASE}${folder}/${file}.png`;
};

const hideOnError = (e: Event) => {
  (e.target as HTMLImageElement).style.display = 'none';
};

type Position = {
  title: string;
  from: string;
  to: string;
  description: string;
  technologies?: string[];
  organisations?: string[];
};

const splitDescription3 = (html: string) => {
  const match = html.match(/<(ul|ol)\b[^>]*>[\s\S]*?<\/\1>/i);
  if (!match || match.index === undefined) {
    return { intro: html, bullets: "", tail: "" };
  }
  const start = match.index;
  const listHTML = match[0];
  const end = start + listHTML.length;
  return {
    intro: html.slice(0, start).trim(),
    bullets: listHTML.trim(),
    tail: html.slice(end).trim(),
  };
};

const partsFrom = (desc: string) => splitDescription3(desc);

const hasTech = (p: Position) =>
  Array.isArray(p.technologies) && p.technologies.length > 0;

const hasOrgs = (p: Position) =>
  Array.isArray(p.organisations) && p.organisations.length > 0;

type Experience = {
  company: string;
  url?: string;
  location: string;
  icon: string;
  positions: Position[];
  pageBreak?: boolean;
  about?: string;
};

let experiences: Experience[] = [
  {
    company: "Canada's Island Garden Inc.",
    about: "Legal cannabis cultivation, processing, and distribution",
    //url: "https://www.linkedin.com/company/canadasislandgarden/",
    icon: "CIG.png",
    location: "PEI, Canada",
    positions: [
      {
        title: "Vice President - Supply Chain",
        from: "January 2020",
        to: "Today",
        description: mdToHtml(CIG2020),
        technologies: [
        "microsoft_logo",
        "powerBI",
        "python",
        "sageX3",
        "SAP",
        ],
      },
    ],
    pageBreak: false,
  },
  {
    company: "Sabbatical",
    about: "Moved to Canada, 12-months for visa processing",
    icon: "CanadaV2.png",
    location: "Eleuthera Island, Bahamas & PEI, Canada",
    positions: [
      {
        title: "Volunteer",
        from: "January 2019",
        to: "December 2019",
        description: mdToHtml(move2019),
        organisations: [
          "CORE",
          "MDG",
          "CSP",
          "habitat_pei"
        ],
      },
    ],
    pageBreak: false,
  },
  {
    company: "Fresh Produce Group - Western Australia",
    about: "One of Australia’s largest fresh produce suppliers",
    //url: "https://fpg.com.au",
    location: "Perth, Australia",
    icon: "FPG.png",
    positions: [
      {
        title: "Category Manager",
        from: "October 2015",
        to: "December 2018",
        description: mdToHtml(FPG2015),
        technologies: [
          "netsuite",
          "microsoft_logo",
        ],
      },
    ],
    pageBreak: false,
  },
  {
    company: "Oakville Produce Group",
    about: "Vertically integrated fresh produce wholesaler",
    //url: "",
    location: "Australia",
    icon: "Oakville.png",
    positions: [
      {
        title: "National Category Manager and Facility Manager",
        from: "Feb 2015",
        to: "Sep 2015",
        description: mdToHtml(Oakville2015),
        technologies: [
          "dynamicsNav",
          "microsoft_logo",
        ],
      },
      {
        title: "Operations Manager",
        from: "Jan 2013",
        to: "Jan 2015",
        description: mdToHtml(MM2013),
        technologies: [
          "dynamicsNav",
          "microsoft_logo",
        ]
      },
      {
        title: "Analyst",
        from: "May 2011",
        to: "Dec 2013",
        description: mdToHtml(MM2011),
        technologies: [
          "SAP",
          "microsoft_logo",
        ]
      },
    ],
  },
  {
    company: "Various organisations",
    location: "Mozambique",
    icon: "mozambiqueV2.png",
    positions: [
      {
        title: "Consultant, Project Coordinator",
        from: "Mar 2009",
        to: "Nov 2010",
        description: mdToHtml(Moz2009),
        organisations: [
          "technoserve", 
          "CLUSA"
        ],
      },
    ],
    pageBreak: false,
  },
];
</script>

<template>
  <div class="experience">
    <h2>Experience</h2>
    <div class="experiences">
      <div class="company" v-for="exp in experiences">
        <img :src="BASE + 'companies/square/' + exp.icon" class="company-logo" />

        <div class="experience-top">
            <div class="company-name">
              {{ exp.company }}
              <span class="company-desc" v-if="exp.about"><em> {{ exp.about }}</em></span>
            </div>
          <div class="location">{{ exp.location }}</div>
          <a :href="exp.url" v-if="exp.url" target="_blank">{{ exp.url }}</a>
        </div>

        <div class="line"></div>

        <div class="experience-desc">
          <div class="positions">
            <div class="position" v-for="position in exp.positions">
              <div class="title">{{ position.title }}</div>
              <div class="from-to">
                <span class="from">
                  {{ position.from }}
                </span>
                <span class="divider">-</span>
                <span class="to">
                  {{ position.to }}
                </span>
              </div>

              <!-- Intro paragraph always visible -->
              <div
                class="intro markdown"
                v-html="partsFrom(position.description).intro"
              />  
              
              <!-- Bullets hidden until expanded -->
              <details class="desc" v-if="partsFrom(position.description).bullets">
                <summary>Details</summary>
                <div class="markdown" v-html="partsFrom(position.description).bullets"></div>
              </details>

              <!-- Achievements section -->
               <div
                class="after-list markdown"
                v-if="partsFrom(position.description).tail"
                v-html="partsFrom(position.description).tail"
              />
              
              <!-- Tech and Orgs -->
              <div class="tech-org-container" v-if="hasTech(position) || hasOrgs(position)">

                <!-- Technologies -->
                <div class="tech-stack-section" v-if="hasTech(position)">
                  <h4>Technologies</h4>
                  <div class="tech-stack">
                    <img
                      class="tech-logo"
                      v-for="language in position.technologies"
                      :key="language"
                      :src="`${BASE}companies/square/${language}.png`"
                      :alt="language"
                    />
                  </div>
                </div>

                <!-- Organisations -->
                <div class="organisations-section" v-if="hasOrgs(position)">
                  <h4>Organisations</h4>
                  <div class="organisations">
                    <img
                      class="org-logo"
                      v-for="language in position.organisations"
                      :key="language"
                      :src="`${BASE}companies/square/${language}.png`"
                      :alt="language"
                    />
                  </div>
                </div>

              </div>

            </div>
            <div v-if="exp.pageBreak" class="page-break"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$companyLogoSize: 72px;
$gap: 12px;

.experiences {
  display: grid;
  row-gap: 1.25rem;
}

.company {
  display: grid;
  grid-template-columns: $companyLogoSize 1fr;
  column-gap: 1rem;
  align-items: start;
}

.company-name { 
  font-size: 1.2em; 
}

.experience-top {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  height: $companyLogoSize;
  margin-bottom: 1em;
}

.positions {
  display: grid;
  gap: 1rem;
}

/* --- Intro & Details --- */
.intro.markdown {
  margin-top: 0.5rem;
  margin-bottom: 0.75rem;
}

details.desc > summary {
  cursor: pointer;
  margin: 0.25rem 0 0 0.5rem;
  color: var(--color-text);
}

details.desc .markdown ul{
  margin: 0.75em 0 0;
  padding-left: 1.25em;
  list-style: disc outside;
}

details.desc markdown li { margin: 0.3em 0; }
details.desc .markdown li::marker { color: var(--color-text-soft); }

.after-list.markdown {
  margin: 0.75rem 0;
}

/* --- Tech / Orgs --- */
.tech-org-container { margin-top: 0.5rem; }

.tech-stack-section, .organisations-section {
  margin-top: 0.75rem;
  h4 { margin: 0.75rem 0 0.5rem; }
}

.tech-stack, .organisations {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 0.75rem;
  justify-content: center;
  align-items: center;
}

.tech-logo, .org-logo {
  height: 36px;
  width: auto;
  display: block;
}

details.desc ~ .tech-org-container { display: none; }
details.desc[open] ~ .tech-org-container { display: block; }

@media print {
  $companyLogoSize: 50px;
  .experiences .company { align-items: start; }

  .experience-top {
    min-height: $companyLogoSize;
    height: auto;
    align-items: flex-start;
    margin-bottom: 1em;
  }

  .positions .from-to {
    white-space: nowrap;
    align-items: baseline;
  }

  details.desc .markdown ul {
    list-style-position: outside;
    padding-left: 1.25em;
    margin: 0.5rem 0;
  }
  details.desc .markdown li { margin: 0.2rem 0; }

  details.desc ~ .tech-org-container {
    display: none !important;
  }
  details.desc[open] ~ .tech-org-container {
    display: block !important;
  }

  .tech-stack, .organisations {
    justify-content: flex-start !important;
    align-items: center;
  }

  .company,
  .experience-top,
  .positions,
  .position,
  .tech-org-container,
  .after-list,
  details.desc {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  details.desc > summary {
    break-after: avoid;
    page-break-before: avoid;
  }
}

@media screen and (max-width: 600px) {
  $logoHeight: 50px;
  .company {
    grid-template-columns: 1fr;
  }
  .experience-top {
    max-height: $logoHeight;
  }
  .tech-stack, .organisations {
    justify-content: flex-start;
  }
}
</style>