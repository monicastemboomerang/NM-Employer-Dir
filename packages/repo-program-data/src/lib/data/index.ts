import response from "../../../data.json";
import type { LabeledData } from "./employer";
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

  getHiringFors(filter = false) {
    const cats = new Map<
      string,
      LabeledData & {
        count: number;
      }
    >();
    this.programs.forEach((program) => {
      program.getHiringForDisplay().forEach((cat) => {
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
    return Array.from(cats.values())
      .sort((a, b) => b.count - a.count)
      .filter((c) => {
        if (filter) {
          return c.display;
        }
        return true;
      });
  }

  getCategories(filter = false) {
    const cats = new Map<
      string,
      LabeledData & {
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
    return Array.from(cats.values())
      .sort((a, b) => b.count - a.count)
      .filter((c) => {
        if (filter) {
          return c.display;
        }
        return true;
      });
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

  filterByHiringFor(hiringForSlug: string) {
    const hiringFor = this.getHiringFors().find(
      (c) => c.slug === hiringForSlug
    );

    if (!hiringFor) {
      return new Programs([]);
    }
    const programs = this.programs
      .filter((program) =>
        program
          .getHiringForDisplay()
          .map((m) => m.slug)
          .includes(hiringFor.slug)
      )
      .map((p) => p.data);
    const title = hiringFor.label;

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

  // filterByCurriculumFocusArea(curriculumFocusAreaSlug: string) {
  //   const curriculumFocusArea = this.getCurriculumFocusAreaDisplay(false).find(
  //     (c) => c.slug === curriculumFocusAreaSlug
  //   );
  //   if (!curriculumFocusArea) {
  //     return new Programs([]);
  //   }
  //   const programs = this.programs
  //     .filter((program) =>
  //       program.curriculumFocusAreas.includes(curriculumFocusArea.label)
  //     )
  //     .map((p) => p.data);
  //   const title = curriculumFocusArea.label;

  //   return new Programs(programs, title);
  // }

  // filterByService(serviceSlug: string) {
  //   const services = this.getCurriculumDisplay(false);
  //   const service = services.find((s) => s.slug === serviceSlug);
  //   if (!service) {
  //     return new Programs([]);
  //   }
  //   const programs = this.programs
  //     .filter((program) => program.curriculumTypes.includes(service.label))
  //     .map((p) => p.data);
  //   const title = service.label;

  //   return new Programs(programs, title);
  // }

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

// export type CurriculumDisplay = ReturnType<Programs["getCurriculumDisplay"]>[0];

export type LocationDisplay = ReturnType<Programs["getLocations"]>[0];

// export type AgeDisplay = ReturnType<Programs["getAgeDisplay"]>[0];
