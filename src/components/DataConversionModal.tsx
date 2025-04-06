
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { convertJSONToCSV, convertCSVToJSON, downloadFile } from "@/services/conversionService";
import { toast } from "sonner";

interface DataConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: string;
}

const DataConversionModal: React.FC<DataConversionModalProps> = ({ isOpen, onClose, tool }) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [fromFormat, setFromFormat] = useState(tool === "json-conversion" ? "json" : "csv");
  const [toFormat, setToFormat] = useState(tool === "json-conversion" ? "csv" : "json");

  const handleConvert = () => {
    if (!inputText.trim()) {
      toast.error("Please enter some data to convert");
      return;
    }

    try {
      let result = "";

      if (fromFormat === "json" && toFormat === "csv") {
        result = convertJSONToCSV(inputText);
      } else if (fromFormat === "csv" && toFormat === "json") {
        result = convertCSVToJSON(inputText);
      } else {
        // For same format or unsupported conversions
        result = inputText;
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

    if (toFormat === "json") {
      fileExtension = ".json";
      mimeType = "application/json";
    } else if (toFormat === "csv") {
      fileExtension = ".csv";
      mimeType = "text/csv";
    }

    downloadFile(outputText, `converted${fileExtension}`, mimeType);
    toast.success("File downloaded successfully");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Data Format Conversion</DialogTitle>
          <DialogDescription>
            Convert between different data formats
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
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              id="inputText"
              placeholder={fromFormat === "json" ? '{"name": "John", "age": 30}' : "name,age\nJohn,30"}
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
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Textarea
              id="outputText"
              placeholder="Converted data will appear here..."
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

export default DataConversionModal;
