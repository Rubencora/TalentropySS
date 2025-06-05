import { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our document system
export type Document = {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'processing' | 'processed' | 'failed';
  uploadedAt: string;
  content?: string;
  metadata?: Record<string, any>;
};

type DocumentContextType = {
  documents: Document[];
  isLoading: boolean;
  uploadDocument: (file: File, options?: Record<string, boolean>) => Promise<void>;
  getDocument: (id: string) => Document | undefined;
  deleteDocument: (id: string) => Promise<void>;
  searchDocuments: (query: string) => Promise<Document[]>;
};

// Create the context with a default value
const DocumentContext = createContext<DocumentContextType>({
  documents: [],
  isLoading: false,
  uploadDocument: async () => {},
  getDocument: () => undefined,
  deleteDocument: async () => {},
  searchDocuments: async () => [],
});

// Sample documents for demo purposes
const sampleDocuments: Document[] = [
  {
    id: '1',
    name: 'Q2 Financial Report.pdf',
    type: 'PDF',
    size: '2.4 MB',
    status: 'processed',
    uploadedAt: '2 hours ago',
  },
  {
    id: '2',
    name: 'Employee Onboarding.docx',
    type: 'DOCX',
    size: '1.8 MB',
    status: 'processing',
    uploadedAt: '3 hours ago',
  },
  {
    id: '3',
    name: 'Customer Feedback Analysis.xlsx',
    type: 'XLSX',
    size: '4.2 MB',
    status: 'processed',
    uploadedAt: 'Yesterday',
  },
  {
    id: '4',
    name: 'Legal Contract - Vendor A.pdf',
    type: 'PDF',
    size: '3.1 MB',
    status: 'processed',
    uploadedAt: '2 days ago',
  },
  {
    id: '5',
    name: 'Marketing Campaign Results.pptx',
    type: 'PPTX',
    size: '6.7 MB',
    status: 'processed',
    uploadedAt: '3 days ago',
  },
];

// Create a provider component
export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, this would connect to a backend service
  const uploadDocument = async (file: File, options?: Record<string, boolean>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a new document
      const newDocument: Document = {
        id: String(documents.length + 1),
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        status: 'processing',
        uploadedAt: 'Just now',
      };
      
      setDocuments(prev => [...prev, newDocument]);
      
      // Simulate processing
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === newDocument.id 
              ? { ...doc, status: 'processed' } 
              : doc
          )
        );
      }, 5000);
      
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getDocument = (id: string) => {
    return documents.find(doc => doc.id === id);
  };

  const deleteDocument = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Delete failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const searchDocuments = async (query: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple search implementation
      const results = documents.filter(doc => 
        doc.name.toLowerCase().includes(query.toLowerCase())
      );
      
      return results;
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    documents,
    isLoading,
    uploadDocument,
    getDocument,
    deleteDocument,
    searchDocuments,
  };

  return <DocumentContext.Provider value={value}>{children}</DocumentContext.Provider>;
}

// Create a hook for using the document context
export const useDocuments = () => useContext(DocumentContext);
