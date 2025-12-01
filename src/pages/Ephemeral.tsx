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
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Cloud Created!",
      description: `Your ephemeral cloud "${cloudName}" is ready`,
    });
  };

  const handleJoinCloud = () => {
    if (!accessCode || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter access code and password",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Joining Cloud",
      description: "Connecting to the cloud instance...",
    });
    
    // Navigate to cloud drive page
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
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Cloud className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-3 text-foreground">Ephemeral Cloud</h1>
          <p className="text-muted-foreground text-lg">
            Create or join temporary group cloud storage
          </p>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="create" className="text-lg">
              <Plus className="w-4 h-4 mr-2" />
              Create Cloud
            </TabsTrigger>
            <TabsTrigger value="join" className="text-lg">
              <LogIn className="w-4 h-4 mr-2" />
              Join Cloud
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="animate-fade-in">
            <Card className="p-8 shadow-lg-custom">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">
                Create New Cloud Instance
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="cloud-name" className="text-base mb-2 block">
                    Cloud Name
                  </Label>
                  <Input
                    id="cloud-name"
                    placeholder="e.g., CS101 Lecture"
                    value={cloudName}
                    onChange={(e) => setCloudName(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="cloud-password" className="text-base mb-2 block">
                    Admin Password
                  </Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="cloud-password"
                      type="password"
                      placeholder="Set a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-lg pl-10"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Share this password with authorized users
                  </p>
                </div>

                <div>
                  <Label htmlFor="network" className="text-base mb-2 block">
                    Network Restriction (Optional)
                  </Label>
                  <div className="relative">
                    <Network className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="network"
                      placeholder="e.g., 192.168.1.0/24"
                      value={networkRestriction}
                      onChange={(e) => setNetworkRestriction(e.target.value)}
                      className="text-lg pl-10"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Limit access to specific network ranges
                  </p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg space-y-3">
                  <h3 className="font-semibold text-card-foreground">Features Included:</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Isolated storage for your group
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Folder organization and file management
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Secure access with authentication
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      Automatic cleanup after session
                    </li>
                  </ul>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-gradient-primary hover:opacity-90"
                  onClick={handleCreateCloud}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Cloud Instance
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="join" className="animate-fade-in">
            <Card className="p-8 shadow-lg-custom">
              <h2 className="text-2xl font-bold mb-6 text-card-foreground">
                Join Existing Cloud
              </h2>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="access-code" className="text-base mb-2 block">
                    Access Code
                  </Label>
                  <Input
                    id="access-code"
                    placeholder="Enter cloud access code"
                    value={accessCode}
                    onChange={(e) => setAccessCode(e.target.value)}
                    className="text-lg font-mono"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Get this code from your cloud administrator
                  </p>
                </div>

                <div>
                  <Label htmlFor="join-password" className="text-base mb-2 block">
                    Password
                  </Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="join-password"
                      type="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="text-lg pl-10"
                    />
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 p-6 rounded-lg">
                  <h3 className="font-semibold text-card-foreground mb-3 flex items-center">
                    <Key className="w-5 h-5 mr-2 text-primary" />
                    How to Join
                  </h3>
                  <ol className="space-y-2 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="font-semibold text-primary mr-2">1.</span>
                      Get the access code and password from the cloud creator
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-primary mr-2">2.</span>
                      Ensure you're on the authorized network (if restricted)
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold text-primary mr-2">3.</span>
                      Enter credentials and click join
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
                  Join Cloud
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
