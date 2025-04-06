
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ConversionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  className?: string;
}

const ConversionCard: React.FC<ConversionCardProps> = ({
  icon: Icon,
  title,
  description,
  onClick,
  className = "",
}) => {
  return (
    <div
      className={`glass-card p-6 transition-all duration-200 flex flex-col items-start gap-4 cursor-pointer animate-fade-in ${className}`}
      onClick={onClick}
    >
      <div className="p-3 bg-primary/10 rounded-lg">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <Button
        variant="default"
        className="mt-auto w-full bg-primary/90 hover:bg-primary"
      >
        Convert
      </Button>
    </div>
  );
};

export default ConversionCard;
