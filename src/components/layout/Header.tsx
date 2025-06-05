import { useState } from 'react';
import { Button } from '../ui/button';
import { 
  Menu, 
  Search, 
  FileText, 
  BarChart2, 
  Settings, 
  User,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-2xl font-bold text-primary">Talentropy</span>
          <span className="ml-1 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">Enterprise</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/dashboard" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
            <BarChart2 size={18} />
            <span>Dashboard</span>
          </a>
          <a href="/documents" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
            <FileText size={18} />
            <span>Documents</span>
          </a>
          <a href="/search" className="text-muted-foreground hover:text-foreground flex items-center gap-1.5">
            <Search size={18} />
            <span>Search</span>
          </a>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-1.5">
                <span>Workflows</span>
                <ChevronDown size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>HR Workflows</DropdownMenuItem>
              <DropdownMenuItem>Procurement</DropdownMenuItem>
              <DropdownMenuItem>Legal</DropdownMenuItem>
              <DropdownMenuItem>Custom Workflows</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* User and Settings */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Settings size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <User size={20} />
          </Button>
          
          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <a href="/dashboard" className="text-foreground flex items-center gap-2 py-2">
              <BarChart2 size={18} />
              <span>Dashboard</span>
            </a>
            <a href="/documents" className="text-foreground flex items-center gap-2 py-2">
              <FileText size={18} />
              <span>Documents</span>
            </a>
            <a href="/search" className="text-foreground flex items-center gap-2 py-2">
              <Search size={18} />
              <span>Search</span>
            </a>
            <div className="text-foreground py-2 font-medium">Workflows</div>
            <a href="/workflows/hr" className="text-muted-foreground pl-6 py-1">HR Workflows</a>
            <a href="/workflows/procurement" className="text-muted-foreground pl-6 py-1">Procurement</a>
            <a href="/workflows/legal" className="text-muted-foreground pl-6 py-1">Legal</a>
            <a href="/workflows/custom" className="text-muted-foreground pl-6 py-1">Custom Workflows</a>
            <div className="flex items-center justify-between border-t border-border pt-4 mt-2">
              <a href="/settings" className="text-foreground flex items-center gap-2 py-2">
                <Settings size={18} />
                <span>Settings</span>
              </a>
              <a href="/profile" className="text-foreground flex items-center gap-2 py-2">
                <User size={18} />
                <span>Profile</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
