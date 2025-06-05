import { Search, Filter, ArrowUpDown, ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function WorkflowManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Workflows</h2>
        <Button>
          Create Workflow
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search workflows..." className="w-full" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Department
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Departments</DropdownMenuItem>
              <DropdownMenuItem>HR</DropdownMenuItem>
              <DropdownMenuItem>Finance</DropdownMenuItem>
              <DropdownMenuItem>Legal</DropdownMenuItem>
              <DropdownMenuItem>Operations</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Workflows</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Resume Processing",
                description: "Automatically extract candidate information from resumes",
                department: "HR",
                status: "Active",
                lastRun: "10 minutes ago",
                documents: 42,
                automations: 3
              },
              {
                title: "Invoice Processing",
                description: "Extract and validate invoice data for accounts payable",
                department: "Finance",
                status: "Active",
                lastRun: "1 hour ago",
                documents: 156,
                automations: 5
              },
              {
                title: "Contract Analysis",
                description: "Extract key terms and clauses from legal contracts",
                department: "Legal",
                status: "Active",
                lastRun: "3 hours ago",
                documents: 78,
                automations: 4
              },
              {
                title: "Customer Feedback Analysis",
                description: "Analyze customer feedback for sentiment and key issues",
                department: "Operations",
                status: "Active",
                lastRun: "Yesterday",
                documents: 215,
                automations: 6
              },
              {
                title: "Compliance Document Review",
                description: "Scan documents for compliance issues and flag for review",
                department: "Legal",
                status: "Active",
                lastRun: "2 days ago",
                documents: 63,
                automations: 4
              },
            ].map((workflow, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge>{workflow.department}</Badge>
                    <Badge variant={workflow.status === "Active" ? "default" : "outline"}>
                      {workflow.status}
                    </Badge>
                  </div>
                  <CardTitle>{workflow.title}</CardTitle>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Documents</p>
                      <p className="font-medium">{workflow.documents}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Automations</p>
                      <p className="font-medium">{workflow.automations}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Last Run</p>
                      <p className="font-medium">{workflow.lastRun}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button size="sm">Run Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="templates" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Employee Onboarding",
                description: "Process new employee documents and extract key information",
                department: "HR",
                complexity: "Medium",
                popularity: "High"
              },
              {
                title: "Vendor Contract Review",
                description: "Analyze vendor contracts for key terms and obligations",
                department: "Legal",
                complexity: "High",
                popularity: "Medium"
              },
              {
                title: "Expense Report Processing",
                description: "Extract and categorize expenses from reports",
                department: "Finance",
                complexity: "Low",
                popularity: "High"
              },
            ].map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{template.department}</Badge>
                    <div className="flex items-center gap-1">
                      <Badge variant="secondary">{template.complexity}</Badge>
                      <Badge variant="secondary">{template.popularity}</Badge>
                    </div>
                  </div>
                  <CardTitle>{template.title}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">Preview</Button>
                  <Button size="sm">Use Template</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="archived" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Q1 Financial Review",
                description: "Process Q1 financial documents and generate reports",
                department: "Finance",
                archivedDate: "April 15, 2025",
                documents: 87
              },
              {
                title: "Annual Compliance Audit",
                description: "Review documents for annual compliance audit",
                department: "Legal",
                archivedDate: "March 30, 2025",
                documents: 142
              },
            ].map((workflow, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{workflow.department}</Badge>
                    <Badge variant="secondary">Archived</Badge>
                  </div>
                  <CardTitle>{workflow.title}</CardTitle>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Documents</p>
                      <p className="font-medium">{workflow.documents}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Archived Date</p>
                      <p className="font-medium">{workflow.archivedDate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">View</Button>
                  <Button variant="outline" size="sm">Restore</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
