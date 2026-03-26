import { NebulaScene, HUDNav, HUDPanel, HUDButton } from "@/components/hud";
import { Volume2, VolumeX, Vibrate, Bell, Moon, User } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    sound: true,
    haptic: true,
    notifications: true,
    darkMode: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <NebulaScene>
      <div className="min-h-screen flex flex-col">
        <header className="pt-6 px-4">
          <HUDNav />
        </header>

        <main className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              <span className="text-primary text-glow-primary">Settings</span>
            </h1>
          </div>

          <div className="max-w-lg mx-auto space-y-4">
            <HUDPanel variant="small">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {settings.sound ? (
                    <Volume2 className="w-5 h-5 text-primary" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span className="font-medium">Sound Effects</span>
                </div>
                <HUDButton 
                  variant={settings.sound ? "default" : "outline"} 
                  size="sm"
                  onClick={() => toggleSetting('sound')}
                >
                  {settings.sound ? "On" : "Off"}
                </HUDButton>
              </div>
            </HUDPanel>

            <HUDPanel variant="small">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Vibrate className={`w-5 h-5 ${settings.haptic ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-medium">Haptic Feedback</span>
                </div>
                <HUDButton 
                  variant={settings.haptic ? "default" : "outline"} 
                  size="sm"
                  onClick={() => toggleSetting('haptic')}
                >
                  {settings.haptic ? "On" : "Off"}
                </HUDButton>
              </div>
            </HUDPanel>

            <HUDPanel variant="small">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className={`w-5 h-5 ${settings.notifications ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-medium">Notifications</span>
                </div>
                <HUDButton 
                  variant={settings.notifications ? "default" : "outline"} 
                  size="sm"
                  onClick={() => toggleSetting('notifications')}
                >
                  {settings.notifications ? "On" : "Off"}
                </HUDButton>
              </div>
            </HUDPanel>

            <HUDPanel variant="small">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className={`w-5 h-5 ${settings.darkMode ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="font-medium">Dark Mode</span>
                </div>
                <HUDButton 
                  variant={settings.darkMode ? "default" : "outline"} 
                  size="sm"
                  onClick={() => toggleSetting('darkMode')}
                >
                  {settings.darkMode ? "On" : "Off"}
                </HUDButton>
              </div>
            </HUDPanel>

            <HUDPanel variant="small">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary" />
                  <span className="font-medium">Account</span>
                </div>
                <HUDButton variant="outline" size="sm">
                  Manage
                </HUDButton>
              </div>
            </HUDPanel>
          </div>
        </main>
      </div>
    </NebulaScene>
  );
};

export default Settings;
