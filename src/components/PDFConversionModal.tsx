
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileIcon, Download, File, Trash } from "lucide-react";

interface PDFConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool?: string;
}

const PDFConversionModal: React.FC<PDFConversionModalProps> = ({
  isOpen,
  onClose,
  tool = "merge-pdfs",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [pdfPages, setPdfPages] = useState<string>("all");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (file: File) => {
    if (tool === "merge-pdfs") {
      if (!file.type.includes("pdf")) {
        toast.error("Please upload a PDF file");
        return;
      }
      setFiles(prevFiles => [...prevFiles, file]);
      toast.success(`Added ${file.name}`);
    } else {
      if (!file.type.includes("pdf")) {
        toast.error("Please upload a PDF file");
        return;
      }
      setFiles([file]);
      toast.success(`Added ${file.name}`);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleProcess = () => {
    if (files.length === 0) {
      toast.error("Please upload at least one PDF file");
      return;
    }

    setIsProcessing(true);

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("This feature is a placeholder. PDF processing would happen here.");
      
      if (tool === "split-pdf") {
        toast.info("In a real implementation, this would split the PDF based on your page selection.");
      } else if (tool === "merge-pdfs") {
        toast.info("In a real implementation, this would merge the PDFs you've selected.");
      } else if (tool === "pdf-extract") {
        toast.info("In a real implementation, this would extract text or images from your PDF.");
      }
    }, 1500);
  };

  const getToolTitle = () => {
    switch (tool) {
      case "merge-pdfs":
        return "Merge PDFs";
      case "split-pdf":
        return "Split PDF";
      case "pdf-extract":
        return "Extract from PDF";
      default:
        return "PDF Tools";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {getToolTitle()}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <FileUploader 
            onFileUpload={handleFileUpload} 
            accept=".pdf"
            maxSize={50}
          />

          {files.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Selected Files:</h3>
              <div className="border rounded-md divide-y">
                {files.map((file, index) => (
                  <div key={index} className="p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <FileIcon className="text-primary h-5 w-5" />
                      <span className="text-sm truncate max-w-[250px]">{file.name}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => removeFile(index)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tool === "split-pdf" && files.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="pages">Pages to extract (e.g., 1-3, 5, 7-9 or "all")</Label>
              <Input
                id="pages"
                value={pdfPages}
                onChange={(e) => setPdfPages(e.target.value)}
                placeholder="e.g., 1-3, 5, 7-9"
              />
            </div>
          )}

          {tool === "pdf-extract" && files.length > 0 && (
            <div className="space-y-2">
              <Label>Extract:</Label>
              <div className="flex space-x-2">
                <Button variant="outline">Text</Button>
                <Button variant="outline">Images</Button>
              </div>
            </div>
          )}

          <Button 
            onClick={handleProcess} 
            className="w-full"
            disabled={isProcessing || files.length === 0}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                Processing...
              </div>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                {tool === "merge-pdfs" ? "Merge PDFs" : 
                 tool === "split-pdf" ? "Split PDF" : "Extract Content"}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFConversionModal;
