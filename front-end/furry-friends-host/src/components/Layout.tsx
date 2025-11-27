import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { PawPrint, LogOut, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="bg-primary/10 p-2 rounded-full">
                <PawPrint className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold">AnimalHotels</span>
            </Link>

            <nav className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button
                  variant={location.pathname === "/dashboard" ? "default" : "ghost"}
                  size="sm"
                  className="gap-2"
                >
                  <Home className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>
              
              <div className="flex items-center gap-3 pl-4 border-l">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user?.name}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={logout}
                  className="gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
