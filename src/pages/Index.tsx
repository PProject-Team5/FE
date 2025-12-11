import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Cloud, Shield, Zap, Lock, Users } from "lucide-react";
import Logo from "@/assets/ic_logo.svg?react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Logo className="mx-auto w-96 h-24" />
          </div>
          {/* <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">ShortCloud</h1> */}
          <h2 className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 font-medium">
            프라이버시 중심 클라우드 & 1회성 안전 공유, 회원가입 없이 바로
            이용해요!
          </h2>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* One-Time Download Card */}
          <Card className="p-8 hover:shadow-lg-custom transition-all duration-300 animate-slide-up bg-card border-2 hover:border-primary">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6 shadow-glow">
              <Upload className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">
              1회성 다운로드
            </h2>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              파일을 업로드하면 짧은 링크(URL)가 생성돼요. 파일은 다운로드 후
              자동 삭제돼요. 회원가입 없이 빠르고 안전하게 파일을 전송해보세요.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">
                  비밀번호/OTP(1회용 인증) 설정 가능
                </span>
              </li>
              <li className="flex items-start">
                <Zap className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">
                  짧고 기억하기 쉬운 링크(URL) 사용
                </span>
              </li>
              <li className="flex items-start">
                <Lock className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">
                  다운로드 횟수 지정 후 자동 삭제
                </span>
              </li>
            </ul>
            <Link to="/one-time">
              <Button
                size="lg"
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                파일 공유 시작하기
              </Button>
            </Link>
          </Card>

          {/* Ephemeral Cloud Card */}
          <Card
            className="p-8 hover:shadow-lg-custom transition-all duration-300 animate-slide-up bg-card border-2 hover:border-secondary"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6 shadow-glow">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">
              임시 그룹 클라우드
            </h2>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              강의, 회의 등에서 일시적으로 그룹별 클라우드를 만들고 함께 파일을
              관리할 수 있어요. 모든 정보는 보안과 함께 세션 종료 시 자동
              삭제돼요.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Cloud className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">
                  그룹별 독립적인 클라우드 인스턴스 제공
                </span>
              </li>
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">
                  네트워크 & 비밀번호로 보안 강화
                </span>
              </li>
              <li className="flex items-start">
                <Users className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">
                  수업, 모임 등 1회성 협업에 적합
                </span>
              </li>
            </ul>
            <Link to="/ephemeral">
              <Button size="lg" variant="secondary" className="w-full">
                그룹 클라우드 만들기
              </Button>
            </Link>
          </Card>
        </div>

        {/* Security Feature */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-card-foreground">
              AI 기반 보안 검사
            </h3>
            <p className="text-center text-muted-foreground text-lg">
              다단계 AI 검사로 부적절한 콘텐츠와 악성코드를 자동 감지해요.
              사용자의 프라이버시는 동의한 경우에만 IP 로그 등으로 안전하게
              보호받아요.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
