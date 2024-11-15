import { FileSpreadsheet } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <FileSpreadsheet className="h-6 w-6" />
          <span className="font-bold">ExcelVision</span>
        </Link>
      </div>
    </header>
  );
}