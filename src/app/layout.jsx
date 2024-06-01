import { Cabin } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { Providers } from "./providers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "../app/GlobalProvider";

const cabin = Cabin({ subsets: ["latin"] });

export const metadata = {
  title: "Tiffan Bae",
  description: "Tiffan Service in Melbourne",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cabin.className}>
        <GlobalProvider>
          <Providers>
            <Theme>
              {children}
              <ToastContainer />
            </Theme>
          </Providers>
        </GlobalProvider>
      </body>
    </html>
  );
}
