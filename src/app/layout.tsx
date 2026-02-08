import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BuildMyCV - Professional CV Builder',
  description: 'Create, optimize, and download professional CVs with ATS scoring and drag-drop editor',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
