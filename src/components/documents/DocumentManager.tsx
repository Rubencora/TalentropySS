import { FileUpload, FileText, Search, Filter, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from '../ui/badge';

export function DocumentManager() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Documents</h2>
        <Button>
          <FileUpload className="mr-2 h-4 w-4" />
          Upload Documents
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search documents..." className="w-full" />
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
                Document Type
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>All Documents</DropdownMenuItem>
              <DropdownMenuItem>PDFs</DropdownMenuItem>
              <DropdownMenuItem>Spreadsheets</DropdownMenuItem>
              <DropdownMenuItem>Images</DropdownMenuItem>
              <DropdownMenuItem>Text Files</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]"></TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[
              {
                name: "Q2 Financial Report.pdf",
                type: "PDF",
                size: "2.4 MB",
                status: "Processed",
                uploaded: "2 hours ago",
                icon: <FileText className="h-4 w-4 text-blue-500" />
              },
              {
                name: "Employee Onboarding.docx",
                type: "DOCX",
                size: "1.8 MB",
                status: "Processing",
                uploaded: "3 hours ago",
                icon: <FileText className="h-4 w-4 text-blue-500" />
              },
              {
                name: "Customer Feedback Analysis.xlsx",
                type: "XLSX",
                size: "4.2 MB",
                status: "Processed",
                uploaded: "Yesterday",
                icon: <FileText className="h-4 w-4 text-green-500" />
              },
              {
                name: "Legal Contract - Vendor A.pdf",
                type: "PDF",
                size: "3.1 MB",
                status: "Processed",
                uploaded: "2 days ago",
                icon: <FileText className="h-4 w-4 text-blue-500" />
              },
              {
                name: "Marketing Campaign Results.pptx",
                type: "PPTX",
                size: "6.7 MB",
                status: "Processed",
                uploaded: "3 days ago",
                icon: <FileText className="h-4 w-4 text-orange-500" />
              },
            ].map((doc, index) => (
              <TableRow key={index}>
                <TableCell>{doc.icon}</TableCell>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>
                  <Badge variant={doc.status === "Processed" ? "default" : "outline"}>
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{doc.uploaded}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing 5 of 24 documents
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
