import { Programs } from "@repo/program-data";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  NavBar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  sidebarMenuButtonVariants,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@repo/ui";
import { ChevronUpIcon } from "lucide-react";
import type { ReactNode } from "react";
import { FooterLinks, HeaderLinks } from "../../utils";

export function AppSidebar({ children }: { children: ReactNode }) {
  const items = HeaderLinks.filter((item) => item.icon);
  const footerItems = FooterLinks.filter((item) => item.icon);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel />
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.url}>
                    <a
                      className={sidebarMenuButtonVariants({
                        variant: "default",
                        size: "lg",
                      })}
                      data-sidebar="menu-button"
                      href={item.url}
                    >
                      {item.icon ? <item.icon /> : null}

                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                  Locations
                  <ChevronUpIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {Programs.instance
                      .getLocations()
                      .filter((_, idx) => idx < 7)
                      .map((location) => (
                        <SidebarMenuItem key={location.slug}>
                          <SidebarMenuButton
                            href={`/locations/${location.slug}`}
                          >
                            {location.label}
                            <SidebarMenuBadge>
                              {location.count}
                            </SidebarMenuBadge>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
          <SidebarMenu>
            {footerItems.map((item) => (
              <SidebarMenuItem key={item.url}>
                <SidebarMenuButton href={item.url} {...item.props}>
                  {item.icon ? <item.icon /> : null}
                  {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <main
        className="min-h-screen"
        style={{
          width: "calc(100vw - var(--sidebar-current-width))",
        }}
      >
        <NavBar logo="/favicon.svg" navItems={[]} />

        {children}
      </main>
    </SidebarProvider>
  );
}
