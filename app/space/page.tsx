import React from 'react';
import Image from 'next/image';
import { HiOutlineDocumentText } from 'react-icons/hi2';

const mockForms = [
  { id: '1', name: 'Job Application', icon: <HiOutlineDocumentText className="w-8 h-8 text-primary" /> },
  { id: '2', name: 'Contact Us', icon: <HiOutlineDocumentText className="w-8 h-8 text-primary" /> },
  { id: '3', name: 'Survey', icon: <HiOutlineDocumentText className="w-8 h-8 text-primary" /> },
  { id: '4', name: 'Feedback', icon: <HiOutlineDocumentText className="w-8 h-8 text-primary" /> },
  { id: '5', name: 'Event Registration', icon: <HiOutlineDocumentText className="w-8 h-8 text-primary" /> },
];

export default function FormsListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/40 to-background flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur border-b border-border shadow-sm flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Form AI Logo" width={36} height={36} className="rounded" />
          <span className="font-bold text-xl tracking-tight">FORM AI</span>
        </div>
        <input
          type="text"
          placeholder="Search forms..."
          className="rounded-md border border-input bg-card px-4 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition w-64 max-w-full"
        />
      </header>
      {/* Centered Content */}
      <main className="flex-1 flex flex-col items-center px-4">
        <div className="w-full max-w-5xl mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-foreground">Your Forms</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {mockForms.map(form => (
              <div
                key={form.id}
                className="group bg-card border border-border rounded-xl shadow-md p-6 flex flex-col items-center hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-primary/60 hover:bg-primary/5"
              >
                <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20">
                  {form.icon}
                </div>
                <span className="font-medium text-lg text-center text-foreground group-hover:text-primary transition-colors">
                  {form.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
