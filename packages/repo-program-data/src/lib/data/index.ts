import { Calculator } from "lucide-react";
import response from "../../../data.json";
import { getCurriculumFocusAreaType } from "../curriculum-focus-area";
import { getCurriculumType } from "../curriculum-type";
import { slugify } from "../utils/slugify";

type ResponseType = typeof response;

export class Program {
  data: ResponseType["data"][0];
  location: string;
  programSupportMechanisms: string[];
  ages: string[];
  by: string | undefined;
  website?: string;
  curriculumFocusAreas: string[];
  curriculumTypes: string[];
  name: string;
  locationSlug: string;
  overview: string | undefined;
  slug: string;

  constructor(data: ResponseType["data"][0]) {
    this.data = data;
    this.name = this.get_name();
    this.location = this.get_location();
    this.programSupportMechanisms = this.get_programSupportMechanisms();
    this.ages = this.get_ages();
    this.by = this.get_by();
    this.website = this.get_website();
    this.curriculumFocusAreas = this.get_curriculumFocusAreas();
    this.curriculumTypes = this.get_curriculumTypes();
    this.locationSlug = this.get_locationSlug();
    this.overview = this.get_overview();
    this.slug = this.get_slug();
  }

  private get_slug() {
    return slugify(this.name);
  }

  private get_locationSlug() {
    return slugify(this.location);
  }

  private get_location() {
    return this.data.Location;
  }

  private remove_empty_strings(arr: string[]) {
    return arr.filter((a) => a !== "");
  }

  private get_programSupportMechanisms() {
    return this.remove_empty_strings(
      this.data["Program Support Mechanisms"].split(", ")
    );
  }

  private get_ages() {
    return this.remove_empty_strings(this.data.Age.split(", "));
  }

  private get_by() {
    const by = this.data["Parent Organization"];
    if (by) {
      return by;
    }
  }

  private get_curriculumTypes() {
    return this.remove_empty_strings(
      this.data["Type of Curriculum"].split(", ")
    );
  }

  private get_curriculumFocusAreas() {
    return this.remove_empty_strings(
      this.data["Curriculum Focus Area "].split(", ")
    );
  }

  private get_name() {
    return this.data["Program Name"];
  }

  private get_overview() {
    const overview = this.data.Overview;
    if (overview) {
      return overview;
    }
  }

  private get_website() {
    const web = this.data.Website;
    if (web?.startsWith("http")) {
      return web;
    }
  }
}

export class Programs {
  programs: Program[];
  title: string | undefined;
  constructor(data: ResponseType["data"], title?: string) {
    const programs = data.map((d) => {
      return new Program(d);
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

  get locations() {
    const locs = new Set<string>();

    this.programs.forEach((program) => {
      if (program.location) {
        locs.add(program.location);
      }
    });

    return [...locs]
      .map((loc) => {
        const matches = this.programs.filter(
          (program) => program.location === loc
        );
        return {
          name: loc,
          slug: slugify(loc),
          count: matches.length,
        };
      })
      .sort((a, b) => b.count - a.count);
  }

  get programSupportMechanisms() {
    const mechs = new Set<string>();

    this.programs.forEach((program) => {
      program.programSupportMechanisms.forEach((m) => {
        if (m) {
          mechs.add(m);
        }
      });
    });

    return [...mechs];
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

  getCurriculumFocusAreaDisplay(filter = true) {
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- It's fine for now
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any -- It's fine for now
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

  get ages() {
    const mechs = new Set<string>();

    this.programs.forEach((program) => {
      program.ages.forEach((m) => {
        if (m) {
          mechs.add(m);
        }
      });
    });

    return [...mechs];
  }

  getAgeDisplay() {
    // return this.ages.map((age) => {
    //   return {
    //     label: age,
    //     display: true,
    //     slug: slugify(age),
    //   };
    // });
    const ages = new Map<string, number>();
    this.programs.forEach((program) => {
      program.ages.forEach((age) => {
        const count = ages.get(age);
        if (count) {
          ages.set(age, count + 1);
        } else {
          ages.set(age, 1);
        }
      });
    });

    return Array.from(ages, ([key, value]) => {
      let label = key;
      if (key === "HS") {
        label = "High School";
      }
      return {
        label,
        key,
        display: true,
        count: value,
        slug: slugify(key),
      };
    }).sort((a, b) => b.count - a.count);
  }

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

  filterByAge(ageSlug: string) {
    const age = this.getAgeDisplay().find((a) => a.slug === ageSlug);

    if (!age) {
      return new Programs([]);
    }
    const programs = this.programs
      .filter((program) => program.ages.includes(age.key))
      .map((p) => p.data);
    const title = this.ages.find((a) => a === ageSlug);

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
      .filter((program) => program.locationSlug === locationSlug)
      .map((p) => p.data);
    const title = this.locations.find((l) => {
      return l.slug === locationSlug;
    });

    return new Programs(programs, title?.name);
  }

  getProgram(slug: string) {
    return this.programs.find((p) => p.slug === slug);
  }
}

export type CurriculumDisplay = ReturnType<Programs["getCurriculumDisplay"]>[0];

export type LocationDisplay = Programs["locations"][0];

export type AgeDisplay = ReturnType<Programs["getAgeDisplay"]>[0];
