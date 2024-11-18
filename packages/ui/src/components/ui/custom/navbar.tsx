import { cn } from "../../../utils";
import { ModeToggle } from "../mode-toggle";
import { SidebarTrigger } from "../sidebar";
import { Logo } from "./logo";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  logo: string;
  navItems: NavItem[];
  displayMode?: boolean;
  sticky?: boolean;
}

const BREAKPOINT = "sm";

export function NavBar({
  navItems,
  sticky = false,
  displayMode = false,
}: NavbarProps) {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        "bg-sidebar shadow-md dark:shadow-sm dark:shadow-gray-700",
        sticky && "sticky top-0"
      )}
    >
      <div
      // className={cn("max-w-7xl mx-auto px-4 lg:px-8", `${BREAKPOINT}:px-6`)}
      >
        <div className="flex items-center w-auto">
          <SidebarTrigger />
          <div
            // className="flex justify-between h-16 w-full"
            className={cn(
              "flex justify-between h-16 w-full",
              "max-w-7xl mx-auto px-4 lg:px-8",
              `${BREAKPOINT}:px-6`
            )}
          >
            <div className="flex items-center">
              {/* <img alt="Logo" className="h-8 w-auto" src={logo} /> */}
              <Logo />
              <div
                className={cn(
                  "hidden",
                  //   "sm:flex",
                  //   "sm:items-center",

                  `sm:flex sm:items-center`
                )}
              >
                {navItems.map((item) => (
                  <a
                    className="text-foreground hover:text-accent-foreground px-3 py-2 rounded-md text-sm font-medium"
                    href={item.href}
                    key={item.label}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center">
              {displayMode ? <ModeToggle /> : null}

              {/* <div className={cn(`sm:hidden`, "pl-3")}>
                <div className={`flex h-full justify-center items-center `}>
                  <Sheet
                    onOpenChange={setIsMobileMenuOpen}
                    open={isMobileMenuOpen}
                  >
                    <SheetTrigger asChild>
                      <Button size="icon" variant="outline">
                        <MenuIcon className="h-6 w-6" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                      <div className="flex flex-col space-y-4 mt-4">
                        {navItems.map((item) => (
                          <a
                            className="text-foreground hover:text-accent-foreground px-3 py-2 rounded-md text-base font-medium"
                            href={item.href}
                            key={item.label}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
