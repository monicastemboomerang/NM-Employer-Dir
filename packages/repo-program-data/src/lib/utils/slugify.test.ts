import { slugify } from "./slugify";

describe("Slugify", () => {
  test("should slugify string", () => {
    const res = slugify("Hello World");
    expect(res).toBe("hello-world");
  });
  test("should slugify weird location", () => {
    const res = slugify("Las Cruces/Dona Ana County");

    expect(res).toBe("las-crucesdona-ana-county");
  });
});
