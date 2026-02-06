"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  
  // Don't render the standard footer on the homepage (it has EnhancedFooter)
  if (pathname === "/") {
    return null;
  }
  
  return <Footer />;
}
