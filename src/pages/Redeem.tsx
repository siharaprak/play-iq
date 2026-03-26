import { NebulaScene, HUDNav, HUDPanel, HUDButton } from "@/components/hud";
import { KeyRound, Check, AlertCircle } from "lucide-react";
import { useState } from "react";

const Redeem = () => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleRedeem = () => {
    // Placeholder logic
    if (code.length >= 6) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <HUDPanel variant="hero" className="max-w-md w-full text-center">
            <div className="flex flex-col items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-tertiary/20 flex items-center justify-center border-2 border-tertiary/50">
                <KeyRound className="w-10 h-10 text-tertiary" />
              </div>
              
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Redeem Your <span className="text-tertiary">Blocks Code</span>
                </h1>
                <p className="text-muted-foreground">
                  Enter the code that came with your PlayIQ blocks to unlock AR Worlds
                </p>
              </div>

              <div className="w-full">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="ENTER-CODE-HERE"
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-center text-xl font-mono tracking-widest text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  maxLength={20}
                />
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-success">
                  <Check className="w-5 h-5" />
                  <span>Code redeemed successfully! AR Worlds unlocked.</span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="w-5 h-5" />
                  <span>Invalid code. Please try again.</span>
                </div>
              )}

              <HUDButton 
                variant="glow" 
                size="lg" 
                onClick={handleRedeem}
                disabled={code.length < 6}
              >
                Redeem Code
              </HUDButton>
            </div>
          </HUDPanel>
        </main>
      </div>
    </NebulaScene>
  );
};

export default Redeem;
