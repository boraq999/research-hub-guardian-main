
import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Analytics from './Analytics';
import Theses from './Theses';
import Departments from './Departments';
import Universities from './Universities';
import AddThesis from './AddThesis';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <SidebarTrigger className="research-card hover:bg-primary/10" />
            </div>
            {children}
          </div>
        </main>

      </div>
    </SidebarProvider>
  );
}

const Index = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/theses" element={<Theses />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/universities" element={<Universities />} />
            <Route path="/add-thesis" element={<AddThesis />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default Index;
