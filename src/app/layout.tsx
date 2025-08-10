import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { Montserrat } from 'next/font/google';
import './globals.css';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

const googleSansCode = localFont({
  src: '../fonts/GoogleSansCode-VariableFont_wght.ttf',
  variable: '--font-google-sans-code',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Dixit Scoreboard',
  description: 'Play Dixit with your friends',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${googleSansCode.variable}`}
    >
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
