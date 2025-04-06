
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";
import { toast } from "sonner";
import { Sparkles, ArrowRight, Download, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { downloadFile } from "@/services/conversionService";

interface SmartConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool?: string;
}

const SmartConversionModal: React.FC<SmartConversionModalProps> = ({
  isOpen,
  onClose,
  tool = "magic-convert",
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    detectFileType(file);
  };

  const detectFileType = (file: File) => {
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      
      // Determine file type and suggest conversions
      const fileName = file.name.toLowerCase();
      const fileType = file.type;
      
      let newSuggestions: string[] = [];
      
      if (tool === "magic-convert") {
        if (fileType.includes("image")) {
          newSuggestions = ["png", "jpg", "webp", "svg", "pdf"];
        } else if (fileType.includes("text") || fileName.endsWith(".txt")) {
          newSuggestions = ["html", "markdown", "pdf", "docx"];
        } else if (fileType.includes("pdf") || fileName.endsWith(".pdf")) {
          newSuggestions = ["txt", "html", "docx", "images"];
        } else if (fileType.includes("json") || fileName.endsWith(".json")) {
          newSuggestions = ["csv", "xml", "yaml"];
        } else if (fileType.includes("csv") || fileName.endsWith(".csv")) {
          newSuggestions = ["json", "xml", "excel"];
        } else if (fileType.includes("audio")) {
          newSuggestions = ["mp3", "wav", "ogg", "flac"];
        } else if (fileType.includes("video")) {
          newSuggestions = ["mp4", "webm", "gif"];
        } else {
          newSuggestions = ["zip", "pdf"];
        }
      } else if (tool === "code-transform") {
        if (fileName.endsWith(".js")) {
          newSuggestions = ["typescript", "python", "java", "c#", "minified"];
        } else if (fileName.endsWith(".py")) {
          newSuggestions = ["javascript", "typescript", "java", "c#"];
        } else if (fileName.endsWith(".html")) {
          newSuggestions = ["jsx", "react", "vue", "markdown"];
        } else if (fileName.endsWith(".css")) {
          newSuggestions = ["scss", "less", "tailwind", "styled-components"];
        } else if (fileName.endsWith(".json")) {
          newSuggestions = ["yaml", "xml", "toml"];
        } else {
          newSuggestions = ["javascript", "python", "java", "c#"];
        }
      } else if (tool === "text-diff") {
        newSuggestions = ["Upload a second file to compare"];
      }
      
      setSuggestions(newSuggestions);
      setSelectedFormat(null);
      
      toast.success("File analyzed successfully");
    }, 1000);
  };

  const handleSelectFormat = (format: string) => {
    setSelectedFormat(format);
  };

  const handleConvert = () => {
    if (!selectedFile || !selectedFormat) {
      toast.error("Please upload a file and select an output format");
      return;
    }

    setIsProcessing(true);
    
    // Simulate conversion delay
    setTimeout(() => {
      setIsProcessing(false);
      
      if (tool === "magic-convert") {
        toast.success(`Conversion to ${selectedFormat} simulated successfully!`);
      } else if (tool === "code-transform") {
        toast.success(`Code transformed to ${selectedFormat} successfully!`);
      } else if (tool === "text-diff") {
        toast.success("Difference analysis completed successfully!");
      }
      
      // Simulate download for demo purposes
      if (selectedFormat !== "Upload a second file to compare") {
        const content = `This is a placeholder ${selectedFormat} file. In a real implementation, this would be your converted content.`;
        const filename = selectedFile.name.split('.')[0] + "." + selectedFormat;
        const mimeType = "text/plain";
        downloadFile(content, filename, mimeType);
      }
    }, 1500);
  };

  const getToolTitle = () => {
    switch (tool) {
      case "magic-convert":
        return "Magic Convert";
      case "code-transform":
        return "Code Transformer";
      case "text-diff":
        return "Text Diff";
      default:
        return "Smart Tools";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {getToolTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <FileUploader 
            onFileUpload={handleFileUpload} 
            accept="*"
            maxSize={100}
          />

          {isProcessing && (
            <div className="py-8 flex flex-col items-center justify-center">
              <div className="animate-spin text-primary">
                <RefreshCw className="h-10 w-10" />
              </div>
              <p className="mt-4 text-sm text-center text-muted-foreground">
                {selectedFormat ? "Converting your file..." : "Analyzing your file..."}
              </p>
            </div>
          )}

          {!isProcessing && selectedFile && suggestions.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <p>{selectedFile.name}</p>
                <ArrowRight className="h-4 w-4" />
                <p>{selectedFormat || "Select an output format"}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {suggestions.map((format) => (
                  <Card 
                    key={format}
                    className={`cursor-pointer transition-all ${
                      selectedFormat === format ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleSelectFormat(format)}
                  >
                    <CardContent className="p-4 flex items-center justify-center">
                      <span className="text-sm font-medium uppercase">{format}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button 
                onClick={handleConvert} 
                className="w-full"
                disabled={!selectedFormat}
              >
                {tool === "magic-convert" ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Convert to {selectedFormat}
                  </>
                ) : tool === "code-transform" ? (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Transform to {selectedFormat}
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Compare Files
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SmartConversionModal;
