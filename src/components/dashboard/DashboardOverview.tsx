import { FileText, FileUp, Search, BarChart2, Clock } from 'lucide-react';
import { DashboardCard } from './DashboardCard';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Export
          </Button>
          <Button size="sm">
            New Upload
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Total Documents"
          value="1,248"
          trend={{ value: 12, isPositive: true }}
          icon={<FileText className="text-primary" size={24} />}
        />
        <DashboardCard
          title="Processed Today"
          value="42"
          trend={{ value: 8, isPositive: true }}
          icon={<FileUp className="text-primary" size={24} />}
        />
        <DashboardCard
          title="Search Queries"
          value="156"
          trend={{ value: 5, isPositive: true }}
          icon={<Search className="text-primary" size={24} />}
        />
        <DashboardCard
          title="Active Workflows"
          value="7"
          trend={{ value: 2, isPositive: true }}
          icon={<BarChart2 className="text-primary" size={24} />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { 
                title: "HR Onboarding Documents", 
                time: "10 minutes ago",
                description: "12 files processed and classified" 
              },
              { 
                title: "Legal Contract Analysis", 
                time: "1 hour ago",
                description: "Contract terms extracted and summarized" 
              },
              { 
                title: "Financial Reports Q2", 
                time: "3 hours ago",
                description: "Data tables extracted and normalized" 
              },
              { 
                title: "Customer Feedback Analysis", 
                time: "Yesterday",
                description: "Sentiment analysis completed" 
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-0.5">
                  <Clock size={16} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{activity.title}</p>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-card rounded-lg border border-border p-6">
          <h3 className="text-lg font-medium mb-4">System Status</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Storage Usage</span>
                <span className="text-sm text-muted-foreground">68%</span>
              </div>
              <Progress value={68} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Processing Capacity</span>
                <span className="text-sm text-muted-foreground">42%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">API Usage</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Model Training</span>
                <span className="text-sm text-muted-foreground">23%</span>
              </div>
              <Progress value={23} className="h-2" />
            </div>
            
            <div className="pt-2 mt-2 border-t border-border">
              <h4 className="text-sm font-medium mb-2">Active Integrations</h4>
              <div className="grid grid-cols-2 gap-2">
                {["Supabase", "OpenAI", "Microsoft 365", "Google Workspace"].map((integration, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">{integration}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
