import { Search, FileText, BarChart2, Workflow, Zap } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function SearchInterface() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Search</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Advanced Search
          </Button>
          <Button variant="outline" size="sm">
            Saved Searches
          </Button>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search across all documents, workflows, and data..." 
            className="pl-10 py-6"
          />
        </div>
        <Button size="lg">
          Search
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Results</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Documents</h3>
              <Button variant="link" size="sm">
                View All Documents
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Q2 Financial Report.pdf",
                  description: "Quarterly financial statements and analysis",
                  type: "PDF",
                  date: "May 15, 2025",
                  relevance: "92%"
                },
                {
                  title: "Marketing Strategy 2025.pptx",
                  description: "Annual marketing strategy and campaign plans",
                  type: "PPTX",
                  date: "April 28, 2025",
                  relevance: "85%"
                },
                {
                  title: "Customer Feedback Analysis.xlsx",
                  description: "Analysis of customer feedback and satisfaction metrics",
                  type: "XLSX",
                  date: "May 10, 2025",
                  relevance: "78%"
                },
              ].map((doc, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{doc.type}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{doc.relevance}</span>
                    </div>
                    <CardTitle className="text-base">{doc.title}</CardTitle>
                    <CardDescription className="text-xs">{doc.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <div className="flex items-center justify-between w-full text-xs">
                      <span className="text-muted-foreground">{doc.date}</span>
                      <Button variant="ghost" size="sm" className="h-6">View</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Workflows</h3>
              <Button variant="link" size="sm">
                View All Workflows
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Invoice Processing",
                  description: "Extract and validate invoice data for accounts payable",
                  department: "Finance",
                  relevance: "94%"
                },
                {
                  title: "Resume Analysis",
                  description: "Extract candidate information from resumes",
                  department: "HR",
                  relevance: "82%"
                },
              ].map((workflow, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Workflow className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{workflow.department}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{workflow.relevance}</span>
                    </div>
                    <CardTitle className="text-base">{workflow.title}</CardTitle>
                    <CardDescription className="text-xs">{workflow.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button variant="ghost" size="sm" className="h-6">View Workflow</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium">Insights</h3>
              <Button variant="link" size="sm">
                View All Insights
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Revenue Trend Analysis",
                  description: "Analysis of revenue trends across product lines",
                  type: "Chart",
                  relevance: "88%"
                },
                {
                  title: "Customer Sentiment Analysis",
                  description: "Analysis of customer feedback sentiment over time",
                  type: "Report",
                  relevance: "76%"
                },
              ].map((insight, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BarChart2 className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{insight.type}</span>
                      </div>
                      <span className="text-sm font-medium text-primary">{insight.relevance}</span>
                    </div>
                    <CardTitle className="text-base">{insight.title}</CardTitle>
                    <CardDescription className="text-xs">{insight.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="pt-2">
                    <Button variant="ghost" size="sm" className="h-6">View Insight</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Document search results would go here */}
            <Card className="col-span-full p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Enter a search query</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Search across all your documents using natural language. Try queries like "financial reports from Q2" or "marketing presentations about product launch".
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="workflows" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Workflow search results would go here */}
            <Card className="col-span-full p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Enter a search query</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Search across all your workflows using natural language. Try queries like "invoice processing workflows" or "HR onboarding automations".
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Insights search results would go here */}
            <Card className="col-span-full p-8 text-center">
              <div className="flex flex-col items-center justify-center">
                <Zap className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Enter a search query</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Search across all your insights using natural language. Try queries like "revenue trends for last quarter" or "customer sentiment analysis".
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
