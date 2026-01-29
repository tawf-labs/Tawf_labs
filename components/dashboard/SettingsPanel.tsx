"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface SettingsPanelProps {
  connected: boolean
  account: string | null
  onDisconnect: () => void
}

export function SettingsPanel({
  connected,
  account,
  onDisconnect,
}: SettingsPanelProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-[#FFC700] to-[#ffe38a] bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account preferences
        </p>
      </div>

      {/* Wallet Connection */}
      <Card className="bg-black/95 border border-gray-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-gray-300">Connected Wallet</Label>
              <div className="text-sm text-gray-400 mt-1">
                {connected ? account : "Not connected"}
              </div>
            </div>
            {connected && (
              <Button
                onClick={onDisconnect}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10"
              >
                Disconnect
              </Button>
            )}
          </div>
          {connected && (
            <>
              <Separator className="bg-gray-800" />
              <div className="flex justify-between items-center">
                <div>
                  <Label className="text-gray-300">Network</Label>
                  <div className="text-sm text-gray-400 mt-1">
                    Base Sepolia / Lisk Sepolia
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Switch Network
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card className="bg-black/95 border border-gray-800 mb-6">
        <CardHeader>
          <CardTitle className="text-white">Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <Label className="text-gray-300">Dark Mode</Label>
              <div className="text-sm text-gray-400 mt-1">
                Toggle dark/light theme
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 bg-[#FFC700]/20 border-[#FFC700]/30 text-white"
            >
              Dark
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About */}
      <Card className="bg-black/95 border border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Version</span>
            <span className="text-white">1.0.0</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Terms of Service</span>
            <a href="#" className="text-[#FFC700] hover:text-[#ffe38a]">
              View
            </a>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Privacy Policy</span>
            <a href="#" className="text-[#FFC700] hover:text-[#ffe38a]">
              View
            </a>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Support</span>
            <a href="#" className="text-[#FFC700] hover:text-[#ffe38a]">
              Contact
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPanel
