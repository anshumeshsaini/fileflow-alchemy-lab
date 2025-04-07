import React from "react";
import ConversionCard from "./ConversionCard";
import {
  FileText,
  Table,
  Code,
  ImageIcon,
  FileIcon,
  Music,
  Archive,
  Sparkles,
  Binary,
  Hash,
  FileJson,
  FileType2,
  FileSpreadsheet,
  Braces,
  FileType,
  Link,
  Diff,
  Copy,
  FilePlus,
  Scale,
  Scissors,
  Scan,
  Split,
  Combine,
  FileUp,
} from "lucide-react";
import { toast } from "sonner";

interface ConversionToolsProps {
  category: string;
  onSelectTool: (tool: string) => void;
}

const ConversionTools: React.FC<ConversionToolsProps> = ({
  category,
  onSelectTool,
}) => {
  const renderTools = () => {
    switch (category) {
      case "document":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConversionCard
              icon={FileText}
              title="Text Conversion"
              description="Convert between TXT, MD, HTML, and other text formats"
              onClick={() => {
                onSelectTool("text-conversion");
                toast.info("Text conversion selected");
              }}
              className="animate-slide-in"
            />
            <ConversionCard
              icon={FileType}
              title="Document Conversion"
              description="Convert between DOCX, PDF, ODT, and RTF formats"
              onClick={() => {
                onSelectTool("document-conversion");
                toast.info("Document conversion selected");
              }}
              className="animation-delay-200 animate-slide-in"
            />
            <ConversionCard
              icon={Copy}
              title="Document Compare"
              description="Compare the content of two documents"
              onClick={() => {
                onSelectTool("document-compare");
                toast.info("Document compare comming soon");
              }}
              className="animation-delay-400 animate-slide-in"
            />
          </div>
        );

      case "data":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConversionCard
              icon={FileJson}
              title="JSON Conversion"
              description="Convert between JSON, YAML, XML, and other data formats"
              onClick={() => {
                onSelectTool("json-conversion");
                toast.info("JSON conversion selected");
              }}
              className="animate-slide-in"
            />
            <ConversionCard
              icon={FileUp}
              title="CSV Conversion"
              description="Convert between CSV, TSV, Excel, and JSON"
              onClick={() => {
                onSelectTool("csv-conversion");
                toast.info("CSV conversion selected");
              }}
              className="animation-delay-200 animate-slide-in"
            />
            <ConversionCard
              icon={FileSpreadsheet}
              title="Data Visualization"
              description="Generate charts and visualizations from your data"
              onClick={() => {
                onSelectTool("data-viz");
                toast.info("Data visualization selected");
              }}
              className="animation-delay-400 animate-slide-in"
            />
          </div>
        );

      case "encoding":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConversionCard
              icon={Binary}
              title="Number Conversion"
              description="Convert between binary, decimal, hex, and octal"
              onClick={() => {
                onSelectTool("number-conversion");
                toast.info("Number conversion selected");
              }}
              className="animate-slide-in"
            />
            <ConversionCard
              icon={Code}
              title="Base64 Conversion"
              description="Encode/decode Base64 for text and files"
              onClick={() => {
                onSelectTool("base64");
                toast.info("Base64 conversion selected");
              }}
              className="animation-delay-200 animate-slide-in"
            />
            <ConversionCard
              icon={Link}
              title="URL Encode/Decode"
              description="Encode and decode URLs and query parameters"
              onClick={() => {
                onSelectTool("url-encode");
                toast.info("URL encode/decode selected");
              }}
              className="animation-delay-400 animate-slide-in"
            />
            <ConversionCard
              icon={Hash}
              title="Hash Generator"
              description="Generate MD5, SHA256, and other hash values"
              onClick={() => {
                onSelectTool("hash");
                toast.info("Hash generator selected");
              }}
              className="animation-delay-400 animate-slide-in"
            />
          </div>
        );

      case "image":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConversionCard
              icon={ImageIcon}
              title="Image Conversion"
              description="Convert between JPG, PNG, WEBP, SVG and other formats"
              onClick={() => {
                onSelectTool("image-conversion");
                toast.info("Image conversion selected");
              }}
              className="animate-slide-in"
            />
            <ConversionCard
              icon={Scale}
              title="Image Resize"
              description="Resize, crop, and adjust image dimensions"
              onClick={() => {
                onSelectTool("image-resize");
                toast.info("Image resize selected");
              }}
              className="animation-delay-200 animate-slide-in"
            />
            <ConversionCard
              icon={FileIcon}
              title="Image to Png"
              description="Convert one or multiple images to a PDF document"
              onClick={() => {
                onSelectTool("image-to-pdf");
                toast.info("Image to PDF selected");
              }}
              className="animation-delay-400 animate-slide-in"
            />
          </div>
        );

      case "pdf":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConversionCard
              icon={Combine}
              title="Merge PDFs"
              description="Combine multiple PDF files into one document"
              onClick={() => {
                onSelectTool("merge-pdfs");
                toast.info("Merge PDFs selected");
              }}
              className="animate-slide-in"
            />
            <ConversionCard
              icon={Split}
              title="Split PDF"
              description="Extract specific pages or split a PDF into multiple files"
              onClick={() => {
                onSelectTool("split-pdf");
                toast.info("Split PDF selected");
              }}
              className="animation-delay-200 animate-slide-in"
            />
            <ConversionCard
              icon={Scan}
              title="PDF to Text/Image"
              description="Extract text or images from PDF documents"
              onClick={() => {
                onSelectTool("pdf-extract");
                toast.info("PDF extraction selected");
              }}
              className="animation-delay-400 animate-slide-in"
            />
          </div>
        );

      case "media":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConversionCard
              icon={Music}
              title="Audio Conversion"
              description="Convert between MP3, WAV, OGG and other audio formats"
              onClick={() => {
                onSelectTool("audio-conversion");
                toast.info("Audio conversion functionality coming soon!");
              }}
              className="animate-slide-in"
            />

          </div>
        );

      case "archive":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConversionCard
              icon={Archive}
              title="Create ZIP"
              description="Compress multiple files into a ZIP archive"
              onClick={() => {
                onSelectTool("create-zip");
                toast.info("ZIP creation functionality coming soon!");
              }}
              className="animate-slide-in"
            />
            <ConversionCard
              icon={FilePlus}
              title="Extract Archive"
              description="Extract files from ZIP, RAR, and other archive formats"
              onClick={() => {
                onSelectTool("extract-archive");
                toast.info("Archive extraction functionality coming soon!");
              }}
              className="animation-delay-200 animate-slide-in"
            />
          </div>
        );

      case "smart":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ConversionCard
              icon={Sparkles}
              title="Magic Convert"
              description="Automatically detect file type and suggest best conversions"
              onClick={() => {
                onSelectTool("magic-convert");
                toast.info("Magic conversion functionality coming soon!");
              }}
              className="animate-slide-in"
            />
            <ConversionCard
              icon={Braces}
              title="Code Transformer"
              description="Convert between programming languages and formats"
              onClick={() => {
                onSelectTool("code-transform");
                toast.info("Code transformation functionality coming soon!");
              }}
              className="animation-delay-200 animate-slide-in"
            />
            <ConversionCard
              icon={Diff}
              title="Text Diff"
              description="Compare and visualize differences between texts"
              onClick={() => {
                onSelectTool("text-diff");
                toast.info("Text diff functionality coming soon!");
              }}
              className="animation-delay-400 animate-slide-in"
            />
          </div>
        );

      default:
        return (
          <div className="text-center py-8">
            <p>Please select a category from the sidebar</p>
          </div>
        );
    }
  };

  return <div className="w-full">{renderTools()}</div>;
};

export default ConversionTools;
