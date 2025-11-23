// // @ts-ignore: side-effect import of CSS without type declaration
// import "./globals.css";
// // import CartSyncProvider from "@/features/cart/components/CartSyncProvider";

// // import QueryProvider from "@/shared/providers/QueryProviders";
// import { Toaster } from "react-hot-toast";
// import localFont from "next/font/local";
// // import AuthProvider from "@/shared/providers/AuthProvider";

// const vazir = localFont({
//   src: [
//     {
//       path: "../../public/fonts/Vazirmatn-Regular.woff2",
//       weight: "400",
//       style: "normal",
//     },
//   ],
//   variable: "--font-vazir",
//   display: "swap",
// });

// export const metadata = {
//   title: "My App",
// };
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="fa" dir="rtl" className={vazir.variable}>
//       <body>
//         {/* <QueryProvider> */}
//           <Toaster position="top-center" />
//           {/* <CartSyncProvider> */}
//             {/* <AuthProvider></AuthProvider> */}
//           {/* </CartSyncProvider> */}
//         {/* </QueryProvider> */}
//         {children}
//       </body>
//     </html>
//   );
// }

// app/layout.tsx

// @ts-ignore: side-effect import of CSS without type declaration
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JWT Authentication System',
  description: 'Next.js JWT Authentication with OTP',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}