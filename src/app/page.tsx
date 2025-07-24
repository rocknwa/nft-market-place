"use client"

import { useAccount } from "wagmi"
import RecentlyListedNFTs from "@/components/RecentlyListed"
import { useEffect, useState } from "react"

export default function Home() {
    const { isConnected } = useAccount()
    const [isCompliant, setIsCompliant] = useState(true)
        const {address} = useAccount()
    
        useEffect(() => {
            if (address) { checkComplaince}
        }, [address])
    
        async function checkComplaince () {
            if (!address) return
    
            const response = await fetch("/api/compliance", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ address })
            })
            const result = await response.json()
            setIsCompliant(result.success && result.isApproved)
        }

    return (
        <main>
            {!isConnected ? (
                <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
                    Please connect a wallet
                </div>
            ) : (
                isCompliant ? (
                <div className="flex items-center justify-center p-4 md:p-6 xl:p-8">
                    <RecentlyListedNFTs />
                </div>) : (
                    <div className="flex items-center justify-center h-screen">
                        <div className="bg-white p-6 rounded shadow-md text-center">
                            <h1 className="text-2xl font-bold mb-4">Compliance Check Failed</h1>
                            <p className="text-gray-600">Your address does not meet the compliance requirements to access this marketplace.</p>
                        </div>
                    </div>
                )

            )}

        </main>
    )
}
