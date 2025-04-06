
import React, { useState } from "react";
import { Upload, X, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface FileUploaderProps {
  onFileUpload: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileUpload,
  accept = "*",
  maxSize = 100,
  className = "",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    // Check file size (convert maxSize from MB to bytes)
    if (selectedFile.size > maxSize * 1024 * 1024) {
      toast.error(`File size exceeds maximum limit of ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);
    onFileUpload(selectedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className={`w-full ${className}`}>
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            dragging
              ? "border-primary bg-primary/5"
              : "border-gray-300 dark:border-gray-700 hover:border-primary/50"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <h3 className="text-lg font-medium">Drop your file here</h3>
            <p className="text-sm text-muted-foreground mb-2">
              or click to browse
            </p>
            <span className="text-xs text-muted-foreground">
              Max file size: {maxSize}MB
            </span>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleChange}
            accept={accept}
          />
        </div>
      ) : (
        <div className="glass-card p-4 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <File className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium truncate max-w-[180px] sm:max-w-[240px] md:max-w-full">
                {file.name}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(file.size)}
              </span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
            className="h-8 w-8 rounded-full opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
