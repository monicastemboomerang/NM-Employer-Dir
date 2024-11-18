import { HomeIcon, LocationIcon, ProgramsIcon } from "@repo/ui";
import { PlusIcon } from "lucide-react";

export const SITE_INFO = {
  title: "NM STEM",
  longTitle: "New Mexico STEM Services Directory",
  description: "A directory of STEM programs and services in New Mexico.", // Discover local resources for Science, Technology, Engineering, and Mathematics
};

export const mainLinks = [
  { label: "Home", url: "/", icon: HomeIcon },
  { label: "Locations", url: "/locations", icon: LocationIcon },
  { label: "Programs", url: "/programs", icon: ProgramsIcon },
  // { label: "About", url: "/about", icon: InfoIcon },
  {
    label: "Add Program",
    icon: PlusIcon,
    footer: true,
    url: "https://docs.google.com/forms/d/e/1FAIpQLSdkvgDORXKeEiPs0kvhnPKs5eLnOvfp3sMqdDgnhy0xTwveQw/viewform",
  },
  {
    label: "Contact",
    url: "mailto:contact-project+alexwine36-nm-stem-services-62915309-issue-@incoming.gitlab.com",
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
