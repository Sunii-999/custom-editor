import React, { useRef, useState } from "react"

import { BsCloudCheck } from "react-icons/bs"
import { Id } from "../../../../convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useDebounce } from "@/hooks/use-debounce"
import { toast } from "sonner"

interface DocumentInputProps {
    title: string,
    id: Id<"documents">
}


export const DocumentInput = ({title, id}: DocumentInputProps) => {

    console.log("DocumentInput props:", { id, title });


    const [value, setValue] = useState(title)
    const [isError, setIsError] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const mutate = useMutation(api.documents.updateById)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsPending(true)
        mutate({id, title: value})
        .then(() => toast.success("Document updated"))
        .catch(() => toast.error("Document update failed"))
        .finally(() => 
            setIsPending(false)
        )
    }


    const debounceUpdate = useDebounce((newValue: string) => {
        if (newValue === title) return

        setIsPending(true)
        mutate({id, title: newValue})
        .then(() => {
            toast.success("Document updated");
            setIsEditing(false)})
        .catch(() => toast.error("Document update failed"))
        .finally(() => 
            setIsPending(false)
        )
    })

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)
        debounceUpdate(newValue)
    }


    return (
        <div className="flex items-center gap-2">
            {isEditing ? (
                <form
                    onSubmit={handleSubmit}
                    className="relative w-fit max-w-[50ch]"
                >
                    <span 
                        onClick={() => {
                            setIsEditing(true)
                            setTimeout(() =>{
                            inputRef.current?.focus()
                            }, 0)
                        }}
                        className="text-lg text-gray-400 px-1.5 cursor-pointer truncate"
                        >
                        {value}
                    </span>

                    <input
                        ref={inputRef}
                        value={value}
                        onChange={onChange}
                        onBlur = {() => setIsEditing(false)}
                        className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
                    />
                </form>
            ) : (
            <span 
            onClick={() => {
                setIsEditing(true)
                setTimeout(() =>{
                    inputRef.current?.focus()
                },0)
            }}
            className="text-lg text-gray-400 px-1.5 cursor-pointer truncate">
                {title}
            </span>
            ) }
            <BsCloudCheck className="text-purple-300" />
        </div>
    )
}
