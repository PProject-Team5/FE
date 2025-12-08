import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Plus, LogIn, ArrowLeft, Key, Network } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Ephemeral = () => {
  const [cloudName, setCloudName] = useState("");
  const [password, setPassword] = useState("");
  const [networkRestriction, setNetworkRestriction] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCreateCloud = () => {
    if (!cloudName || !password) {
      toast({
        title: "입력 정보가 부족해요",
        description: "모든 필수 항목을 입력해 주세요.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "클라우드가 생성되었어요!",
      description: `임시 그룹 클라우드 \"${cloudName}\" 이 준비되었어요.`,
    });
  };

  const handleJoinCloud = () => {
    if (!accessCode || !password) {
      toast({
        title: "입력 정보가 부족해요",
        description: "참여코드와 비밀번호를 모두 입력해 주세요.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "클라우드에 접속 중입니다",
      description: "클라우드 인스턴스에 연결 중이에요...",
    });
    setTimeout(() => {
      navigate("/cloud-drive");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            홈으로 돌아가기
          </Button>
        </Link>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Cloud className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            임시 그룹 클라우드
          </h1>
          <p className="text-muted-foreground text-lg">
            일시적으로 그룹 스토리지를 만들거나 참여할 수 있어요.
          </p>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="create" className="text-lg">
              <Plus className="w-4 h-4 mr-2" />새 클라우드 생성
            </TabsTrigger>
            <TabsTrigger value="join" className="text-lg">
              <LogIn className="w-4 h-4 mr-2" />
              클라우드 참여
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="animate-fade-in">
            <Card className="p-8 shadow-lg-custom">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">
                새로운 클라우드 만들기
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="cloud-name" className="text-base mb-2 block">
                    클라우드 이름
                  </Label>
                  <Input
                    id="cloud-name"
                    placeholder="예) CS101 강의자료"
                    value={cloudName}
                    onChange={(e) => setCloudName(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label
                    htmlFor="cloud-password"
                    className="text-base mb-2 block"
                  >
                    관리자 비밀번호
                  </Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="cloud-password"
                      type="password"
                      placeholder="강력한 비밀번호를 입력해주세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-lg pl-10"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    인증된 사용자에게 이 비밀번호를 공유해 주세요.
                  </p>
                </div>

                <div>
                  <Label htmlFor="network" className="text-base mb-2 block">
                    네트워크 제한 (선택 사항)
                  </Label>
                  <div className="relative">
                    <Network className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="network"
                      placeholder="예) 192.168.1.0/24"
                      value={networkRestriction}
                      onChange={(e) => setNetworkRestriction(e.target.value)}
                      className="text-lg pl-10"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    특정 네트워크(IP 대역)에서만 접근할 수 있어요.
                  </p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold text-card-foreground">
                    제공 기능
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      그룹별 독립 저장공간
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      폴더/파일 관리 기능
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      인증 기반 보안 접속
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      세션 종료 후 자동 정리
                    </li>
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={handleCreateCloud}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  클라우드 인스턴스 생성하기
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="join" className="animate-fade-in">
            <Card className="p-8 shadow-lg-custom">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">
                기존 클라우드 참여
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="access-code" className="text-base mb-2 block">
                    참여 코드
                  </Label>
                  <Input
                    id="access-code"
                    placeholder="클라우드 참여 코드를 입력해 주세요"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="text-lg font-mono"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    클라우드 생성자에게서 코드를 받아 입력해 주세요.
                  </p>
                </div>

                <div>
                  <Label
                    htmlFor="join-password"
                    className="text-base mb-2 block"
                  >
                    비밀번호
                  </Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="join-password"
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-lg pl-10"
                    />
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-card-foreground mb-3 flex items-center">
                    <Key className="w-5 h-5 mr-2 text-primary" />
                    참여 안내
                  </h3>
                  <ol className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-semibold text-primary mr-2">
                        1.
                      </span>
                      클라우드 공유자에게서 참여 코드와 비밀번호를 받아요.
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-primary mr-2">
                        2.
                      </span>
                      네트워크 제한 시, 허용된 네트워크에서 접속해야 해요.
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-primary mr-2">
                        3.
                      </span>
                      정보를 입력하고 참여하기를 눌러요.
                    </li>
                  </ol>
                </div>

                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full"
                  onClick={handleJoinCloud}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  클라우드 참여하기
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Ephemeral;
