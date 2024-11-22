import { mapLabelDisplay } from ".";

describe("Employer", () => {
  test("should add parent if present", () => {
    const data = {
      sample: {
        parent: "parent",
        label: "sample",
        slug: "sample",
        icon: "",
        display: true,
      },
      parent: {
        label: "parent",
        slug: "parent",
        icon: "",
        display: true,
      },
    };
    const res = mapLabelDisplay(["sample"], data);

    expect(res).toEqual([
      {
        label: "parent",
        slug: "parent",
        icon: "",
        display: true,
      },
      {
        label: "sample",
        slug: "sample",
        icon: "",
        display: true,
        parent: "parent",
      },
    ]);

    const res2 = mapLabelDisplay(["parent"], data);
    expect(res2).toEqual([
      {
        label: "parent",
        slug: "parent",
        icon: "",
        display: true,
      },
    ]);
  });
  test("should filter when display is false", () => {
    const data = {
      sample: {
        label: "sample",
        slug: "sample",
        icon: "",
        display: false,
      },
    };
    const res = mapLabelDisplay(["sample"], data, true);
    expect(res).toEqual([]);
  });

  test("should return initialized object if not found", () => {
    const data = {
      parent: {
        label: "parent",
        slug: "parent",
        icon: "",
        display: true,
      },
    };
    const res = mapLabelDisplay(["sample"], data);
    expect(res).toEqual([
      {
        label: "sample",
        slug: "sample",
        icon: "",
        display: true,
      },
    ]);
  });
  test("should return only one copy of labeled data", () => {
    const data = {
      parent: {
        label: "parent",
        slug: "parent",
        icon: "",
        display: true,
      },
      sample: {
        label: "sample",
        slug: "sample",
        icon: "",
        display: false,
        parent: "parent",
      },
    };
    const res = mapLabelDisplay(
      ["sample", "parent", "parent", "sample"],
      data,
      true
    );
    expect(res).toEqual([
      {
        label: "parent",
        slug: "parent",
        icon: "",
        display: true,
      },
    ]);
  });
});
