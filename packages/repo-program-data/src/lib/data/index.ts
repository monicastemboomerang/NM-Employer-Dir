import { Calculator } from "lucide-react";
import response from "../../../data.json";
import { getCurriculumFocusAreaType } from "../curriculum-focus-area";
import { getCurriculumType } from "../curriculum-type";
import { slugify } from "../utils/slugify";
import type { CategoryDisplay } from "./employer";
import { Employer } from "./employer";
import type { ResponseType } from "./types";

export class Programs {
  programs: Employer[];
  title: string | undefined;
  constructor(data: ResponseType["data"], title?: string) {
    const programs = data.map((d) => {
      return new Employer(d);
    });

    this.programs = programs;

    this.title = title;
  }

  static get instance() {
    return new Programs(response.data);
  }

  get websites() {
    const websites: string[] = [];

    this.programs.forEach((p) => {
      if (p.website) {
        websites.push(p.website);
      }
    });
    return websites;
  }

  // get locations() {
  //   const locs = new Set<string>();

  //   this.programs.forEach((program) => {
  //     if (program.location) {
  //       locs.add(program.location);
  //     }
  //   });

  //   return [...locs]
  //     .map((loc) => {
  //       const matches = this.programs.filter(
  //         (program) => program.location === loc
  //       );
  //       return {
  //         name: loc,
  //         slug: slugify(loc),
  //         count: matches.length,
  //       };
  //     })
  //     .sort((a, b) => b.count - a.count);
  // }

  getLocations() {
    const locs = new Map<
      string,
      Employer["locations"][0] & { count: number }
    >();

    this.programs.forEach((program) => {
      program.locations.forEach((loc) => {
        const obj = locs.get(loc.label);
        if (obj) {
          locs.set(loc.label, {
            ...obj,
            count: obj.count + 1,
          });
        } else {
          locs.set(loc.label, {
            ...loc,
            count: 1,
          });
        }
      });
    });
    return Array.from(locs.values()).sort((a, b) => b.count - a.count);
  }

  get curriculumFocusAreas() {
    const mechs = new Set<string>();

    this.programs.forEach((program) => {
      program.curriculumFocusAreas.forEach((m) => {
        if (m) {
          mechs.add(m);
        }
      });
    });

    return [...mechs];
  }

  get curriculumTypes() {
    const mechs = new Set<string>();

    this.programs.forEach((program) => {
      program.curriculumTypes.forEach((m) => {
        if (m) {
          mechs.add(m);
        }
      });
    });

    return [...mechs];
  }

  getCurriculumFocusAreaDisplay(filter = false) {
    const curriculums = new Map<string, number>();
    this.programs.forEach((program) => {
      program.curriculumFocusAreas.forEach((curriculum) => {
        const count = curriculums.get(curriculum);
        if (count) {
          curriculums.set(curriculum, count + 1);
        } else {
          curriculums.set(curriculum, 1);
        }
      });
    });
    return Array.from(curriculums, ([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- It's fine for now
      const cType = getCurriculumFocusAreaType(key as any);

      return {
        label: key,
        display: false,
        count: value,
        icon: Calculator,
        description: "",
        slug: slugify(key),
        ...cType,
      };
    })
      .filter((c) => {
        if (filter) {
          return c.display;
        }
        return true;
      })
      .sort((a, b) => {
        return b.count - a.count;
      });

    // return curriculums;
  }

  getCurriculumDisplay(filter = true) {
    const curriculums = new Map<string, number>();
    this.programs.forEach((program) => {
      program.curriculumTypes.forEach((curriculum) => {
        const count = curriculums.get(curriculum);
        if (count) {
          curriculums.set(curriculum, count + 1);
        } else {
          curriculums.set(curriculum, 1);
        }
      });
    });
    return Array.from(curriculums, ([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- It's fine for now
      const cType = getCurriculumType(key as any);

      return {
        label: key,
        display: false,
        count: value,
        icon: Calculator,
        description: "",
        slug: slugify(key),
        ...cType,
      };
    })
      .filter((c) => {
        if (filter) {
          return c.display;
        }
        return true;
      })
      .sort((a, b) => {
        return b.count - a.count;
      });

    // return curriculums;
  }

  getCategories() {
    const cats = new Map<
      string,
      CategoryDisplay & {
        count: number;
      }
    >();
    this.programs.forEach((program) => {
      program.getCategoryDisplay().forEach((cat) => {
        const obj = cats.get(cat.label);
        if (obj) {
          cats.set(cat.label, {
            ...obj,
            count: obj.count + 1,
          });
        } else {
          cats.set(cat.label, {
            ...cat,
            count: 1,
          });
        }
      });
    });
    return Array.from(cats.values()).sort((a, b) => b.count - a.count);
  }

  filterByCategory(categorySlug: string) {
    const category = this.getCategories().find((c) => c.slug === categorySlug);

    if (!category) {
      return new Programs([]);
    }
    const programs = this.programs
      .filter((program) => program.categories.includes(category.label))
      .map((p) => p.data);
    const title = category.label;

    return new Programs(programs, title);
  }

  // filterByAge(ageSlug: string) {
  //   const age = this.getAgeDisplay().find((a) => a.slug === ageSlug);

  //   if (!age) {
  //     return new Programs([]);
  //   }
  //   const programs = this.programs
  //     .filter((program) => program.ages.includes(age.key))
  //     .map((p) => p.data);
  //   const title = this.ages.find((a) => a === ageSlug);

  //   return new Programs(programs, title);
  // }

  filterByCurriculumFocusArea(curriculumFocusAreaSlug: string) {
    const curriculumFocusArea = this.getCurriculumFocusAreaDisplay(false).find(
      (c) => c.slug === curriculumFocusAreaSlug
    );
    if (!curriculumFocusArea) {
      return new Programs([]);
    }
    const programs = this.programs
      .filter((program) =>
        program.curriculumFocusAreas.includes(curriculumFocusArea.label)
      )
      .map((p) => p.data);
    const title = curriculumFocusArea.label;

    return new Programs(programs, title);
  }

  filterByService(serviceSlug: string) {
    const services = this.getCurriculumDisplay(false);
    const service = services.find((s) => s.slug === serviceSlug);
    if (!service) {
      return new Programs([]);
    }
    const programs = this.programs
      .filter((program) => program.curriculumTypes.includes(service.label))
      .map((p) => p.data);
    const title = service.label;

    return new Programs(programs, title);
  }

  filterByLocation(locationSlug: string) {
    const programs = this.programs
      .filter((program) =>
        program.locations.map((l) => l.slug).includes(locationSlug)
      )
      .map((p) => p.data);
    const title = this.getLocations().find((l) => {
      return l.slug === locationSlug;
    });

    return new Programs(programs, title?.label);
  }

  getProgram(slug: string) {
    return this.programs.find((p) => p.slug === slug);
  }
}

export type CurriculumDisplay = ReturnType<Programs["getCurriculumDisplay"]>[0];

export type LocationDisplay = ReturnType<Programs["getLocations"]>[0];

// export type AgeDisplay = ReturnType<Programs["getAgeDisplay"]>[0];
