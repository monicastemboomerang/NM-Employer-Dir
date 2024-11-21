import { CurriculumFocusAreas } from "../curriculum-focus-area";
import { CurriculumTypes } from "../curriculum-type";
import { Programs } from ".";

describe("Data", () => {
  test("should handle data", () => {
    const programs = Programs.instance;

    // console.log(programs.locations);
    // console.log(programs.programSupportMechanisms);
    // console.log(programs.ages);
    // console.log(programs.getCurriculumDisplay(false));
    // console.log(programs.curriculumFocusAreas);

    // console.log(programs.websites);
    expect(programs.programs.length).toBeGreaterThan(100);
    expect(programs.ages).toContain("Pre-K");
  });

  test("should check for focus areas", () => {
    const programs = Programs.instance;

    const focusAreas = Object.keys(CurriculumFocusAreas);
    focusAreas.forEach((area) => {
      expect(programs.curriculumFocusAreas).toContain(area);
    });
  });

  test("should check for curriculum types", () => {
    const programs = Programs.instance;

    const curriculumTypes = programs.curriculumTypes;
    Object.keys(CurriculumTypes).forEach((cType) => {
      expect(curriculumTypes).toContain(cType);
    });
  });
});
