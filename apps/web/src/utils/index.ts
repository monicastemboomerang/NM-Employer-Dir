import { HomeIcon, InfoIcon, LocationIcon, ProgramsIcon } from "@repo/ui";
import { PlusIcon } from "lucide-react";

export const SITE_INFO = {
  title: "NM STEM Employer Directory",
  longTitle: "New Mexico STEM Employer Directory",
  description: "A directory of STEM programs and services in New Mexico.", // Discover local resources for Science, Technology, Engineering, and Mathematics
};

export const mainLinks: {
  label: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Temp
  icon?: any;
  footer?: boolean;
  // props?: Record<string, any>;
}[] = [
  { label: "Home", url: "/", icon: HomeIcon },
  { label: "About", url: "/about", icon: InfoIcon },
  { label: "Locations", url: "/locations", icon: LocationIcon },
  { label: "Programs", url: "/programs", icon: ProgramsIcon },

  {
    label: "Add Program",
    icon: PlusIcon,
    footer: true,
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdkvgDORXKeEiPs0kvhnPKs5eLnOvfp3sMqdDgnhy0xTwveQw/viewform",
  },
];

export const MAIN_LINKS = mainLinks.map((item) => {
  let isExternal = false;

  if (item.url.startsWith("http")) {
    isExternal = true;
  }
  return {
    ...item,
    props: {
      ...(isExternal ? { target: "_blank" } : {}),
    },
  };
});

export const HeaderLinks = MAIN_LINKS.filter((item) => !item.footer);
export const FooterLinks = MAIN_LINKS.filter((item) => item.footer);

export const ADD_PROGRAM_LINK = MAIN_LINKS.find(
  (item) => item.label === "Add Program"
);
