import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { DocumentManager } from './components/documents/DocumentManager';
import { FileUploader } from './components/documents/FileUploader';
import { ChatInterface } from './components/chat/ChatInterface';
import { WorkflowManager } from './components/workflows/WorkflowManager';
import { SearchInterface } from './components/search/SearchInterface';
import { AuthProvider } from './lib/auth';
import { DocumentProvider } from './lib/documents';
import { WorkflowProvider } from './lib/workflows';
import { AnalyticsProvider } from './lib/analytics';
import { ChatProvider } from './lib/chat';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <DocumentProvider>
        <WorkflowProvider>
          <AnalyticsProvider>
            <ChatProvider>
              <Router>
                <Toaster />
                <Routes>
                  <Route path="/" element={<Layout><DashboardOverview /></Layout>} />
                  <Route path="/dashboard" element={<Layout><DashboardOverview /></Layout>} />
                  <Route path="/documents" element={<Layout><DocumentManager /></Layout>} />
                  <Route path="/upload" element={<Layout><FileUploader /></Layout>} />
                  <Route path="/chat" element={<Layout><ChatInterface /></Layout>} />
                  <Route path="/workflows" element={<Layout><WorkflowManager /></Layout>} />
                  <Route path="/search" element={<Layout><SearchInterface /></Layout>} />
                  {/* Add more routes as needed */}
                </Routes>
              </Router>
            </ChatProvider>
          </AnalyticsProvider>
        </WorkflowProvider>
      </DocumentProvider>
    </AuthProvider>
  );
}

export default App;
