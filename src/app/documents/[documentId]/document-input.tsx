import { BsCloudCheck } from "react-icons/bs"

export const DocumentInput = () => {
    return (
        <div className="flex items-center gap-2">
            <span className="text-lg text-gray-400 px-1.5 cursor-pointer truncate">
                Untitled Document
            </span>
            <BsCloudCheck className="text-purple-300" />
        </div>
    )
}
