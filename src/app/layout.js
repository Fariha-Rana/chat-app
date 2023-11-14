import { Inter } from "next/font/google";
import "./globals.css";
import { ChakraProviders } from "@/context/ChakraProviders";
import AuthProvider from "@/context/authContext";
import Navbar from "@/component/Navbar";
const inter = Inter({ subsets: ["latin"] });
import BackgroundImage from "@/component/Background";
export const metadata = {
  title: "ChatHub",
  description: "Connect effortlessly with real-time messaging",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthProvider>
          <ChakraProviders>
            <div className="text-primary">
              <div className="fixed -z-[1] left-1/3 w-12 top-2/3 blur-2xl">
                <BackgroundImage blur />
              </div>
              <div className="fixed -z-[1] left-2/3 w-12 top-1/3 blur-2xl">
                <BackgroundImage blur />
              </div>
              <div className="fixed -z-[1] left-1/4 w-40 top-1/4 blur-2xl opacity-50">
                <BackgroundImage blur />
              </div>
              <div className="fixed -z-[1] left-1/2 w-32 top-1/2 blur-2xl opacity-60">
                <BackgroundImage blur />
              </div>
              <div className="fixed -z-[1] left-[45%] w-12 top-1/3 blur-2xl">
                <BackgroundImage blur />
              </div>
              <div className="fixed -z-[1] left-3/4 w-60 top-1/3 opacity-20 blur-2xl">
                <BackgroundImage blur />
              </div>
              <div className="fixed -z-[1] left-3/4 w-100 top-1/4 opacity-20 blur-2xl">
                <BackgroundImage blur />
              </div>
              <div className="fixed -z-[1] left-3/4 w-10 top-1/2 opacity-20 blur-2xl">
                <BackgroundImage blur />
              </div>
            </div>
            <nav>
              <Navbar />
            </nav>
            {children}
          </ChakraProviders>
        </AuthProvider>
      </body>
    </html>
  );
}
