import Header from "./header";
import Sidebar from "./sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: {children: ReactNode;}) {
  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr]">
      <Sidebar />
      <div className="flex flex-col min-w-0">
        <Header />
        <main className="grow">{children}</main>
      </div>
    </div>);

}