"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const DesktopNav = ({ className }: Props) => {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList className="flex items-center gap-4">
        <NavItem href="/">Home</NavItem>
        <NavItem href="/collections">Collections</NavItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

interface NavLinkProps {
  children: React.ReactNode;
  href: string;
}

const NavItem = ({ children, href }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenuItem>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          className={cn(
            navigationMenuTriggerStyle(),
            isActive && "bg-accent text-accent-foreground",
          )}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
};
