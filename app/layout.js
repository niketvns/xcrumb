import Header from "@/components/header";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Xcrumb: From Crumbs to Success",
  description:
    "Xcrumb is an advanced ticket, task, and team management app designed to streamline your workflow. Effortlessly track progress, manage teams, and stay organized with our intuitive interface. Whether you're handling tasks for small projects or managing large teams, Xcrumb provides powerful tools for collaboration, productivity, and efficiency. Discover a smarter way to work with Xcrumb - where every detail matters. Perfect for businesses, startups, and freelancers seeking reliable task management solutions.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables: {
          colorPrimary: "#3b82f6",
          colorBackground: "#1a202c",
          colorInputBackground: "#2D3748",
          colorInputText: "#F3F4F6",
        },
        elements: {
          formButtonPrimary: "text-white bg-[#3479C7]",
          card: "bg-gray-800",
          headerTitle: "text-[#D17439]",
        },
      }}
    >
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <body className={`${inter.className} dotted-background`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer className="bg-gray-900 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                Made with 💖 by Niket Mishra
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
