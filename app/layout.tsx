import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MedPulse — Medical News Aggregator',
  description: 'Stay ahead with curated, real-time medical news from the world\'s most trusted sources. Breaking research, clinical trials, and healthcare updates.',
  keywords: ['medical news', 'healthcare', 'clinical research', 'medical journals', 'health updates'],
  openGraph: {
    title: 'MedPulse — Medical News Aggregator',
    description: 'Real-time medical news from trusted sources worldwide.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
