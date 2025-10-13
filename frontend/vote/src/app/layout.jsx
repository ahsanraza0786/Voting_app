// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "VoteChain - Secure Online Voting Platform",
//   description: "A secure and transparent online voting platform powered by blockchain technology.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

// import "./globals.css";
// import { Inter } from "next/font/google";

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Voting App",
//   description: "Online Voting System",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }

// app/layout.jsx

// pages/_app.js or app/layout.js (Next.js 13+)
import Script from "next/script";
import './globals.css'; // instead of '../styles/globals.css'



export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Google Identity Services script */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}
