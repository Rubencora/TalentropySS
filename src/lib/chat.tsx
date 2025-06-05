import { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our chat system
export type ChatMessage = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  documentId?: string;
  references?: {
    page: number;
    confidence: number;
  }[];
};

export type ChatSession = {
  id: string;
  title: string;
  documentId?: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
};

type ChatContextType = {
  sessions: ChatSession[];
  currentSession: ChatSession | null;
  isLoading: boolean;
  createSession: (documentId?: string) => Promise<ChatSession>;
  getSession: (id: string) => ChatSession | undefined;
  setCurrentSession: (id: string) => void;
  sendMessage: (content: string) => Promise<ChatMessage>;
  deleteSession: (id: string) => Promise<void>;
};

// Create the context with a default value
const ChatContext = createContext<ChatContextType>({
  sessions: [],
  currentSession: null,
  isLoading: false,
  createSession: async () => ({ 
    id: '', 
    title: '', 
    messages: [], 
    createdAt: '', 
    updatedAt: '' 
  }),
  getSession: () => undefined,
  setCurrentSession: () => {},
  sendMessage: async () => ({ 
    id: '', 
    content: '', 
    sender: 'user', 
    timestamp: '' 
  }),
  deleteSession: async () => {},
});

// Sample chat sessions for demo purposes
const sampleSessions: ChatSession[] = [
  {
    id: '1',
    title: 'Q2 Financial Report Analysis',
    documentId: '1',
    messages: [
      {
        id: '1',
        content: "I've analyzed the Q2 Financial Report. This document contains quarterly financial statements, revenue breakdowns by product line, expense analysis, and projections for Q3. What specific information would you like to know?",
        sender: 'ai',
        timestamp: '2 hours ago',
      },
      {
        id: '2',
        content: 'What were the top performing product lines this quarter?',
        sender: 'user',
        timestamp: '2 hours ago',
      },
      {
        id: '3',
        content: "According to the report, the top performing product lines in Q2 were:\n\n1. Enterprise Solutions: $4.2M revenue, 18% YoY growth\n2. Cloud Services: $3.8M revenue, 24% YoY growth\n3. Data Analytics: $2.5M revenue, 15% YoY growth\n\nEnterprise Solutions and Cloud Services exceeded quarterly targets by 12% and 15% respectively.",
        sender: 'ai',
        timestamp: '2 hours ago',
        references: [
          { page: 8, confidence: 0.92 },
          { page: 12, confidence: 0.87 },
        ],
      },
    ],
    createdAt: '2 hours ago',
    updatedAt: '2 hours ago',
  },
  {
    id: '2',
    title: 'Employee Onboarding Document Review',
    documentId: '2',
    messages: [
      {
        id: '1',
        content: "I've analyzed the Employee Onboarding document. This contains procedures for new hire orientation, required paperwork, IT setup, and department-specific training. How can I help you with this document?",
        sender: 'ai',
        timestamp: '3 hours ago',
      },
      {
        id: '2',
        content: 'What are the required forms for new employees?',
        sender: 'user',
        timestamp: '3 hours ago',
      },
      {
        id: '3',
        content: "The required forms for new employees include:\n\n1. W-4 Tax Withholding Form\n2. I-9 Employment Eligibility Verification\n3. Direct Deposit Authorization\n4. Employee Handbook Acknowledgement\n5. Emergency Contact Information\n6. Benefits Enrollment Forms (due within 30 days)\n7. Confidentiality and Non-Disclosure Agreement",
        sender: 'ai',
        timestamp: '3 hours ago',
        references: [
          { page: 3, confidence: 0.95 },
          { page: 4, confidence: 0.89 },
        ],
      },
    ],
    createdAt: '3 hours ago',
    updatedAt: '3 hours ago',
  },
];

// Create a provider component
export function ChatProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<ChatSession[]>(sampleSessions);
  const [currentSession, setCurrentSessionState] = useState<ChatSession | null>(sampleSessions[0]);
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, this would connect to a backend service
  const createSession = async (documentId?: string): Promise<ChatSession> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create a new session
      const newSession: ChatSession = {
        id: String(sessions.length + 1),
        title: documentId ? 'New Document Chat' : 'New Chat',
        documentId,
        messages: [
          {
            id: '1',
            content: documentId 
              ? "I've analyzed this document. How can I help you with it?" 
              : "Hello! I'm your AI assistant. How can I help you today?",
            sender: 'ai',
            timestamp: 'Just now',
          },
        ],
        createdAt: 'Just now',
        updatedAt: 'Just now',
      };
      
      setSessions(prev => [...prev, newSession]);
      setCurrentSessionState(newSession);
      return newSession;
    } catch (error) {
      console.error('Create session failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getSession = (id: string) => {
    return sessions.find(session => session.id === id);
  };

  const setCurrentSession = (id: string) => {
    const session = getSession(id);
    if (session) {
      setCurrentSessionState(session);
    }
  };

  const sendMessage = async (content: string): Promise<ChatMessage> => {
    if (!currentSession) {
      throw new Error('No active chat session');
    }
    
    setIsLoading(true);
    try {
      // Create user message
      const userMessage: ChatMessage = {
        id: String(currentSession.messages.length + 1),
        content,
        sender: 'user',
        timestamp: 'Just now',
      };
      
      // Update session with user message
      const updatedSession = {
        ...currentSession,
        messages: [...currentSession.messages, userMessage],
        updatedAt: 'Just now',
      };
      
      setCurrentSessionState(updatedSession);
      setSessions(prev => 
        prev.map(session => 
          session.id === currentSession.id ? updatedSession : session
        )
      );
      
      // Simulate API call for AI response
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create AI response
      const aiMessage: ChatMessage = {
        id: String(updatedSession.messages.length + 1),
        content: generateAIResponse(content, currentSession.documentId),
        sender: 'ai',
        timestamp: 'Just now',
        documentId: currentSession.documentId,
        references: currentSession.documentId ? [
          { page: Math.floor(Math.random() * 20) + 1, confidence: 0.8 + Math.random() * 0.15 },
          { page: Math.floor(Math.random() * 20) + 1, confidence: 0.8 + Math.random() * 0.15 },
        ] : undefined,
      };
      
      // Update session with AI response
      const finalSession = {
        ...updatedSession,
        messages: [...updatedSession.messages, aiMessage],
        updatedAt: 'Just now',
      };
      
      setCurrentSessionState(finalSession);
      setSessions(prev => 
        prev.map(session => 
          session.id === currentSession.id ? finalSession : session
        )
      );
      
      return userMessage;
    } catch (error) {
      console.error('Send message failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSession = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSessions(prev => prev.filter(session => session.id !== id));
      
      // If the deleted session was the current one, set current to null or the first available
      if (currentSession?.id === id) {
        const remainingSessions = sessions.filter(session => session.id !== id);
        setCurrentSessionState(remainingSessions.length > 0 ? remainingSessions[0] : null);
      }
    } catch (error) {
      console.error('Delete session failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to generate mock AI responses
  const generateAIResponse = (userMessage: string, documentId?: string): string => {
    // This would be replaced by actual AI in a real app
    const responses = [
      "Based on the document, I can see that this information is located in section 3.2. The key points are: 1) quarterly growth exceeded expectations, 2) new market expansion is on track, and 3) customer retention improved by 12%.",
      "The document indicates that this process involves three main steps: data collection, validation, and reporting. Each step has specific requirements and responsible parties outlined on pages 8-12.",
      "According to the analysis, the main factors contributing to this outcome were: increased operational efficiency, strategic partnerships, and improved customer engagement strategies.",
      "The document doesn't specifically address this question. Would you like me to search for related information or focus on a different aspect?",
      "I've found several relevant sections in the document. The most important information appears on page 15, which outlines the proposed timeline and resource allocation for the next quarter.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const value = {
    sessions,
    currentSession,
    isLoading,
    createSession,
    getSession,
    setCurrentSession,
    sendMessage,
    deleteSession,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

// Create a hook for using the chat context
export const useChat = () => useContext(ChatContext);
