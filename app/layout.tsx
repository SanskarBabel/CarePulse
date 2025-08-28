import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

import { cn } from '@/lib/utils';
import { ThemeProvider } from "@/components/ThemeProvider";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: {
    default: "CarePulse - Book Healthcare Appointments Online | Medical Scheduling Platform",
    template: "%s | CarePulse - Healthcare Management"
  },
  description: "Book medical appointments instantly with CarePulse. Secure, HIPAA-compliant healthcare scheduling platform for patients and providers. Easy online appointment booking, patient registration, and medical record management.",
  keywords: [
    "healthcare appointments",
    "medical booking",
    "doctor appointments online",
    "patient scheduling",
    "healthcare management",
    "medical appointment booking",
    "online doctor booking",
    "healthcare platform",
    "patient portal",
    "medical scheduling software"
  ],
  authors: [{ name: "CarePulse Team" }],
  creator: "CarePulse",
  publisher: "CarePulse Healthcare",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://care-pulse-peach.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CarePulse - Premier Healthcare Appointment Booking Platform",
    description: "Schedule medical appointments online with top healthcare providers. Secure, fast, and HIPAA-compliant patient scheduling system.",
    url: 'https://care-pulse-peach.vercel.app',
    siteName: 'CarePulse',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CarePulse Healthcare Appointment Booking Platform',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CarePulse - Book Healthcare Appointments Online',
    description: 'Secure medical appointment scheduling platform for patients and healthcare providers.',
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#24AE7C" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "CarePulse",
              "description": "Healthcare appointment booking and management platform",
              "url": "https://care-pulse-peach.vercel.app",
              "applicationCategory": "HealthApplication",
              "operatingSystem": "Web Browser",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "provider": {
                "@type": "Organization",
                "name": "CarePulse Healthcare",
                "url": "https://care-pulse-peach.vercel.app"
              }
            })
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-dark-300 font-sans antialiased", fontSans.variable)}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
