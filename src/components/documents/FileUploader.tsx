import { useState } from 'react';
import { Upload, FileText, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function FileUploader() {
  const [activeTab, setActiveTab] = useState('upload');
  const [dragActive, setDragActive] = useState(false);
  
  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // In a real app, this would handle the files
      console.log('Files dropped:', e.dataTransfer.files);
    }
  };
  
  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, this would handle the files
      console.log('Files selected:', e.target.files);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Upload Documents</h2>
        <Button variant="outline" onClick={() => setActiveTab('upload')}>
          New Upload
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
          <TabsTrigger value="recent">Recent Uploads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upload" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Upload Documents</CardTitle>
              <CardDescription>
                Upload documents to process with AI. Supported formats include PDF, DOCX, XLSX, PPTX, JPG, and PNG.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  dragActive ? 'border-primary bg-primary/5' : 'border-border'
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center justify-center">
                  <Upload className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse your files
                  </p>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="file-upload"
                    onChange={handleChange}
                  />
                  <label htmlFor="file-upload">
                    <Button as="span">
                      Select Files
                    </Button>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Upload Options</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="extract-text" className="mt-1" />
                    <div>
                      <label htmlFor="extract-text" className="text-sm font-medium">Extract Text</label>
                      <p className="text-xs text-muted-foreground">
                        Use OCR to extract text from images and scanned documents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="auto-classify" className="mt-1" />
                    <div>
                      <label htmlFor="auto-classify" className="text-sm font-medium">Auto-Classify</label>
                      <p className="text-xs text-muted-foreground">
                        Automatically classify documents by type and content
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="extract-entities" className="mt-1" />
                    <div>
                      <label htmlFor="extract-entities" className="text-sm font-medium">Extract Entities</label>
                      <p className="text-xs text-muted-foreground">
                        Identify and extract key entities like names, dates, and amounts
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="summarize" className="mt-1" />
                    <div>
                      <label htmlFor="summarize" className="text-sm font-medium">Generate Summary</label>
                      <p className="text-xs text-muted-foreground">
                        Create an AI-generated summary of each document
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled>
                Upload Files
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Processing Documents</CardTitle>
              <CardDescription>
                Documents currently being processed by the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Q2 Financial Report.pdf",
                    size: "2.4 MB",
                    progress: 75,
                    status: "Extracting Entities"
                  },
                  {
                    name: "Employee Onboarding.docx",
                    size: "1.8 MB",
                    progress: 45,
                    status: "OCR Processing"
                  },
                  {
                    name: "Customer Feedback Analysis.xlsx",
                    size: "4.2 MB",
                    progress: 90,
                    status: "Generating Summary"
                  },
                ].map((file, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">{file.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>{file.status}</span>
                        <span>{file.progress}%</span>
                      </div>
                      <Progress value={file.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
              <CardDescription>
                Documents that have been recently processed by the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Marketing Campaign Results.pptx",
                    size: "6.7 MB",
                    date: "Today, 10:23 AM",
                    status: "Completed",
                    success: true
                  },
                  {
                    name: "Legal Contract - Vendor A.pdf",
                    size: "3.1 MB",
                    date: "Today, 9:45 AM",
                    status: "Completed",
                    success: true
                  },
                  {
                    name: "Product Roadmap 2025.pdf",
                    size: "5.2 MB",
                    date: "Yesterday, 4:12 PM",
                    status: "Failed - Corrupted File",
                    success: false
                  },
                ].map((file, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{file.size}</span>
                            <span>•</span>
                            <span>{file.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {file.success ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-xs ${file.success ? 'text-green-500' : 'text-red-500'}`}>
                          {file.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">Process Again</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
