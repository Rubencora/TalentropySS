import { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our workflow system
export type Workflow = {
  id: string;
  title: string;
  description: string;
  department: string;
  status: 'active' | 'paused' | 'archived';
  lastRun: string;
  documents: number;
  automations: number;
};

export type WorkflowTemplate = {
  id: string;
  title: string;
  description: string;
  department: string;
  complexity: 'Low' | 'Medium' | 'High';
  popularity: 'Low' | 'Medium' | 'High';
};

type WorkflowContextType = {
  workflows: Workflow[];
  templates: WorkflowTemplate[];
  isLoading: boolean;
  createWorkflow: (workflow: Omit<Workflow, 'id'>) => Promise<Workflow>;
  getWorkflow: (id: string) => Workflow | undefined;
  updateWorkflow: (id: string, updates: Partial<Workflow>) => Promise<Workflow>;
  deleteWorkflow: (id: string) => Promise<void>;
  runWorkflow: (id: string) => Promise<void>;
};

// Create the context with a default value
const WorkflowContext = createContext<WorkflowContextType>({
  workflows: [],
  templates: [],
  isLoading: false,
  createWorkflow: async () => ({ id: '', title: '', description: '', department: '', status: 'active', lastRun: '', documents: 0, automations: 0 }),
  getWorkflow: () => undefined,
  updateWorkflow: async () => ({ id: '', title: '', description: '', department: '', status: 'active', lastRun: '', documents: 0, automations: 0 }),
  deleteWorkflow: async () => {},
  runWorkflow: async () => {},
});

// Sample workflows for demo purposes
const sampleWorkflows: Workflow[] = [
  {
    id: '1',
    title: 'Resume Processing',
    description: 'Automatically extract candidate information from resumes',
    department: 'HR',
    status: 'active',
    lastRun: '10 minutes ago',
    documents: 42,
    automations: 3
  },
  {
    id: '2',
    title: 'Invoice Processing',
    description: 'Extract and validate invoice data for accounts payable',
    department: 'Finance',
    status: 'active',
    lastRun: '1 hour ago',
    documents: 156,
    automations: 5
  },
  {
    id: '3',
    title: 'Contract Analysis',
    description: 'Extract key terms and clauses from legal contracts',
    department: 'Legal',
    status: 'active',
    lastRun: '3 hours ago',
    documents: 78,
    automations: 4
  },
  {
    id: '4',
    title: 'Customer Feedback Analysis',
    description: 'Analyze customer feedback for sentiment and key issues',
    department: 'Operations',
    status: 'active',
    lastRun: 'Yesterday',
    documents: 215,
    automations: 6
  },
  {
    id: '5',
    title: 'Compliance Document Review',
    description: 'Scan documents for compliance issues and flag for review',
    department: 'Legal',
    status: 'active',
    lastRun: '2 days ago',
    documents: 63,
    automations: 4
  },
];

// Sample templates for demo purposes
const sampleTemplates: WorkflowTemplate[] = [
  {
    id: '1',
    title: 'Employee Onboarding',
    description: 'Process new employee documents and extract key information',
    department: 'HR',
    complexity: 'Medium',
    popularity: 'High'
  },
  {
    id: '2',
    title: 'Vendor Contract Review',
    description: 'Analyze vendor contracts for key terms and obligations',
    department: 'Legal',
    complexity: 'High',
    popularity: 'Medium'
  },
  {
    id: '3',
    title: 'Expense Report Processing',
    description: 'Extract and categorize expenses from reports',
    department: 'Finance',
    complexity: 'Low',
    popularity: 'High'
  },
];

// Create a provider component
export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [workflows, setWorkflows] = useState<Workflow[]>(sampleWorkflows);
  const [templates] = useState<WorkflowTemplate[]>(sampleTemplates);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, this would connect to a backend service
  const createWorkflow = async (workflow: Omit<Workflow, 'id'>): Promise<Workflow> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new workflow
      const newWorkflow: Workflow = {
        ...workflow,
        id: String(workflows.length + 1),
        lastRun: 'Never',
        documents: 0,
        automations: workflow.automations || 0,
      };
      
      setWorkflows(prev => [...prev, newWorkflow]);
      return newWorkflow;
    } catch (error) {
      console.error('Create workflow failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getWorkflow = (id: string) => {
    return workflows.find(workflow => workflow.id === id);
  };

  const updateWorkflow = async (id: string, updates: Partial<Workflow>): Promise<Workflow> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let updatedWorkflow: Workflow | undefined;
      
      setWorkflows(prev => 
        prev.map(workflow => {
          if (workflow.id === id) {
            updatedWorkflow = { ...workflow, ...updates };
            return updatedWorkflow;
          }
          return workflow;
        })
      );
      
      if (!updatedWorkflow) {
        throw new Error(`Workflow with id ${id} not found`);
      }
      
      return updatedWorkflow;
    } catch (error) {
      console.error('Update workflow failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWorkflow = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWorkflows(prev => prev.filter(workflow => workflow.id !== id));
    } catch (error) {
      console.error('Delete workflow failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const runWorkflow = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update the workflow's lastRun
      setWorkflows(prev => 
        prev.map(workflow => 
          workflow.id === id 
            ? { ...workflow, lastRun: 'Just now' } 
            : workflow
        )
      );
    } catch (error) {
      console.error('Run workflow failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    workflows,
    templates,
    isLoading,
    createWorkflow,
    getWorkflow,
    updateWorkflow,
    deleteWorkflow,
    runWorkflow,
  };

  return <WorkflowContext.Provider value={value}>{children}</WorkflowContext.Provider>;
}

// Create a hook for using the workflow context
export const useWorkflows = () => useContext(WorkflowContext);
