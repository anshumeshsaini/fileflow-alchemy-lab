
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ConversionTools from "@/components/ConversionTools";
import { Toaster } from "sonner";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("document");
  const [activeTool, setActiveTool] = useState("");

  return (
    <div className="min-h-screen flex w-full">
      <SidebarProvider defaultCollapsed={false} className="w-full">
        <div className="flex w-full">
          <AppSidebar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
          <main className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold">
                  {activeCategory.charAt(0).toUpperCase() +
                    activeCategory.slice(1)}{" "}
                  Conversion
                </h1>
                <p className="text-muted-foreground mt-2">
                  Select a conversion tool to get started
                </p>
              </div>
              <ConversionTools
                category={activeCategory}
                onSelectTool={setActiveTool}
              />
            </div>
          </main>
        </div>
      </SidebarProvider>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default Index;
