"use client"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePrivacy } from "@/app/context/privacy-context"

export function PrivacyToggle() {
    const { isPrivacyMode, togglePrivacyMode } = usePrivacy()

    return (
        <Button variant="ghost" size="icon" onClick={togglePrivacyMode} title={isPrivacyMode ? "Privacy Mode On (Details Hidden)" : "Privacy Mode Off (Details Visible)"}>
            {isPrivacyMode ? <EyeOff className="h-4 w-4 text-emerald-500" /> : <Eye className="h-4 w-4 text-orange-500" />}
            <span className="sr-only">Toggle Privacy Mode</span>
        </Button>
    )
}
