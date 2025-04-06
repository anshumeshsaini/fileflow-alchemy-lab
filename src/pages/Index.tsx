
import React, { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import ConversionTools from "@/components/ConversionTools";
import { Toaster } from "sonner";
import TextConversionModal from "@/components/TextConversionModal";
import EncodingConversionModal from "@/components/EncodingConversionModal";
import DataConversionModal from "@/components/DataConversionModal";
import DataVisualizationModal from "@/components/DataVisualizationModal";
import ImageConversionModal from "@/components/ImageConversionModal";
import PDFConversionModal from "@/components/PDFConversionModal";
import MediaConversionModal from "@/components/MediaConversionModal";
import ArchiveConversionModal from "@/components/ArchiveConversionModal";
import SmartConversionModal from "@/components/SmartConversionModal";

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
    
    if (activeTool === "data-viz") {
      return <DataVisualizationModal isOpen={isModalOpen} onClose={closeModal} />;
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

    // Image conversions
    if (activeTool === "image-conversion" || activeTool === "image-resize" || activeTool === "image-to-pdf") {
      return <ImageConversionModal isOpen={isModalOpen} onClose={closeModal} tool={activeTool} />;
    }
    
    // PDF operations
    if (activeTool === "merge-pdfs" || activeTool === "split-pdf" || activeTool === "pdf-extract") {
      return <PDFConversionModal isOpen={isModalOpen} onClose={closeModal} tool={activeTool} />;
    }
    
    // Media conversions
    if (activeTool === "audio-conversion" || activeTool === "media-trim") {
      return <MediaConversionModal isOpen={isModalOpen} onClose={closeModal} tool={activeTool} />;
    }
    
    // Archive operations
    if (activeTool === "create-zip" || activeTool === "extract-archive") {
      return <ArchiveConversionModal isOpen={isModalOpen} onClose={closeModal} tool={activeTool} />;
    }
    
    // Smart conversions
    if (activeTool === "magic-convert" || activeTool === "code-transform" || activeTool === "text-diff") {
      return <SmartConversionModal isOpen={isModalOpen} onClose={closeModal} tool={activeTool} />;
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
