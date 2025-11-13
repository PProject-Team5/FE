import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, Cloud, Shield, Zap, Lock, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Cloud className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
            ShortCloud
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Privacy-first cloud storage with ephemeral sharing. No login required.
          </p>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {/* One-Time Download Card */}
          <Card className="p-8 hover:shadow-lg-custom transition-all duration-300 animate-slide-up bg-card border-2 hover:border-primary">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6 shadow-glow">
              <Upload className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">One-Time Download</h2>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Upload files and get a short URL. Files are automatically deleted after download. 
              Perfect for quick, secure file sharing without accounts.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">Optional password protection & OTP</span>
              </li>
              <li className="flex items-start">
                <Zap className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">Short, memorable URLs (e.g., /abc123)</span>
              </li>
              <li className="flex items-start">
                <Lock className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">Auto-delete after custom download limit</span>
              </li>
            </ul>
            <Link to="/one-time">
              <Button size="lg" className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                Start Sharing Files
              </Button>
            </Link>
          </Card>

          {/* Ephemeral Cloud Card */}
          <Card className="p-8 hover:shadow-lg-custom transition-all duration-300 animate-slide-up bg-card border-2 hover:border-secondary" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-primary mb-6 shadow-glow">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">Ephemeral Cloud</h2>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Create temporary group clouds for classrooms or meetings. Isolated, secure, 
              and automatically managed.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <Cloud className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">Isolated cloud instances for each group</span>
              </li>
              <li className="flex items-start">
                <Shield className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">Network & password protection</span>
              </li>
              <li className="flex items-start">
                <Users className="w-5 h-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-card-foreground">Perfect for classes and one-time meetings</span>
              </li>
            </ul>
            <Link to="/ephemeral">
              <Button size="lg" variant="secondary" className="w-full">
                Create Group Cloud
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
              AI-Powered Security
            </h3>
            <p className="text-center text-muted-foreground text-lg">
              Multi-stage AI inspection detects inappropriate content and malware. 
              Your privacy is protected with IP logging and user consent.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
