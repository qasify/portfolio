import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider, ThemeScript } from './_components/ui/ThemeProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Muhammad Qasim — Senior Frontend Engineer',
  description:
    'Portfolio of Muhammad Qasim, Senior Frontend Engineer specializing in React, Next.js, TypeScript, and scalable web systems. Built with AI-powered assistant.',
  keywords: [
    'Muhammad Qasim',
    'Frontend Engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Portfolio',
    'Senior Developer',
  ],
  openGraph: {
    title: 'Muhammad Qasim — Senior Frontend Engineer',
    description:
      'Interactive portfolio with AI-powered assistant. Explore projects, experience, and skills.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="bg-bg-primary text-text-primary font-[family-name:var(--font-geist-sans)] transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
