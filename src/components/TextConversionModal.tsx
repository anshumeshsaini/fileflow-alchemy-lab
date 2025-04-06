
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertTextToHTML, convertHTMLToText, convertMarkdownToHTML, downloadFile } from "@/services/conversionService";
import { toast } from "sonner";

interface TextConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TextConversionModal: React.FC<TextConversionModalProps> = ({ isOpen, onClose }) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [fromFormat, setFromFormat] = useState("text");
  const [toFormat, setToFormat] = useState("html");

  const handleConvert = () => {
    try {
      if (!inputText.trim()) {
        toast.error("Please enter some text to convert");
        return;
      }

      let result = "";

      if (fromFormat === "text" && toFormat === "html") {
        result = convertTextToHTML(inputText);
      } else if (fromFormat === "html" && toFormat === "text") {
        result = convertHTMLToText(inputText);
      } else if (fromFormat === "markdown" && toFormat === "html") {
        result = convertMarkdownToHTML(inputText);
      } else if (fromFormat === fromFormat && toFormat === toFormat) {
        result = inputText; // Same format, no conversion needed
      } else {
        // For unsupported conversions
        toast.error("This conversion is not supported yet");
        return;
      }

      setOutputText(result);
      toast.success("Conversion completed successfully");
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Failed to convert: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const handleDownload = () => {
    if (!outputText) {
      toast.error("No content to download");
      return;
    }

    let fileExtension = ".txt";
    let mimeType = "text/plain";

    if (toFormat === "html") {
      fileExtension = ".html";
      mimeType = "text/html";
    } else if (toFormat === "markdown") {
      fileExtension = ".md";
      mimeType = "text/markdown";
    }

    downloadFile(outputText, `converted${fileExtension}`, mimeType);
    toast.success("File downloaded successfully");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Text Conversion</DialogTitle>
          <DialogDescription>
            Convert between text formats
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="inputFormat">From:</Label>
              <Select value={fromFormat} onValueChange={setFromFormat}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Plain Text</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              id="inputText"
              placeholder="Enter your text here..."
              className="h-64 font-mono"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="outputFormat">To:</Label>
              <Select value={toFormat} onValueChange={setToFormat}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Plain Text</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="markdown">Markdown</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              id="outputText"
              placeholder="Converted text will appear here..."
              className="h-64 font-mono"
              value={outputText}
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleDownload} disabled={!outputText}>
            Download
          </Button>
          <Button onClick={handleConvert}>Convert</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TextConversionModal;
