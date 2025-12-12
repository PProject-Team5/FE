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
  { id: "1", name: "Lecture7", type: "folder", modified: "2025-12-10" },
  {
    id: "2",
    name: "최종보고서.pdf",
    type: "file",
    size: "4.2 MB",
    modified: "2025-12-15",
  },
  { id: "3", name: "7주차_과제_폴더", type: "folder", modified: "2025-12-12" },
];

// 날짜 변환 유틸 함수
const formatDate = (dateString: string) => {
  // "YYYY-MM-DD" → "YYYY.MM.DD"
  return dateString.replace(/-/g, ".");
};

const CloudDrive = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folderPath, setFolderPath] = useState<
    Array<{ id: string | null; name: string }>
  >([{ id: null, name: "My Cloud" }]);

  // Get files for current folder
  const files = allFiles.filter(
    (file) =>
      (currentFolderId === null && !file.parentId) ||
      file.parentId === currentFolderId
  );

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
                  돌아가기
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Cloud className="w-6 h-6 text-primary" />
                <h1 className="text-xl font-bold text-foreground">
                  내 클라우드 저장소
                </h1>
              </div>
            </div>
            <Button className="bg-gradient-primary">
              <Upload className="w-4 h-4 mr-2" />
              파일 업로드
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-4 flex items-center gap-2 text-sm">
          {folderPath.map((path, index) => (
            <div key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              )}
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
                <FolderPlus className="w-4 h-4" />새 폴더
              </Button>
            </div>

            <div className="flex gap-2 items-center w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="파일 및 폴더명을 입력하세요"
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
                onClick={() =>
                  item.type === "folder" &&
                  handleFolderClick(item.id, item.name)
                }
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
                      {item.type === "file" && item.size} •{" "}
                      {formatDate(item.modified)}
                    </p>
                  </div>
                  {(item.type === "file" || item.type === "folder") && (
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
                          삭제하기
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
                <div className="col-span-6">이름</div>
                <div className="col-span-2 hidden md:block">크기</div>
                <div className="col-span-3 hidden md:block">수정일</div>
                <div className="col-span-1"></div>
              </div>
              {files.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer group"
                  onClick={() =>
                    item.type === "folder" &&
                    handleFolderClick(item.id, item.name)
                  }
                >
                  <div className="col-span-6 flex items-center gap-3">
                    {item.type === "folder" ? (
                      <Folder className="w-5 h-5 text-primary" />
                    ) : (
                      <File className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span className="truncate text-card-foreground">
                      {item.name}
                    </span>
                  </div>
                  <div className="col-span-2 hidden md:flex items-center text-muted-foreground text-sm">
                    {item.type === "file" ? item.size : "-"}
                  </div>
                  <div className="col-span-3 hidden md:flex items-center text-muted-foreground text-sm">
                    {formatDate(item.modified)}
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
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" />
                          삭제하기
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
