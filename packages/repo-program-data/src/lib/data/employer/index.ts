import { slugify } from "../../utils/slugify";
import { rawCategoryData, rawHiringForData } from "../raw-data";
import type { ResponseType } from "../types";

const splitter = <T>(data: T, key: keyof T, delimiter = ","): string[] => {
  const o = data[key];
  if (!o) return [];
  if (typeof o === "string") {
    return o.split(delimiter).map((h: string) => h.trim());
  }
  return [];
};

const mapLabel = (labels: string[]) => {
  return labels.map((label) => {
    return {
      label,
      slug: slugify(label),
    };
  });
};

export const mapLabelDisplay = (
  names: string[],
  data: Record<string, LabeledData>,
  filter = false
) => {
  return names.reduce<LabeledData[]>((acc, name) => {
    const slug = slugify(name);
    const slugs = acc.map((a) => a.slug);
    let prevLabel: Partial<LabeledData> = {};
    if (slug in data) {
      prevLabel = data[slug];
      if (prevLabel.parent && prevLabel.parent in data) {
        const parent = mapLabelDisplay([prevLabel.parent], data, filter);
        parent.forEach((p) => {
          if (!slugs.includes(p.slug)) {
            acc.push(p);
          }
        });
      }
      if (filter && prevLabel.display === false) {
        return acc;
      }
    }

    if (!slugs.includes(slug)) {
      acc.push({
        label: name,
        slug,
        icon: "",
        display: true,
        ...prevLabel,
      });
    }

    return acc;
  }, []);
};

export interface LabeledData {
  label: string;
  slug: string;
  icon: string;
  display?: boolean;
  parent?: string;
}

export class Employer {
  data: ResponseType["data"][0];
  name: string;
  location: string | undefined;
  zipCode: string | undefined;
  categories: string[];
  productOrService: string | undefined;
  website: string | undefined;
  hiringFor: string[] | undefined;
  slug: string;
  overview: string | undefined;
  hiringForString: string | undefined;
  locations: { label: string; slug: string }[];
  hiringForDisplay: LabeledData[];
  locationsString: string[];

  constructor(data: ResponseType["data"][0]) {
    this.data = data;
    this.name = data.Employer;
    this.slug = slugify(data.Employer);
    this.location = data.Location;
    this.locations = this.getLocationsDisplay();
    this.locationsString = this.locations.map((l) => l.label);
    this.zipCode = data["Zip Code"];
    this.categories = this.getCategories();
    this.productOrService = data["Product or service"];
    this.overview = this.productOrService;
    this.website = data.Website;
    this.hiringFor = this.getHiringForDisplay(true).map((h) => h.label);
    this.hiringForString = data["Hiring For:"];
    this.hiringForDisplay = this.getHiringForDisplay(true);
  }

  getLocations() {
    return splitter(this.data, "Location", "&");
  }
  getLocationsDisplay() {
    return mapLabel(this.getLocations());
  }

  get locationSlug() {
    return slugify(this.location || "nm");
  }

  // getCategoryDisplay(filter = false): LabeledData[] {
  //   return this.categories
  //     .map((cat) => {
  //       const slug = slugify(cat);
  //       let prevCat: Partial<LabeledData> = {};
  //       if (slug in rawCategoryData) {
  //         prevCat = rawCategoryData[slug as keyof typeof rawCategoryData];
  //       }
  //       return {
  //         label: cat,
  //         slug: slugify(cat),
  //         icon: "",
  //         display: true,
  //         ...prevCat,
  //       };
  //     })
  //     .filter((c) => {
  //       if (filter) {
  //         return c.display;
  //       }
  //       return true;
  //     });
  // }

  getCategoryDisplay(filter = false) {
    return mapLabelDisplay(this.categories, rawCategoryData, filter);
  }

  getCategories() {
    const cats: string[] = [];
    if (this.data["Industry Category"]) {
      cats.push(this.data["Industry Category"]);
    }
    if (this.data["Secondary Category"]) {
      cats.push(this.data["Secondary Category"]);
    }
    return cats;
  }

  getHiringForDisplay(filter = false) {
    return mapLabelDisplay(this.getHiringFor(), rawHiringForData, filter);
  }
  // getHiringForDisplay(filter = false) {
  //   return this.getHiringFor()
  //     .map((h) => {
  //       const slug = slugify(h);
  //       let prevHiringFor: Partial<LabeledData> = {};
  //       if (slug in rawHiringForData) {
  //         prevHiringFor =
  //           rawHiringForData[slug as keyof typeof rawHiringForData];
  //         if (
  //           prevHiringFor.parent &&
  //           prevHiringFor.parent in rawHiringForData
  //         ) {
  //           prevHiringFor =
  //             rawHiringForData[
  //               prevHiringFor.parent as keyof typeof rawHiringForData
  //             ];
  //         }
  //       }
  //       return {
  //         label: h,
  //         slug,
  //         icon: "",
  //         display: true,
  //         ...prevHiringFor,
  //       };
  //     })
  //     .filter((h) => {
  //       if (filter) {
  //         return h.display;
  //       }
  //       return true;
  //     });
  // }

  getHiringFor() {
    const vals =
      this.data["Hiring For:"]?.split(",").map((h) => h.trim()) || [];
    return vals.filter((v) => v);
  }

  get curriculumFocusAreas() {
    return this.getHiringFor();
  }

  get curriculumTypes(): string[] {
    return [];
  }
}

export type CategoryDisplay = ReturnType<Employer["getCategoryDisplay"]>[0];
