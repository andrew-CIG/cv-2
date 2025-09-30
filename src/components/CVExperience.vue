<script setup lang="ts">
import Moz2009 from "@/assets/experiences/2009-mozambique.md";
import MM2011 from "@/assets/experiences/2011-MM.md";
import MM2013 from "@/assets/experiences/2013-MM.md";
import Oakville2015 from "@/assets/experiences/2015-oakville.md";
import FPG2015 from "@/assets/experiences/2015-fpg.md";
import move2019 from "@/assets/experiences/2019-move.md";
import CIG2020 from "@/assets/experiences/2020-cig.md";
import { marked } from "marked";
import { onMounted, onBeforeUnmount } from "vue";

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
        description: mdToHtml(Oakville2015),
        technologies: [
          "dynamicsNav",
          "microsoft",
        ],
      },
      {
        title: "Operations Manager",
        from: "Jan 2013",
        to: "Jan 2015",
        description: mdToHtml(MM2013),
        technologies: [
          "dynamicsNav",
          "microsoft",
        ]
      },
      {
        title: "Analyst",
        from: "May 2011",
        to: "Dec 2013",
        description: mdToHtml(MM2011),
        technologies: [
          "SAP",
          "microsoft",
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

// --- Print helpers: force-open <details> for print, then restore ---
onMounted(() => {
  const beforePrint = () => {
    document.querySelectorAll<HTMLDetailsElement>("details.desc").forEach(d => {
      if (!d.open) {
        d.setAttribute("data-was-closed", "1");
        d.open = true;
      }
    });
  };
  const afterPrint = () => {
    document.querySelectorAll<HTMLDetailsElement>("details.desc[data-was-closed]").forEach(d => {
      d.open = false;
      d.removeAttribute("data-was-closed");
    });
  };

  // Chrome/Edge
  window.addEventListener("beforeprint", beforePrint);
  window.addEventListener("afterprint", afterPrint);

  // Safari/Firefox compatibility via matchMedia
  const mq = window.matchMedia("print");
  const mqHandler = (e: MediaQueryListEvent) => (e.matches ? beforePrint() : afterPrint());
  if (mq.addEventListener) mq.addEventListener("change", mqHandler);
  else if ((mq as any).addListener) (mq as any).addListener(mqHandler);

  // Cleanup
  onBeforeUnmount(() => {
    window.removeEventListener("beforeprint", beforePrint);
    window.removeEventListener("afterprint", afterPrint);
    if (mq.removeEventListener) mq.removeEventListener("change", mqHandler);
    else if ((mq as any).removeListener) (mq as any).removeListener(mqHandler);
  });
});

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
$companyLogoSize: 80px;

div.experiences {
  display: flex;
  flex-direction: column;
  row-gap: 16px;

  div.company {
    display: grid;
    grid-template-columns: $companyLogoSize 1fr;
    grid-auto-rows: minmax(72px, auto);
    column-gap: 24px;

    div.page-break { display: auto; }

    img.company-logo {
      // break-inside: avoid;
      max-width: $companyLogoSize * 1.1;
      height: $companyLogoSize;
      background-color: #fff;
      object-fit: contain;
      padding: 3px;
      border-radius: 3px;
    }

    div.experience-top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: $companyLogoSize;
      // break-before: avoid;

      div.company-name { 
        font-size: 1.2em;
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

    div.line {
      // break-before: avoid;
      // break-after: avoid;
      margin-left: auto;
      margin-right: auto;
      background-color: var(--color-position-line);
      width: 2px;
      height: auto;
    }

    div.experience-desc {
      // break-before: avoid;
      // break-after: auto;

      div.positions {
        // break-before: avoid;
        display: flex;
        flex-direction: column;
        row-gap: 1.8em;

        div.position {
          // break-before: auto;

          div.title { font-weight: bold; font-size: 1em; }

          div.from-to {
            display: flex;
            flex-direction: row;
            column-gap: 5px;
            color: var(--color-text-soft);
            font-size: 0.9em;
          }

          div.intro.markdown { margin-top: 0.5rem; margin-bottom: 0.75rem; }

          details.desc { margin-top: 0.25rem; break-inside: auto; }
            details.desc>summary { cursor: pointer; margin: 0.25rem 0 0.5rem ; color: var(--color-text); }

          div.after-list.markdown { margin: 0.75rem 0 0.75rem }

          details.desc ~ .tech-org-container { display: none; }

          details.desc[open] ~ .tech-org-container {display: block; }

          div.tech-stack {
            // break-inside: avoid;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            $gap: 32px;
            column-gap: $gap;
            row-gap: $gap;
            margin-top: 1em;
            $logoHeight: 40px;

            .tech-logo {
              height: $logoHeight;
              width: auto;
              display: block;
              object-fit: contain;
            }
          }

          div.organisations {
            // break-inside: avoid;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            $gap: 32px;
            column-gap: $gap;
            row-gap: $gap;
            margin-top: 1em;
            $logoHeight: 40px;

            .org-logo {
              height: $logoHeight;
              width: auto;
              display: block;
              object-fit: contain;
            }
          }
        }
      }
    }
  }
}
.page-break { display: none; }

@media print {
  .page-break {
    display: block;
    break-after: page;
    height: 0; margin: 0; padding: 0;
  }

  div.experiences { 
    display: block; 
    break-inside: auto;
    row-gap: 16px;

    div.company{
      column-gap: 20px;
      $companyLogoSize: 40px;
      grid-template-columns: 48px 1fr;
      grid-auto-rows: auto;
      break-inside: auto;
        
      img.company-logo {
        break-inside: avoid; 
        max-width: $companyLogoSize * 1.1;
        height: $companyLogoSize;
        object-fit: contain;
        padding: 3px;
      }
      
      div.experience-top {
        min-height: $companyLogoSize; // or use '0'??
        height: auto;
        align-items: flex-start; 
        break-before: auto !important;
        break-inside: avoid;
      }

      div.line {
        // display: none !important;
        break-before: auto;
        break-inside: auto;
        align-self: stretch;
        overflow: visible;
        margin-left: auto;
        margin-right: auto;
        background-color: var(--color-position-line);
        width: 2px;
        min-height: 0;
        height: auto;
      }

      div.experience-desc { 
        break-before: auto;
        break-inside: auto;
        border-left: 2px solid var(--color-position-line);
        padding-left: 16px; 

        div.positions { 
          // break-before: auto;
          break-inside: auto;

          div.position{
            $gap: 24px;
            $logoHeight: 24px;
            $margin-top: 1em;
            break-inside: auto;

            div.title { break-inside: auto; }
            div.from-to { 
              white-space: nowrap; 
              break-inside: auto;
            }
            div.intro.markdown { 
              // break-before: auto; 
              break-inside: auto; 
            }
            details.desc { 
              // break-before: auto; 
              break-inside: auto; 
            }

            details.desc > summary { display: list-item; }

            details.desc .markdown ul {
              list-style-position: outside;
              padding-left: 1.25em;
              margin: 0.5rem 0;
              // break-before: auto;
              break-inside: auto;
            }
            details.desc .markdown li { 
              margin: 0.2rem 0; 
              // break-before: auto;
              break-inside: auto;
            }
            details.desc .markdown li::marker { color: var(--color-text-soft); }

            details.desc ~ .tech-org-container { display: none; }
            details.desc[open] ~ .tech-org-container { display: block; }

            div.after-list { 
              // break-before: auto;
              break-inside: auto; 
            }

            div.tech-org-container {

              div.tech-stack {
                break-inside: avoid;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                padding-left: 56px;
                align-items: center;      
                column-gap: $gap;
                row-gap: $gap;
                margin-top: $margin-top;

                .tech-logo {
                  height: $logoHeight;
                  width: auto;
                  display: block;
                  object-fit: contain;
                }
              }

              div.organisations {
                break-inside: avoid;
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                padding-left: 56px;
                align-items: center;
                column-gap: $gap;
                row-gap: $gap;
                margin-top: $margin-top;

                .org-logo {
                  height: $logoHeight;
                  width: auto;
                  display: block;
                  object-fit: contain;
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {

  div.company{
    column-gap: 32px;
    $companyLogoSize: 40px;
    grid-template-columns: 1fr;
      
    img.company-logo {
      page-break-inside: avoid; 
      max-width: $companyLogoSize * 1.1;
      height: $companyLogoSize;
      object-fit: contain;
      padding: 3px;
    }

    div.position{
      $gap: 24px;
      $logoHeight: 16px;
      $margin-top: 1em;

      div.tech-stack {
        page-break-inside: avoid;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;      
        column-gap: $gap;
        row-gap: $gap;
        margin-top: $margin-top;

        .tech-logo {
          height: $logoHeight;
          width: auto;
          display: block;
          object-fit: contain;
        }
      }

      div.organisations {
        page-break-inside: avoid;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        column-gap: $gap;
        row-gap: $gap;
        margin-top: $margin-top;

        .org-logo {
          height: $logoHeight;
          width: auto;
          display: block;
          object-fit: contain;
        }
      }
    }
  }
}

</style>
