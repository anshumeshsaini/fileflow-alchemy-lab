
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music, Video, Clock, Download } from "lucide-react";
import { Input } from "@/components/ui/input";

interface MediaConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool?: string;
}

const MediaConversionModal: React.FC<MediaConversionModalProps> = ({
  isOpen,
  onClose,
  tool = "audio-conversion",
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState(tool === "audio-conversion" ? "mp3" : "mp4");
  const [startTime, setStartTime] = useState("00:00:00");
  const [endTime, setEndTime] = useState("00:01:00");
  const [quality, setQuality] = useState(320); // For audio: kbps, for video: arbitrary scale

  const handleFileUpload = (file: File) => {
    const isAudioTool = tool === "audio-conversion";
    
    if (isAudioTool && !file.type.includes("audio/")) {
      toast.error("Please upload an audio file");
      return;
    }
    
    if (tool === "media-trim" && (!file.type.includes("audio/") && !file.type.includes("video/"))) {
      toast.error("Please upload an audio or video file");
      return;
    }

    setSelectedFile(file);
    toast.success(`File "${file.name}" loaded successfully`);
  };

  const handleConvert = () => {
    if (!selectedFile) {
      toast.error("Please upload a file first");
      return;
    }

    // This is a placeholder. In a real app, we would process the file here.
    toast.info("This is a placeholder. In a real implementation, this would convert your media file.");
    
    setTimeout(() => {
      toast.success(`${tool === "audio-conversion" ? "Audio" : "Media"} conversion simulated successfully!`);
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {tool === "audio-conversion" ? "Audio Conversion" : "Media Trimming"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <FileUploader 
            onFileUpload={handleFileUpload} 
            accept={tool === "audio-conversion" ? "audio/*" : "audio/*,video/*"}
            maxSize={100}
          />

          {selectedFile && (
            <>
              {tool === "audio-conversion" && (
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
                      <SelectItem value="mp3">MP3</SelectItem>
                      <SelectItem value="wav">WAV</SelectItem>
                      <SelectItem value="ogg">OGG</SelectItem>
                      <SelectItem value="flac">FLAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {tool === "media-trim" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time (HH:MM:SS)</Label>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          value={startTime} 
                          onChange={(e) => setStartTime(e.target.value)}
                          placeholder="00:00:00"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>End Time (HH:MM:SS)</Label>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          value={endTime} 
                          onChange={(e) => setEndTime(e.target.value)}
                          placeholder="00:01:00"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>
                    {tool === "audio-conversion" 
                      ? `Quality: ${quality} kbps` 
                      : `Quality: ${quality === 100 ? "Original" : quality < 50 ? "Low" : quality < 80 ? "Medium" : "High"}`}
                  </Label>
                </div>
                <Slider 
                  value={[quality]} 
                  onValueChange={(value) => setQuality(value[0])}
                  max={tool === "audio-conversion" ? 320 : 100}
                  step={tool === "audio-conversion" ? 32 : 1}
                />
              </div>

              <Button onClick={handleConvert} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                {tool === "audio-conversion" ? "Convert Audio" : "Trim Media"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaConversionModal;
