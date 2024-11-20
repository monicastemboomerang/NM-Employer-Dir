import { Calculator } from "lucide-react";
import { slugify } from "../../utils/slugify";
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

  constructor(data: ResponseType["data"][0]) {
    this.data = data;
    this.name = data.Employer;
    this.slug = slugify(data.Employer);
    this.location = data.Location;
    this.locations = this.getLocationsDisplay();
    this.zipCode = data["Zip Code"];
    this.categories = this.getCategories();
    this.productOrService = data["Product or service"];
    this.overview = this.productOrService;
    this.website = data.Website;
    this.hiringFor = this.getHiringFor();
    this.hiringForString = data["Hiring For:"];
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

  getCategoryDisplay() {
    return this.categories.map((cat) => {
      return {
        label: cat,
        // display: true,
        slug: slugify(cat),
        icon: Calculator,
      };
    });
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
