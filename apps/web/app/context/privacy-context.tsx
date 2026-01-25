"use client"

import * as React from "react"

interface PrivacyContextType {
    isPrivacyMode: boolean
    togglePrivacyMode: () => void
}

const PrivacyContext = React.createContext<PrivacyContextType | undefined>(undefined)

export function PrivacyProvider({ children }: { children: React.ReactNode }) {
    const [isPrivacyMode, setIsPrivacyMode] = React.useState(true) // Default to true for safety

    const togglePrivacyMode = () => {
        setIsPrivacyMode((prev) => !prev)
    }

    return (
        <PrivacyContext.Provider value={{ isPrivacyMode, togglePrivacyMode }}>
            {children}
        </PrivacyContext.Provider>
    )
}

export function usePrivacy() {
    const context = React.useContext(PrivacyContext)
    if (context === undefined) {
        throw new Error("usePrivacy must be used within a PrivacyProvider")
    }
    return context
}
