import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/assets/icons";
import { siteConfig } from "@/data/site";
import { Cross, Menu } from "@supafox/icons";
import { AnimatePresence, motion } from "motion/react";

import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function MainNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background">
      <div className="flex justify-between container items-center">
        <div className="flex space-x-23 h-16 items-center">
          <Link
            href="/"
            className="hover:cursor-pointer hover:text-muted-foreground"
          >
            <div className="flex space-x-1.5 items-center">
              <Icons.logo className="size-6 text-primary" />
              <span
                className={`text-heading-20 ${pathname === "/" ? "underline decoration-primary decoration-[0.2rem]" : ""}`}
              >
                {siteConfig.name}
              </span>
            </div>
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-button-14">
              {siteConfig.mainNav.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`hover:text-muted-foreground transition-colors ${
                        isActive
                          ? "underline decoration-primary decoration-[0.2rem]"
                          : ""
                      }`}
                    >
                      {link.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <Cross className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 0, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "100vh" }}
            exit={{ opacity: 0, y: 0, height: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            style={{ animationDuration: "var(--animation-duration, 0.3s)" }}
            className="md:hidden bg-background fixed top-16 left-0 right-0 overflow-hidden z-40"
          >
            <nav className="mt-8 container">
              <ul className="space-y-8">
                {siteConfig.mainNav.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMobileMenu}
                        className={`text-button-16 transition-colors hover:text-muted-foreground ${
                          isActive
                            ? "underline decoration-primary decoration-[0.2rem] "
                            : ""
                        }`}
                      >
                        {link.title}
                      </Link>
                    </li>
                  );
                })}
                <Separator />
                <ThemeToggle />
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
