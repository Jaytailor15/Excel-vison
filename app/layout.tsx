import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ExcelVision - Transform Your Data',
  description: 'Upload and analyze your Excel data with powerful visualization tools',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(
        inter.className,
        "min-h-screen flex flex-col antialiased"
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}