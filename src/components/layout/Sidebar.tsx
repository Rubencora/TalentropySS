import { FileText, Home, Search, Workflow, Settings, Users, Database, BarChart2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

function SidebarItem({ icon, label, href, isActive = false }: SidebarItemProps) {
  return (
    <a 
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        isActive 
          ? "bg-primary/10 text-primary" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {icon}
      {label}
    </a>
  );
}

export function Sidebar() {
  // In a real app, this would be determined by the current route
  const currentPath = window.location.pathname;
  
  return (
    <aside className="w-64 border-r border-border hidden md:block p-4">
      <div className="space-y-1">
        <SidebarItem 
          icon={<Home size={18} />} 
          label="Dashboard" 
          href="/dashboard"
          isActive={currentPath === '/dashboard'} 
        />
        <SidebarItem 
          icon={<FileText size={18} />} 
          label="Documents" 
          href="/documents"
          isActive={currentPath === '/documents'} 
        />
        <SidebarItem 
          icon={<Search size={18} />} 
          label="Search" 
          href="/search"
          isActive={currentPath === '/search'} 
        />
        <SidebarItem 
          icon={<Workflow size={18} />} 
          label="Workflows" 
          href="/workflows"
          isActive={currentPath.startsWith('/workflows')} 
        />
      </div>
      
      <div className="mt-8 pt-4 border-t border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Analytics
        </h3>
        <div className="space-y-1">
          <SidebarItem 
            icon={<BarChart2 size={18} />} 
            label="Reports" 
            href="/reports"
            isActive={currentPath === '/reports'} 
          />
          <SidebarItem 
            icon={<Database size={18} />} 
            label="Data Catalog" 
            href="/data-catalog"
            isActive={currentPath === '/data-catalog'} 
          />
        </div>
      </div>
      
      <div className="mt-8 pt-4 border-t border-border">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
          Administration
        </h3>
        <div className="space-y-1">
          <SidebarItem 
            icon={<Users size={18} />} 
            label="Users & Teams" 
            href="/users"
            isActive={currentPath === '/users'} 
          />
          <SidebarItem 
            icon={<Settings size={18} />} 
            label="Settings" 
            href="/settings"
            isActive={currentPath === '/settings'} 
          />
        </div>
      </div>
    </aside>
  );
}
