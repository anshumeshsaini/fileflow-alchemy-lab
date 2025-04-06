
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  convertToBase64, 
  convertFromBase64, 
  convertNumberToHex, 
  convertNumberToBinary,
  convertHexToDecimal,
  convertBinaryToDecimal,
  encodeURL,
  decodeURL,
  generateMD5Hash
} from "@/services/conversionService";
import { toast } from "sonner";

interface EncodingConversionModalProps {
  isOpen: boolean;
  onClose: () => void;
  tool: string;
}

const EncodingConversionModal: React.FC<EncodingConversionModalProps> = ({ isOpen, onClose, tool }) => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [conversionType, setConversionType] = useState("encode");
  const [numberSystem, setNumberSystem] = useState("decimal");
  const [targetSystem, setTargetSystem] = useState("binary");

  const handleConvert = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some content to convert");
      return;
    }

    try {
      let result = "";

      switch (tool) {
        case "base64":
          result = conversionType === "encode" 
            ? convertToBase64(inputText)
            : convertFromBase64(inputText);
          break;
        case "number-conversion":
          if (numberSystem === "decimal") {
            const num = parseInt(inputText, 10);
            if (isNaN(num)) {
              throw new Error("Invalid decimal number");
            }
            result = targetSystem === "binary" 
              ? convertNumberToBinary(num)
              : convertNumberToHex(num);
          } else if (numberSystem === "binary") {
            if (!/^[01]+$/.test(inputText)) {
              throw new Error("Invalid binary number");
            }
            result = convertBinaryToDecimal(inputText).toString();
          } else if (numberSystem === "hex") {
            if (!/^[0-9A-Fa-f]+$/.test(inputText)) {
              throw new Error("Invalid hexadecimal number");
            }
            result = convertHexToDecimal(inputText).toString();
          }
          break;
        case "url-encode":
          result = conversionType === "encode" 
            ? encodeURL(inputText)
            : decodeURL(inputText);
          break;
        case "hash":
          result = await generateMD5Hash(inputText);
          break;
        default:
          toast.error("Unsupported conversion tool");
          return;
      }

      setOutputText(result);
      toast.success("Conversion completed successfully");
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Failed to convert: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  const renderToolSpecificOptions = () => {
    switch (tool) {
      case "base64":
      case "url-encode":
        return (
          <RadioGroup 
            value={conversionType} 
            onValueChange={setConversionType}
            className="flex space-x-4 mb-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="encode" id="encode" />
              <Label htmlFor="encode">Encode</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="decode" id="decode" />
              <Label htmlFor="decode">Decode</Label>
            </div>
          </RadioGroup>
        );
      case "number-conversion":
        return (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="numberSystem">From:</Label>
              <RadioGroup 
                value={numberSystem} 
                onValueChange={setNumberSystem}
                className="mt-2 space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="decimal" id="decimal" />
                  <Label htmlFor="decimal">Decimal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="binary" id="binary" />
                  <Label htmlFor="binary">Binary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hex" id="hex" />
                  <Label htmlFor="hex">Hexadecimal</Label>
                </div>
              </RadioGroup>
            </div>
            {numberSystem === "decimal" && (
              <div>
                <Label htmlFor="targetSystem">To:</Label>
                <RadioGroup 
                  value={targetSystem} 
                  onValueChange={setTargetSystem}
                  className="mt-2 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="binary" id="to-binary" />
                    <Label htmlFor="to-binary">Binary</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hex" id="to-hex" />
                    <Label htmlFor="to-hex">Hexadecimal</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (tool) {
      case "base64": return "Base64 Conversion";
      case "number-conversion": return "Number System Conversion";
      case "url-encode": return "URL Encode/Decode";
      case "hash": return "Hash Generator";
      default: return "Encoding Conversion";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
          <DialogDescription>
            {tool === "hash" 
              ? "Generate hash values from text input" 
              : "Convert between different encoding formats"}
          </DialogDescription>
        </DialogHeader>

        {renderToolSpecificOptions()}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="inputText">Input:</Label>
            <Textarea
              id="inputText"
              placeholder="Enter your text here..."
              className="h-48 font-mono"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="outputText">Output:</Label>
            <Textarea
              id="outputText"
              placeholder="Converted content will appear here..."
              className="h-48 font-mono"
              value={outputText}
              readOnly
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConvert}>Convert</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EncodingConversionModal;
