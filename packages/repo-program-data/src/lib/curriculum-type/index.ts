import type { LucideProps } from "lucide-react";
import {
  BookOpenCheck,
  BriefcaseBusiness,
  FlameKindling,
  Trophy,
} from "lucide-react";
import type React from "react";

type CurriculumType =
  | {
      label?: string;
      display: true;
      icon?: React.ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
      >;
      description?: string;
    }
  | {
      display: false;
    };

type CurriculumTypeKeys =
  | "STEM Curriculums"
  //         | 'Teacher Training Programs'
  //         | 'Mentorship Programs for Educators'
  | "Competitions and Challenges"
  | "After-School STEM Programs"
  //         | 'Club'
  //         | 'Science Fairs/Tech showcases'
  //         | 'Career Exploration virtual content'
  //         | 'Industry Visits and Tours'
  //         | 'Professional Dev/Coaching'
  //         | 'College-led STEM Outreach'
  //         | 'Industry-focused curriculum/training'
  //         | 'Career Exploration Platforms'
  //         | 'Special STEM Schools or Magnet Programs'
  | "Work-based Learning opportunities"
  //         | 'Industry-Sponsored Programs/Internships'
  //         | 'Career Pathways Programs/WBL'
  //         | 'Makerspace'
  //         | 'Career Fairs'
  //         | 'Dual Credit/CTE'
  | "Summer Camps and Bootcamps";

export const CurriculumTypes: {
  [key in CurriculumTypeKeys]: CurriculumType;
} = {
  "STEM Curriculums": {
    display: false,
  },
  "After-School STEM Programs": {
    display: true,
    icon: BookOpenCheck,
    description: "After-school programs that focus on STEM subjects.",
  },
  "Summer Camps and Bootcamps": {
    display: true,
    icon: FlameKindling,
  },
  "Competitions and Challenges": {
    display: true,
    icon: Trophy,
  },
  "Work-based Learning opportunities": {
    display: true,
    icon: BriefcaseBusiness,
  },
};

export const getCurriculumType = (key: CurriculumTypeKeys) => {
  if (key in CurriculumTypes) {
    return CurriculumTypes[key];
  }
};
