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
    // expect(programs.ages).toContain("Pre-K");
    expect(programs.getLocations().map((loc) => loc.label)).toContain(
      "Albuquerque"
    );
  });
});
