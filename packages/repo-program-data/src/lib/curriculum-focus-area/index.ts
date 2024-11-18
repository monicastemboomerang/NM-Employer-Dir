import {
  BookOpenCheck,
  Bot,
  BrainCircuit,
  Calculator,
  Cpu,
  FileCode,
  Laptop,
  Microscope,
  Omega,
  Rocket,
  type LucideProps,
} from "lucide-react";

type CurriculumFocusArea =
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

type CurriculumFocusAreaKeys =
  | "STEM"
  | "Math"
  | "Technology"
  | "AI"
  | "Coding/CS"
  | "Space"
  | "Biomedical/ Laboratory Research"
  | "Computer Science"
  | "Engineering"
  | "Healthcare"
  | "Science"
  | "Robotics"
  | "Physics"
  | "Health";

export const CurriculumFocusAreas: {
  [key in CurriculumFocusAreaKeys]: CurriculumFocusArea;
} = {
  STEM: {
    display: true,
    icon: Omega,
    description: "STEM Curriculums",
  },
  Math: {
    display: true,
    icon: Calculator,
    description: "Math Curriculums",
  },
  Technology: {
    display: true,
    icon: Cpu,
    description: "Technology Curriculums",
  },
  AI: {
    display: true,
    icon: BrainCircuit,
    description: "AI Curriculums",
  },
  "Coding/CS": {
    display: true,
    icon: FileCode,
    description: "Coding/CS Curriculums",
  },
  Space: {
    display: true,
    icon: Rocket,
    description: "Space Curriculums",
  },
  "Biomedical/ Laboratory Research": {
    display: true,
    icon: BookOpenCheck,
    description: "Biomedical/ Laboratory Research Curriculums",
  },
  "Computer Science": {
    display: true,
    icon: Laptop,
    description: "Computer Science Curriculums",
  },
  Engineering: {
    display: true,
    icon: BookOpenCheck,
    description: "Engineering Curriculums",
  },
  Healthcare: {
    display: true,
    icon: BookOpenCheck,
    description: "Healthcare Curriculums",
  },
  Science: {
    display: true,
    icon: Microscope,
    description: "Science Curriculums",
  },
  Robotics: {
    display: true,
    icon: Bot,
    description: "Robotics Curriculums",
  },
  Physics: {
    display: true,
    icon: BookOpenCheck,
    description: "Physics Curriculums",
  },
  Health: {
    display: true,
    icon: BookOpenCheck,
    description: "Health Curriculums",
  },
};

export const getCurriculumFocusAreaType = (key: CurriculumFocusAreaKeys) => {
  if (key in CurriculumFocusAreas) {
    return CurriculumFocusAreas[key];
  }
};
