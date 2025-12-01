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
  ChevronRight,
  Home,
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
  parentId?: string;
}

// Mock data structure with folders and their contents
const allFiles: FileItem[] = [
  // Root level
  { id: "1", name: "Lecture Materials", type: "folder", modified: "2024-11-28" },
  { id: "2", name: "Assignments", type: "folder", modified: "2024-11-27" },
  { id: "3", name: "Resources", type: "folder", modified: "2024-11-26" },
  { id: "4", name: "Presentation.pdf", type: "file", size: "2.4 MB", modified: "2024-11-28" },
  { id: "5", name: "Notes.docx", type: "file", size: "1.2 MB", modified: "2024-11-27" },
  { id: "6", name: "Image.png", type: "file", size: "856 KB", modified: "2024-11-26" },
  
  // Inside "Lecture Materials" folder
  { id: "7", name: "Week 1", type: "folder", modified: "2024-11-20", parentId: "1" },
  { id: "8", name: "Week 2", type: "folder", modified: "2024-11-21", parentId: "1" },
  { id: "9", name: "Syllabus.pdf", type: "file", size: "450 KB", modified: "2024-11-15", parentId: "1" },
  
  // Inside "Assignments" folder
  { id: "10", name: "Assignment1.pdf", type: "file", size: "1.1 MB", modified: "2024-11-25", parentId: "2" },
  { id: "11", name: "Assignment2.pdf", type: "file", size: "980 KB", modified: "2024-11-26", parentId: "2" },
  
  // Inside "Resources" folder
  { id: "12", name: "Textbook.pdf", type: "file", size: "15.2 MB", modified: "2024-11-10", parentId: "3" },
  { id: "13", name: "References", type: "folder", modified: "2024-11-12", parentId: "3" },
];

const CloudDrive = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<Array<{ id: string | null; name: string }>>([
    { id: null, name: "My Cloud" },
  ]);

  // Get files for current folder
  const files = allFiles.filter((file) => file.parentId === currentFolderId);

  const handleFolderClick = (folderId: string, folderName: string) => {
    setCurrentFolderId(folderId);
    setFolderPath([...folderPath, { id: folderId, name: folderName }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = folderPath.slice(0, index + 1);
    setFolderPath(newPath);
    setCurrentFolderId(newPath[newPath.length - 1].id);
  };

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
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm">
          {folderPath.map((path, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className={`flex items-center gap-1 hover:text-primary transition-colors ${
                  index === folderPath.length - 1
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground"
                }`}
              >
                {index === 0 && <Home className="w-4 h-4" />}
                {path.name}
              </button>
            </div>
          ))}
        </div>

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
                onClick={() => item.type === "folder" && handleFolderClick(item.id, item.name)}
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
                  {item.type === "file" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
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
                  )}
                  {item.type === "folder" && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
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
                  onClick={() => item.type === "folder" && handleFolderClick(item.id, item.name)}
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
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {item.type === "file" && (
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                        )}
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
