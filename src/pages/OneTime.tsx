import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Upload, Link as LinkIcon, Copy, Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const OneTime = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [useOTP, setUseOTP] = useState(false);
  const [password, setPassword] = useState("");
  const [maxDownloads, setMaxDownloads] = useState("1");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleGenerate = () => {
    if (!file) {
      toast({
        title: "파일이 선택되지 않았어요",
        description: "업로드할 파일을 선택해 주세요.",
        variant: "destructive",
      });
      return;
    }

    // Generate a random short URL (demo)
    const randomId = Math.random().toString(36).substring(2, 8);
    const url = `${window.location.origin}/${randomId}`;
    setGeneratedUrl(url);

    toast({
      title: "링크가 생성되었어요!",
      description: "파일을 공유할 준비가 되었어요.",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    toast({
      title: "복사 완료!",
      description: "링크가 복사되었어요.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Button>
        </Link>

        <Card className="p-8 shadow-lg-custom">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 text-card-foreground">
              1회성 다운로드 링크 생성
            </h1>
            <p className="text-muted-foreground text-lg">
              업로드한 파일이 자동으로 삭제돼요.
            </p>
          </div>

          {/* File Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 mb-8 ${
              isDragging
                ? "border-primary bg-primary/5 scale-105"
                : "border-border hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
                  <Check className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-card-foreground text-lg">
                    {file.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)}MB
                  </p>
                </div>
                <Button variant="outline" onClick={() => setFile(null)}>
                  파일 삭제하기
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-card-foreground mb-2">
                    Drag and drop your file here
                  </p>
                  <p className="text-sm text-muted-foreground">or</p>
                </div>
                <label>
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span>Browse Files</span>
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-6 mb-8">
            <div>
              <Label htmlFor="downloads" className="text-base mb-2 block">
                최대 다운로드 횟수
              </Label>
              <Input
                id="downloads"
                type="number"
                min="1"
                value={maxDownloads}
                onChange={(e) => setMaxDownloads(e.target.value)}
                className="text-lg"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex-1">
                <Label
                  htmlFor="password-switch"
                  className="text-base font-semibold cursor-pointer"
                >
                  비밀번호 설정
                </Label>
                <p className="text-sm text-muted-foreground">
                  다운로드 시 비밀번호를 입력해야 해요.
                </p>
              </div>
              <Switch
                id="password-switch"
                checked={usePassword}
                onCheckedChange={setUsePassword}
              />
            </div>

            {usePassword && (
              <div className="ml-4 animate-slide-up">
                <Input
                  type="password"
                  placeholder="비밀번호를 입력해 주세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex-1">
                <Label
                  htmlFor="otp-switch"
                  className="text-base font-semibold cursor-pointer"
                >
                  이메일 인증(OTP)
                </Label>
                <p className="text-sm text-muted-foreground">
                  이메일로 1회용 코드를 받을 수 있어요.
                </p>
              </div>
              <Switch
                id="otp-switch"
                checked={useOTP}
                onCheckedChange={setUseOTP}
              />
            </div>
          </div>

          {/* Generate Button */}
          <Button
            size="lg"
            className="w-full mb-6 bg-gradient-primary hover:opacity-90"
            onClick={handleGenerate}
            disabled={!file}
          >
            <LinkIcon className="w-5 h-5 mr-2" />
            링크 생성하기
          </Button>

          {/* Generated URL */}
          {generatedUrl && (
            <Card className="p-6 bg-primary/5 border-primary/20 animate-slide-up">
              <Label className="text-sm text-muted-foreground mb-2 block">
                다운로드 링크
              </Label>
              <div className="flex gap-2">
                <Input
                  value={generatedUrl}
                  readOnly
                  className="font-mono text-lg"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopy}
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-3">
                이 파일은 {maxDownloads}회 다운로드 이후 삭제돼요.
              </p>
            </Card>
          )}
        </Card>
      </div>
    </div>
  );
};

export default OneTime;
