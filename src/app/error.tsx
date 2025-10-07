"use client"

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react"
import Link from "next/link"

const ErrorPage = ({
    reset
}: {
    error: Error & {digest?: string};
    reset: () => void;
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-[#202124]">
        <div className="text-center space-y-4">
            <div className="flex justify-center">
                <div className="bg-rose-100 p-3 rounded-full">
                    <AlertTriangleIcon 
                        className="size-10 text-rose-500"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-400">
                    Something went wrong or you have been removed
                </h2>
            </div>
        </div>
        <div className="flex items-center gap-x-3">
            <Button
                onClick={reset}
                className="font-medium px-6"
            >
                Try again
            </Button>
            <Button
                asChild
                variant="default"
                className="font-medium px-6 "
            >
                <Link href="/">
                    Go back
                </Link>
            </Button>
        </div>
    </div>
  )
}

export default ErrorPage;
