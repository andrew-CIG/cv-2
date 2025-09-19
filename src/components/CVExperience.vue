<script setup lang="ts">
import Moz2009 from "@/assets/experiences/2009-mozambique.md";
import Oakville2011 from "@/assets/experiences/2011-oakville.md"
import FPG2015 from "@/assets/experiences/2015-fpg.md";
import move2019 from "@/assets/experiences/2019-move.md";
import CIG2020 from "@/assets/experiences/2020-cig.md";
import { marked } from "marked";
const BASE = import.meta.env.BASE_URL; // e.g., "/cv-2/"
const mdToHtml = (s: string): string=>
  marked.parse(s, { async: false }) as string;

// Map normalized names -> actual PNG filenames (without extension)
const iconAliases: Record<string, string> = {
  // tech
  'sap': 'SAP',
  'powerbi': 'powerBI',
  'sagex3': 'sageX3',
  'python': 'python',
  // organisations (if you use them)
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
          "SAP",
          "sageX3",
          "powerBI",
          "python"
        ],
      },
    ],
    pageBreak: false,
  },
  {
    company: "Sabbatical",
    about: "Moved to Canada, 12-months for visa processing",
    icon: "Canada.png",
    location: "PEI, Canada",
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
          "microsoft",
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
        description: mdToHtml(Oakville2011),
        technologies: [
          "dynamicsNav",
          "microsoft",
        ],
      },
    ],
  },
  {
    company: "Various organisations",
    location: "Mozambique",
    icon: "mozambique.png",
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

              <div class="description" v-html="position.description"></div>

              <!-- Tech Stack (optional)-->
              <div class="tech-stack-section" v-if="hasTech(position)">
                <h4>Technologies</h4>
                <div class="tech-stack">
                  <div
                    class="icon-tile"
                    v-for="language in position.technologies"
                    :key="language"
                  >
                    <img
                      :src="`${BASE}companies/square/${language}.png`"
                      :alt="language"
                    />
                  </div>
                </div>
              </div>

              <!--Organisations (optional)-->
              <div class="organisations-section" v-if="hasOrgs(position)">
                <h4>Organisations</h4>
                <div class="organisations">
                  <div 
                    class="icon-title"
                    v-for="language in position.organisations"
                    :key="language"
                  >
                    <img
                      :src="`${BASE}companies/square/${language}.png`"
                      :alt="language"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="exp.pageBreak" class="page-break"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$companyLogoSize: 80px;

div.experiences {
  display: flex;
  flex-direction: column;
  row-gap: 64px;

  div.company {
    display: grid;
    grid-template-columns: $companyLogoSize 1fr;
    grid-auto-rows: minmax(72px, auto);
    column-gap: 32px;

    div.page-break { display: none; }

    div.company-name { font-size: 1.2em; }

    img.company-logo {
      page-break-inside: avoid;
      width: $companyLogoSize;
      height: $companyLogoSize;
      background-color: #fff;
      object-fit: contain;
      padding: 3px;
      border-radius: 3px;
    }

    .icon-tile {
      $logoSize: 60px;     /* match your grid's $logoSize */
      $logoPadding: 6px;   /* try 6; use 4 if logos still feel small */

      width: $logoSize;
      height: $logoSize;
      padding: $logoPadding;
      border-radius: 6px;
      background: #fff;

      display: grid;
      place-items: center;
      overflow: hidden;
    }

    
    .icon-tile img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      display: block;
    }

    div.line {
      page-break-before: avoid;
      page-break-after: avoid;
      margin-left: auto;
      margin-right: auto;
      background-color: var(--color-position-line);
      width: 2px;
      height: auto;
    }

    div.experience-top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: $companyLogoSize;
      page-break-before: avoid;

      div.company-name { 
        font-weight: bold; 
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        column-gap: 0.5em;

        .company-desc {
          font-weight: normal;
          font-style: italic;
          color: var(--color-text-soft);
          font-size: 0.8em;
        }
      }

      div.location { 
        font-size: 1em; 
        color: var(--color-text-soft); 
      }
    }

    div.experience-desc {
      page-break-before: avoid;
      page-break-after: auto;

      div.positions {
        page-break-before: avoid;
        display: flex;
        flex-direction: column;
        row-gap: 1.8em;

        div.position {
          page-break-before: auto;

          div.title { font-weight: bold; font-size: 1em; }

          div.from-to {
            display: flex;
            flex-direction: row;
            column-gap: 5px;
            color: var(--color-text-soft);
            font-size: 0.9em;
          }

          div.description { 
            margin-top: 1.5em; 
            page-break-after: auto; 
          }

          div.tech-stack {
            page-break-inside: auto;
            display: grid;
            margin-left: auto;
            margin-right: auto;
            justify-items: center;
            $logoSize: 60px;
            $countColumns: 5;
            $gap: 8px;
            $logoPadding: 8px;
            grid-template-columns: repeat($countColumns, $logoSize);
            width: $logoSize * $countColumns + $gap * ($countColumns - 1);
            column-gap: $gap;
            row-gap: $gap;
            margin-top: 1em;

            img.tech-entry {
              background-color: #fff;
              width: $logoSize;
              height: $logoSize;
              padding: $logoPadding;
              border-radius: 5px;
              display: block;
              overflow: hidden;
              object-fit: contain;
            }
          }

          div.organisations {
            page-break-inside: auto;
            display: grid;
            margin-left: auto;
            margin-right: auto;
            justify-items: center;
            $logoSize: 60px;
            $countColumns: 5;
            $gap: 8px;
            $logoPadding: 8px;
            grid-template-columns: repeat($countColumns, $logoSize);
            width: $logoSize * $countColumns + $gap * ($countColumns - 1);
            column-gap: $gap;
            row-gap: $gap;
            margin-top: 1em;

            img.organisations-entry {
              background-color: #fff;
              width: $logoSize;
              height: $logoSize;
              padding: $logoPadding;
              border-radius: 5px;
              display: block;
              overflow: hidden;
              object-fit: contain;
            }
          }
        }
      }
    }
  }
}

@media print {
  $companyLogoSize: 50px;

  div.experiences {
    row-gap: 1em;

    div.company {
      grid-template-columns: $companyLogoSize 1fr;
      grid-auto-rows: auto;

      div.experience-top {
        height: $companyLogoSize;
        margin-bottom: 1em;
      }

      div.page-break { display: block; page-break-after: always; }

      img.company-logo { width: $companyLogoSize; height: $companyLogoSize; }

      .icon-tile {
        $logoSize: 35px;
        $logoPadding: 4px;

        width: $logoSize;
        height: $logoSize;
        padding: $logoPadding;
      }

      .icon-tile img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }

      div.experience-desc {
        div.positions {
          div.position {
            div.description { margin-top: 1em; }

            div.tech-stack {
              $logoSize: 35px;
              $countColumns: 8;
              $gap: 8px;
              $logoPadding: 4px;
              grid-template-columns: repeat($countColumns, $logoSize);
              width: $logoSize * $countColumns + $gap * ($countColumns - 1);
              column-gap: $gap;
              row-gap: $gap;

              img.tech-entry {
                width: $logoSize;
                height: $logoSize;
                padding: $logoPadding;
                object-fit: contain;
              }
            }

            div.organisations {
              $logoSize: 35px;
              $countColumns: 8;
              $gap: 8px;
              $logoPadding: 4px;
              grid-template-columns: repeat($countColumns, $logoSize);
              width: $logoSize * $countColumns + $gap * ($countColumns - 1);
              column-gap: $gap;
              row-gap: $gap;

              img.organisations-entry {
                width: $logoSize;
                height: $logoSize;
                padding: $logoPadding;
                object-fit: contain;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  $logoSize: 50px;

  div.experiences {
    div.company {
      grid-template-columns: $logoSize 1fr;
      column-gap: 20px;

      img.company-logo { width: $logoSize; height: $logoSize; }
    }

    div.company div.experience-desc {
      div.positions {
        div.position {
          div.tech-stack {
            $logoSize: 60px;
            $countColumns: 3;
            $gap: 8px;
            $logoPadding: 8px;
            grid-template-columns: repeat($countColumns, $logoSize);
            width: $logoSize * $countColumns + $gap * ($countColumns - 1);
          }
          div.organisations {
            $logoSize: 60px;
            $countColumns: 3;
            $gap: 8px;
            $logoPadding: 8px;
            grid-template-columns: repeat($countColumns, $logoSize);
            width: $logoSize * $countColumns + $gap * ($countColumns - 1);
          }
        }
      }
    }
  }
}
</style>
