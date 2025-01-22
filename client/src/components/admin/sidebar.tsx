import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Building2, LayoutDashboard, MessageSquare } from "lucide-react";

const links = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/hotels", icon: Building2, label: "Hoteles" },
  { href: "/admin/reviews", icon: MessageSquare, label: "Reseñas" },
];

export function AdminSidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 border-r h-screen p-4">
      <div className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href}>
              <Button
                variant={location === link.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  location === link.href && "bg-secondary"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
