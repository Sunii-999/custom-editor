"use client"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "@/components/ui/carousel"
import { templates } from "@/constants/templates";
import { cn } from "@/lib/utils"
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";

export const TemplateGallery = () => {

    const router = useRouter();
    // Assuming `api.documents.create` and the data structure remain the same.
    const create = useMutation(api.documents.create); 
    const [isCreating, setIsCreating] = useState(false);

    const onTemplateClick = (title: string, initialContent:string) => {
        setIsCreating(true);
        create({title, initialContent})
            .catch(() => toast.error("Something went wrong"))
            .then((documentId) => {
                router.push(`/documents/${documentId}`);
                toast.success("Document created")
            })
            .finally(() => {
                setIsCreating(false);
            });
    };

    return(
        // 1. Dark background color for the container
        <div className="bg-[#202124]"> 
            <div className="max-w-screen-xl mx-auto px-16 py-8 flex flex-col gap-y-6 text-gray-200">
                <h3 className="font-semibold text-xl">
                    Start a new document
                </h3>
                <Carousel className="relative">
                    <CarouselContent className="-ml-4">
                        {templates.map((template) => (
                            <CarouselItem 
                                key={template.id}
                                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
                             >
                                <div
                                    className={cn(
                                        "aspect-[3/4] flex flex-col gap-y-2.5",
                                        // Dark theme disable state
                                        isCreating && "pointer-events-none opacity-40 transition-opacity duration-300"
                                    )}
                                >
                                    <button
                                        disabled={isCreating}
                                        onClick={() => onTemplateClick(template.label, template.initialContent)}
                                        style={{
                                            backgroundImage: `url(${template.imageUrl})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat"
                                        }}
                                        // 2. Dark theme card styles: shadow, rounded corners, lighter dark background, and a blue ring hover effect.
                                        className="size-full shadow-lg rounded-lg transition 
                                                   flex flex-col items-center justify-center gap-y-4 
                                                   bg-[#2f3032] 
                                                   hover:ring-2 hover:ring-blue-500 hover:scale-[1.02] active:scale-[0.98] 
                                                   transform duration-150 ease-in-out"   
                                    />
                                    <p className="text-sm font-medium truncate text-gray-200">
                                        {template.label}
                                    </p>
                                </div>
                             </CarouselItem>
                        ))}
                    </CarouselContent>
                    
                    <CarouselPrevious className="absolute left-[-2rem] top-1/2 -translate-y-1/2 
                                                   h-10 w-10 rounded-full bg-gray-800/80 text-white border-none 
                                                   shadow-xl hover:bg-gray-700/90 disabled:opacity-30 disabled:pointer-events-none"/>
                    <CarouselNext className="absolute right-[-2rem] top-1/2 -translate-y-1/2 
                                                  h-10 w-10 rounded-full bg-gray-800/80 text-white border-none 
                                                  shadow-xl hover:bg-gray-700/90 disabled:opacity-30 disabled:pointer-events-none"/>
                </Carousel>
            </div>
        </div>
    )
}