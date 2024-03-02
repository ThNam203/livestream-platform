import { Header } from "@/components/header";
import { LeftBar } from "@/components/left_bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en" className="h-screen w-full">
      <Header />
      <div className="w-full flex flex-row pt-14">
        <LeftBar />
        <div className="h-full w-full ml-64">{children}</div>
      </div>
    </div>
  );
}
