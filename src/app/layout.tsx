import "./globals.css";
import { Open_Sans } from "next/font/google";
import { UserProvider } from "./context/UserContext";
import ThemeSwitcher from "./ThemeSwitcher";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Thoughts | Home",
  description: "Is there something on your mind lately?",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className="h-screen max-w-full"
    >
      <body className={`${openSans.className} dark:bg-primary h-full`}>
        <UserProvider>
          <ThemeSwitcher />
          <main className="h-full">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
