import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Bob AI Timeline',
  description: 'Interactive journey through AI-powered HR transformation',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        {/* Global SVG gradient definitions */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <linearGradient id="agentic-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d489f7" />
              <stop offset="38%" stopColor="#f65e3d" />
              <stop offset="72%" stopColor="#f1bd03" />
              <stop offset="100%" stopColor="#e73bc4" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
