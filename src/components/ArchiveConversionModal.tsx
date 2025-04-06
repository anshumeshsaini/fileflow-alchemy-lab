
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { File, Folder, Trash, Download, Archive } from "lucide-react";

interface ArchiveConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool?: string;
}

const ArchiveConversionModal: React.FC<ArchiveConversionModalProps> = ({
  isOpen,
  onClose,
  tool = "create-zip",
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [archiveFormat, setArchiveFormat] = useState("zip");
  const [compressionLevel, setCompressionLevel] = useState<string>("normal");

  const handleFileUpload = (file: File) => {
    if (tool === "create-zip") {
      setFiles(prevFiles => [...prevFiles, file]);
      toast.success(`Added ${file.name}`);
    } else {
      if (!file.type.includes("zip") && !file.name.endsWith(".zip") && 
          !file.name.endsWith(".rar") && !file.name.endsWith(".7z")) {
        toast.error("Please upload a supported archive file (ZIP, RAR, 7Z)");
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
      toast.error("Please upload at least one file");
      return;
    }

    // This is a placeholder. In a real app, we would process the file here.
    toast.info("This is a placeholder. In a real implementation, this would process your archive files.");
    
    setTimeout(() => {
      toast.success(`${tool === "create-zip" ? "Archive creation" : "Archive extraction"} simulated successfully!`);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {tool === "create-zip" ? "Create Archive" : "Extract Archive"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <FileUploader 
            onFileUpload={handleFileUpload} 
            accept={tool === "create-zip" ? "*" : ".zip,.rar,.7z"}
            maxSize={500}
          />

          {files.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">
                {tool === "create-zip" ? "Files to Archive:" : "Archive to Extract:"}
              </h3>
              <div className="border rounded-md divide-y max-h-60 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <File className="text-primary h-5 w-5" />
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

          {tool === "create-zip" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Archive Format</h3>
                <Select 
                  value={archiveFormat} 
                  onValueChange={(value) => setArchiveFormat(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="zip">ZIP</SelectItem>
                    <SelectItem value="tar">TAR</SelectItem>
                    <SelectItem value="gz">GZIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Compression Level</h3>
                <Select 
                  value={compressionLevel} 
                  onValueChange={(value) => setCompressionLevel(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="store">Store (No compression)</SelectItem>
                    <SelectItem value="fast">Fast (Less compression)</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="maximum">Maximum (Slower)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <Button 
            onClick={handleProcess} 
            className="w-full"
            disabled={files.length === 0}
          >
            {tool === "create-zip" ? (
              <>
                <Archive className="mr-2 h-4 w-4" />
                Create Archive
              </>
            ) : (
              <>
                <Folder className="mr-2 h-4 w-4" />
                Extract Files
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveConversionModal;
