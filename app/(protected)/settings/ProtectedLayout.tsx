import React from "react";
import { Navbar } from "../_components/Navbar/Navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center p-3 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 to-gray-1000">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
