import { useState } from 'react';
import { Send, Paperclip, Bot, User, FileText, Info } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function ChatInterface() {
  const [message, setMessage] = useState('');
  
  const handleSendMessage = () => {
    if (message.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between border-b border-border p-4">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-primary" />
          <div>
            <h2 className="font-medium">Q2 Financial Report.pdf</h2>
            <p className="text-sm text-muted-foreground">24 pages • 2.4 MB • Processed</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Info className="mr-2 h-4 w-4" />
            Document Info
          </Button>
          <Tabs defaultValue="chat">
            <TabsList>
              <TabsTrigger value="chat">Chat</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="entities">Entities</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 bg-primary/20">
            <Bot className="h-4 w-4 text-primary" />
          </Avatar>
          <div className="bg-muted p-3 rounded-lg max-w-[80%]">
            <p className="text-sm">
              I've analyzed the Q2 Financial Report. This document contains quarterly financial statements, 
              revenue breakdowns by product line, expense analysis, and projections for Q3. 
              What specific information would you like to know?
            </p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 justify-end">
          <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]">
            <p className="text-sm">
              What were the top performing product lines this quarter?
            </p>
          </div>
          <Avatar className="h-8 w-8 bg-foreground">
            <User className="h-4 w-4 text-background" />
          </Avatar>
        </div>
        
        <div className="flex items-start gap-3">
          <Avatar className="h-8 w-8 bg-primary/20">
            <Bot className="h-4 w-4 text-primary" />
          </Avatar>
          <div className="space-y-3 max-w-[80%]">
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm">
                According to the report, the top performing product lines in Q2 were:
              </p>
              <ol className="list-decimal pl-5 mt-2 text-sm">
                <li><strong>Enterprise Solutions</strong>: $4.2M revenue, 18% YoY growth</li>
                <li><strong>Cloud Services</strong>: $3.8M revenue, 24% YoY growth</li>
                <li><strong>Data Analytics</strong>: $2.5M revenue, 15% YoY growth</li>
              </ol>
              <p className="text-sm mt-2">
                Enterprise Solutions and Cloud Services exceeded quarterly targets by 12% and 15% respectively.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Page 8</Badge>
              <Badge variant="outline" className="text-xs">Page 12</Badge>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                View in document
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-2">
          <Textarea 
            placeholder="Ask a question about this document..." 
            className="min-h-[60px] resize-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="flex flex-col gap-2">
            <Button size="icon" variant="ghost">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="text-xs text-muted-foreground">
            Shift + Enter for new line
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Summarize
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Extract Entities
            </Button>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Find Similar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
