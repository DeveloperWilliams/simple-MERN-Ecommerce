import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/navbar";
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import the provider

// Load the Josefin_Sans font
const josefin = Josefin_Sans({
  subsets: ["latin"], // Add desired subsets if necessary
  weight: ["400", "700"], // Specify weights you want to include
});

export const metadata = {
  title: "Ecommerce",
  description: "Ecommerce Website + Admin Panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={josefin.className}>
        {/* Wrap the app with GoogleOAuthProvider */}
        <GoogleOAuthProvider clientId="1092739927548-pc8jp22bl0s59th8cpd09escigbhnobg.apps.googleusercontent.com">
          <Navbar />
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
