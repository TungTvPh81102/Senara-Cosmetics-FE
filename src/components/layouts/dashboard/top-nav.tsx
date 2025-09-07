import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type TopNavProps = React.HTMLAttributes<HTMLElement> & {
  links: {
    title: string;
    href: string;
    disabled?: boolean;
  }[];
};

export function TopNav({ className, links, ...props }: TopNavProps) {
  const pathname = usePathname();

  return (
    <>
      <div className="lg:hidden">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="outline" className="md:size-7">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="start">
            {links.map(({ title, href, disabled }) => {
              const isActive = pathname === href;
              return (
                <DropdownMenuItem key={`${title}-${href}`} asChild>
                  <Link
                    href={href}
                    className={!isActive ? "text-muted-foreground" : ""}
                    {...(disabled && { "aria-disabled": "true", tabIndex: -1 })}
                    style={disabled ? { pointerEvents: "none", opacity: 0.5 } : {}}
                  >
                    {title}
                  </Link>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav
        className={cn("hidden items-center space-x-4 lg:flex lg:space-x-4 xl:space-x-6", className)}
        {...props}
      >
        {links.map(({ title, href, disabled }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={`${title}-${href}`}
              href={href}
              className={`hover:text-primary text-sm font-medium transition-colors ${
                isActive ? "" : "text-muted-foreground"
              } ${disabled ? "pointer-events-none opacity-50" : ""}`}
              {...(disabled && { "aria-disabled": "true", tabIndex: -1 })}
            >
              {title}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
