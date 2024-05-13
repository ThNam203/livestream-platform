import { Header } from "@/components/header";
import { LeftBar } from "@/components/left_bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Header />
      <div className="w-full h-[calc(100%-48px)] flex flex-row">
        <LeftBar />
        <div className="h-full w-full ml-64">{children}</div>
      </div>
    </div>
  );
}
