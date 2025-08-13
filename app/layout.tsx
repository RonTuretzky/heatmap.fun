import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "heatmaps.fun",
  description:
    "Free heatmap creator tool. Make custom heatmaps, track daily habits, visualize data patterns. Create beautiful GitHub-style contribution graphs with multiple themes.",
  keywords:
    "heatmap creator, custom heatmaps, make heatmaps, data visualization, habit tracker, contribution graph, heatmap generator, track data, visual analytics",
  authors: [{ name: "heatmaps.fun" }],
  creator: "heatmaps.fun",
  publisher: "heatmaps.fun",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  themeColor: "#10b981",
  openGraph: {
    title: "heatmaps.fun",
    description:
      "Free heatmap creator tool. Make custom heatmaps, track daily habits, visualize data patterns with beautiful themes.",
    url: "https://heatmaps.fun",
    siteName: "heatmaps.fun",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "heatmaps.fun - Custom Heatmap Creator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "heatmaps.fun",
    description: "Free heatmap creator tool. Make custom heatmaps, track daily habits, visualize data patterns.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  generator: "v0.app",
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": "heatmaps.fun",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#10b981",
    "msapplication-tap-highlight": "no",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "heatmaps.fun",
              description: "Free heatmap creator tool for tracking data and creating custom visualizations",
              url: "https://heatmaps.fun",
              applicationCategory: "DataVisualization",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "Custom heatmap creation",
                "Multiple color themes",
                "Data tracking",
                "GitHub-style contribution graphs",
                "Habit tracking",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
