import { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our analytics system
export type AnalyticsData = {
  id: string;
  title: string;
  description: string;
  type: 'chart' | 'report' | 'insight';
  category: string;
  createdAt: string;
  data: any; // In a real app, this would be more strongly typed
};

type AnalyticsContextType = {
  insights: AnalyticsData[];
  isLoading: boolean;
  getInsight: (id: string) => AnalyticsData | undefined;
  generateInsight: (documentIds: string[], type: string) => Promise<AnalyticsData>;
  searchInsights: (query: string) => Promise<AnalyticsData[]>;
};

// Create the context with a default value
const AnalyticsContext = createContext<AnalyticsContextType>({
  insights: [],
  isLoading: false,
  getInsight: () => undefined,
  generateInsight: async () => ({ 
    id: '', 
    title: '', 
    description: '', 
    type: 'insight', 
    category: '', 
    createdAt: '', 
    data: null 
  }),
  searchInsights: async () => [],
});

// Sample insights for demo purposes
const sampleInsights: AnalyticsData[] = [
  {
    id: '1',
    title: 'Revenue Trend Analysis',
    description: 'Analysis of revenue trends across product lines',
    type: 'chart',
    category: 'Finance',
    createdAt: '2 days ago',
    data: {
      chartType: 'line',
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Enterprise Solutions',
          data: [4200, 4500, 4800, 5100, 5400, 5700],
        },
        {
          label: 'Cloud Services',
          data: [3800, 4000, 4300, 4600, 4900, 5200],
        },
        {
          label: 'Data Analytics',
          data: [2500, 2700, 2900, 3100, 3300, 3500],
        },
      ],
    },
  },
  {
    id: '2',
    title: 'Customer Sentiment Analysis',
    description: 'Analysis of customer feedback sentiment over time',
    type: 'report',
    category: 'Customer Success',
    createdAt: '3 days ago',
    data: {
      summary: 'Overall positive sentiment with 78% satisfaction rate',
      keyFindings: [
        'Product usability received highest scores',
        'Support response time was the main area for improvement',
        'Feature requests centered around integration capabilities',
      ],
      sentimentBreakdown: {
        positive: 78,
        neutral: 15,
        negative: 7,
      },
    },
  },
  {
    id: '3',
    title: 'HR Recruitment Efficiency',
    description: 'Analysis of recruitment process efficiency',
    type: 'insight',
    category: 'Human Resources',
    createdAt: '1 week ago',
    data: {
      averageTimeToHire: '32 days',
      costPerHire: '$4,200',
      topRecruitmentChannels: [
        'Employee Referrals (42%)',
        'LinkedIn (28%)',
        'Job Boards (18%)',
      ],
      recommendations: [
        'Streamline technical interview process',
        'Expand employee referral program',
        'Improve candidate communication workflow',
      ],
    },
  },
];

// Create a provider component
export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [insights, setInsights] = useState<AnalyticsData[]>(sampleInsights);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, this would connect to a backend service
  const getInsight = (id: string) => {
    return insights.find(insight => insight.id === id);
  };

  const generateInsight = async (documentIds: string[], type: string): Promise<AnalyticsData> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Create a new insight
      const newInsight: AnalyticsData = {
        id: String(insights.length + 1),
        title: `Generated ${type} Analysis`,
        description: `Automatically generated analysis based on selected documents`,
        type: 'insight' as any,
        category: 'Auto-generated',
        createdAt: 'Just now',
        data: {
          summary: 'This is an automatically generated insight based on the selected documents.',
          keyFindings: [
            'Finding 1 based on document analysis',
            'Finding 2 based on document analysis',
            'Finding 3 based on document analysis',
          ],
        },
      };
      
      setInsights(prev => [...prev, newInsight]);
      return newInsight;
    } catch (error) {
      console.error('Generate insight failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const searchInsights = async (query: string): Promise<AnalyticsData[]> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple search implementation
      const results = insights.filter(insight => 
        insight.title.toLowerCase().includes(query.toLowerCase()) ||
        insight.description.toLowerCase().includes(query.toLowerCase()) ||
        insight.category.toLowerCase().includes(query.toLowerCase())
      );
      
      return results;
    } catch (error) {
      console.error('Search insights failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    insights,
    isLoading,
    getInsight,
    generateInsight,
    searchInsights,
  };

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
}

// Create a hook for using the analytics context
export const useAnalytics = () => useContext(AnalyticsContext);
