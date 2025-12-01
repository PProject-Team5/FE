import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Cloud,
  Folder,
  File,
  Upload,
  Search,
  Grid3x3,
  List,
  ArrowLeft,
  MoreVertical,
  Download,
  Trash2,
  FolderPlus,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file";
  size?: string;
  modified: string;
}

const CloudDrive = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demonstration
  const files: FileItem[] = [
    { id: "1", name: "Lecture Materials", type: "folder", modified: "2024-11-28" },
    { id: "2", name: "Assignments", type: "folder", modified: "2024-11-27" },
    { id: "3", name: "Resources", type: "folder", modified: "2024-11-26" },
    { id: "4", name: "Presentation.pdf", type: "file", size: "2.4 MB", modified: "2024-11-28" },
    { id: "5", name: "Notes.docx", type: "file", size: "1.2 MB", modified: "2024-11-27" },
    { id: "6", name: "Image.png", type: "file", size: "856 KB", modified: "2024-11-26" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/ephemeral">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Cloud className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">My Cloud Storage</h1>
              </div>
            </div>
            <Button className="bg-gradient-primary">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <Card className="p-4 mb-6 shadow-lg-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="gap-2">
                <FolderPlus className="w-4 h-4" />
                New Folder
              </Button>
            </div>

            <div className="flex gap-2 items-center w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search files..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-1 border border-border rounded-md p-1">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* File/Folder Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {files.map((item) => (
              <Card
                key={item.id}
                className="p-4 hover:shadow-md-custom transition-all cursor-pointer group animate-fade-in"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                    {item.type === "folder" ? (
                      <Folder className="w-16 h-16 text-primary" />
                    ) : (
                      <File className="w-16 h-16 text-muted-foreground" />
                    )}
                  </div>
                  <div className="w-full">
                    <p className="text-sm font-medium truncate text-card-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.type === "file" && item.size} • {item.modified}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* File/Folder List View */}
        {viewMode === "list" && (
          <Card className="shadow-lg-custom animate-fade-in">
            <div className="divide-y divide-border">
              <div className="grid grid-cols-12 gap-4 p-4 bg-muted/50 font-semibold text-sm">
                <div className="col-span-6">Name</div>
                <div className="col-span-2 hidden md:block">Size</div>
                <div className="col-span-3 hidden md:block">Modified</div>
                <div className="col-span-1"></div>
              </div>
              {files.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                >
                  <div className="col-span-6 flex items-center gap-3">
                    {item.type === "folder" ? (
                      <Folder className="w-5 h-5 text-primary" />
                    ) : (
                      <File className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="truncate text-card-foreground">{item.name}</span>
                  </div>
                  <div className="col-span-2 hidden md:flex items-center text-muted-foreground text-sm">
                    {item.type === "file" ? item.size : "-"}
                  </div>
                  <div className="col-span-3 hidden md:flex items-center text-muted-foreground text-sm">
                    {item.modified}
                  </div>
                  <div className="col-span-1 flex items-center justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CloudDrive;
