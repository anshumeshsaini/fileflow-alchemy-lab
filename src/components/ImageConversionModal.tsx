
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ImageIcon, Download } from "lucide-react";

interface ImageConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool?: string;
}

const ImageConversionModal: React.FC<ImageConversionModalProps> = ({
  isOpen,
  onClose,
  tool = "image-conversion",
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [outputFormat, setOutputFormat] = useState<string>("png");
  const [imageWidth, setImageWidth] = useState<number>(800);
  const [imageHeight, setImageHeight] = useState<number>(600);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [quality, setQuality] = useState<number>(90);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Get original dimensions
    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ width: img.width, height: img.height });
      setImageWidth(img.width);
      setImageHeight(img.height);
    };
    img.src = url;
    
    toast.success("Image loaded successfully");
  };

  const handleWidthChange = (width: number) => {
    setImageWidth(width);
    if (maintainAspectRatio && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      setImageHeight(Math.round(width * ratio));
    }
  };

  const handleHeightChange = (height: number) => {
    setImageHeight(height);
    if (maintainAspectRatio && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      setImageWidth(Math.round(height * ratio));
    }
  };

  const handleConvert = () => {
    if (!selectedFile || !previewUrl) {
      toast.error("Please upload an image first");
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      canvas.width = imageWidth;
      canvas.height = imageHeight;
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        toast.error("Could not create canvas context");
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
        
        // Convert to desired format
        let mimeType = "image/png";
        switch (outputFormat) {
          case "jpeg":
          case "jpg":
            mimeType = "image/jpeg";
            break;
          case "webp":
            mimeType = "image/webp";
            break;
          case "png":
          default:
            mimeType = "image/png";
            break;
        }
        
        // Create download link
        try {
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `converted-image.${outputFormat}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              toast.success("Image converted successfully");
            } else {
              toast.error("Failed to convert image");
            }
          }, mimeType, quality / 100);
        } catch (error) {
          toast.error("Error converting image: " + (error as Error).message);
        }
      };
      
      img.src = previewUrl;
    } catch (error) {
      toast.error("Error converting image: " + (error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {tool === "image-conversion" ? "Image Conversion" : "Image Resize"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <FileUploader 
              onFileUpload={handleFileUpload} 
              accept="image/*"
              maxSize={10}
            />

            {tool === "image-conversion" && (
              <div className="space-y-2">
                <Label>Output Format</Label>
                <Select 
                  value={outputFormat} 
                  onValueChange={(value) => setOutputFormat(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpeg">JPEG</SelectItem>
                    <SelectItem value="webp">WebP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {(tool === "image-resize" || tool === "image-conversion") && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Width (px): {imageWidth}</Label>
                    <input 
                      type="number"
                      value={imageWidth}
                      onChange={(e) => handleWidthChange(Number(e.target.value))}
                      className="w-20 h-8 rounded border px-2"
                    />
                  </div>
                  <Slider 
                    value={[imageWidth]} 
                    onValueChange={(value) => handleWidthChange(value[0])}
                    max={originalDimensions.width * 2}
                    step={1}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Height (px): {imageHeight}</Label>
                    <input 
                      type="number"
                      value={imageHeight}
                      onChange={(e) => handleHeightChange(Number(e.target.value))}
                      className="w-20 h-8 rounded border px-2"
                    />
                  </div>
                  <Slider 
                    value={[imageHeight]} 
                    onValueChange={(value) => handleHeightChange(value[0])}
                    max={originalDimensions.height * 2}
                    step={1}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="aspect-ratio"
                    checked={maintainAspectRatio}
                    onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  />
                  <Label htmlFor="aspect-ratio">Maintain aspect ratio</Label>
                </div>
              </div>
            )}

            {outputFormat === "jpeg" && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Quality: {quality}%</Label>
                </div>
                <Slider 
                  value={[quality]} 
                  onValueChange={(value) => setQuality(value[0])}
                  max={100}
                  step={1}
                />
              </div>
            )}

            <Button 
              onClick={handleConvert} 
              className="w-full"
              disabled={!selectedFile}
            >
              <Download className="mr-2 h-4 w-4" />
              Convert
            </Button>
          </div>

          <div className="border rounded-md p-4 flex flex-col items-center justify-center bg-secondary/20 h-[400px]">
            {previewUrl ? (
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center text-muted-foreground">
                <ImageIcon className="h-16 w-16 mb-2" />
                <p>Image preview will appear here</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageConversionModal;
