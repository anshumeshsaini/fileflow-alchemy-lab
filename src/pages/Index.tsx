
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ConversionTools from "@/components/ConversionTools";
import { Toaster } from "sonner";
import TextConversionModal from "@/components/TextConversionModal";
import EncodingConversionModal from "@/components/EncodingConversionModal";
import DataConversionModal from "@/components/DataConversionModal";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("document");
  const [activeTool, setActiveTool] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToolSelect = (tool: string) => {
    setActiveTool(tool);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const renderConversionModal = () => {
    // Document conversions
    if (activeTool === "text-conversion" || activeTool === "document-conversion") {
      return <TextConversionModal isOpen={isModalOpen} onClose={closeModal} />;
    }
    
    // Data conversions
    if (activeTool === "json-conversion" || activeTool === "csv-conversion") {
      return <DataConversionModal isOpen={isModalOpen} onClose={closeModal} tool={activeTool} />;
    }
    
    // Encoding conversions
    if (
      activeTool === "number-conversion" || 
      activeTool === "base64" || 
      activeTool === "url-encode" || 
      activeTool === "hash"
    ) {
      return <EncodingConversionModal isOpen={isModalOpen} onClose={closeModal} tool={activeTool} />;
    }
    
    return null;
  };

  return (
    <div className="min-h-screen flex w-full">
      <SidebarProvider className="w-full">
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
                onSelectTool={handleToolSelect}
              />
              {renderConversionModal()}
            </div>
          </main>
        </div>
      </SidebarProvider>
      <Toaster position="top-center" richColors closeButton />
    </div>
  );
};

export default Index;
