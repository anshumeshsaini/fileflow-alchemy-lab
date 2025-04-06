
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  FileText,
  Table,
  Code,
  ImageIcon,
  FileIcon,
  Music,
  Archive,
  Sparkles,
  Github,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";

interface SidebarLinkProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  icon,
  label,
  isActive,
  onClick,
}) => (
  <SidebarMenuItem>
    <SidebarMenuButton
      onClick={onClick}
      className={`flex items-center gap-2 w-full ${
        isActive ? "bg-primary/10 text-primary" : ""
      }`}
    >
      {icon}
      <span>{label}</span>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

interface AppSidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  activeCategory,
  setActiveCategory,
}) => {
  const categories = [
    { id: "document", label: "Document", icon: <FileText size={18} /> },
    { id: "data", label: "Data", icon: <Table size={18} /> },
    { id: "encoding", label: "Encoding", icon: <Code size={18} /> },
    { id: "image", label: "Image", icon: <ImageIcon size={18} /> },
    { id: "pdf", label: "PDF", icon: <FileIcon size={18} /> },
    { id: "media", label: "Media", icon: <Music size={18} /> },
    { id: "archive", label: "Archive", icon: <Archive size={18} /> },
    { id: "smart", label: "Smart", icon: <Sparkles size={18} /> },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold">
            FA
          </div>
          <span className="font-semibold text-lg">FileAlchemy</span>
        </div>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          {categories.map((category) => (
            <SidebarLink
              key={category.id}
              icon={category.icon}
              label={category.label}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-4 py-4 flex justify-between items-center">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github size={16} />
          <span>GitHub</span>
        </a>
        <ThemeToggle />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
