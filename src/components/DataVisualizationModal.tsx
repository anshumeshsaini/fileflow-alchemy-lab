
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import FileUploader from "./FileUploader";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { convertCSVToJSON } from "@/services/conversionService";

interface DataVisualizationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const DataVisualizationModal: React.FC<DataVisualizationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [inputText, setInputText] = useState("");
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");
  const [dataFormat, setDataFormat] = useState<"json" | "csv">("json");

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        if (dataFormat === "csv") {
          const jsonData = convertCSVToJSON(content);
          setData(JSON.parse(jsonData));
          setInputText(content);
        } else {
          setData(JSON.parse(content));
          setInputText(content);
        }
        toast.success("Data loaded successfully");
      } catch (error) {
        toast.error("Error parsing file: " + (error as Error).message);
      }
    };
    reader.readAsText(file);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const handleVisualize = () => {
    try {
      if (dataFormat === "csv") {
        const jsonData = convertCSVToJSON(inputText);
        setData(JSON.parse(jsonData));
      } else {
        setData(JSON.parse(inputText));
      }
      toast.success("Data visualized successfully");
    } catch (error) {
      toast.error("Error parsing data: " + (error as Error).message);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Data Visualization
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="input" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="visualization">Visualization</TabsTrigger>
          </TabsList>
          <TabsContent value="input" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Data Format</span>
                <Tabs defaultValue="json" onValueChange={(v) => setDataFormat(v as "json" | "csv")}>
                  <TabsList>
                    <TabsTrigger value="json">JSON</TabsTrigger>
                    <TabsTrigger value="csv">CSV</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Chart Type</span>
                <Tabs defaultValue="bar" onValueChange={(v) => setChartType(v as "bar" | "pie")}>
                  <TabsList>
                    <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                    <TabsTrigger value="pie">Pie Chart</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <FileUploader 
              onFileUpload={handleFileUpload} 
              accept={dataFormat === "json" ? ".json" : ".csv"}
              className="mb-4"
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Or paste your {dataFormat.toUpperCase()} data here:
              </label>
              <Textarea
                placeholder={`Enter your ${dataFormat.toUpperCase()} data here...`}
                className="min-h-[200px] font-mono"
                value={inputText}
                onChange={handleTextChange}
              />
            </div>

            <Button onClick={handleVisualize} className="w-full">
              Visualize Data
            </Button>
          </TabsContent>
          <TabsContent value="visualization" className="space-y-4">
            {data.length > 0 ? (
              <div className="h-[400px] w-full">
                {chartType === "bar" ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={data}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      {Object.keys(data[0] || {})
                        .filter((key) => key !== "name" && typeof data[0][key] === "number")
                        .map((key, index) => (
                          <Bar
                            key={key}
                            dataKey={key}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey={Object.keys(data[0] || {}).find(
                          (key) => key !== "name" && typeof data[0][key] === "number"
                        )}
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {data.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            ) : (
              <div className="h-[400px] w-full flex items-center justify-center">
                <p className="text-muted-foreground">
                  No data to visualize. Please enter some data on the input tab.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DataVisualizationModal;
