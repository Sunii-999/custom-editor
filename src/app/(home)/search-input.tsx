"use client"

import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { SearchIcon, XIcon } from "lucide-react"
import { useSearchParam } from "@/hooks/use-search-param"

export const SearchInput = () => {
  // Assuming useSearchParam returns [value, setValue]
  const [search, setSearch] = useSearchParam() 
  // Initialize internal state with the current search parameter
  const [value, setValue] = useState(search) 

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const handleClear = () => {
    setValue("")
    setSearch("") // Clear the URL search parameter
    inputRef.current?.blur()
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSearch(value) // Update the URL search parameter
    inputRef.current?.blur()
  }

  return (
    <div className="flex-1 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-xl" // Increased max-width slightly
      >
        <Input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          placeholder="Search documents" // More specific placeholder
          // *** Modern Dark Theme Styles ***
          className="w-full h-11 pl-12 pr-10 text-base 
                     bg-[#3c4043] border border-transparent rounded-full 
                     placeholder:text-gray-400 text-white
                     focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none 
                     shadow-md transition-all duration-200"
        />
        {/* Search Icon Button - positioned on the left */}
        <Button
          type="submit"
          variant="ghost"
          size="icon"
          // Adjusted positioning for the taller, rounded input
          className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 rounded-full [&_svg]:size-5"
        >
          <SearchIcon />
        </Button>
        {/* Clear Button (X Icon) - positioned on the right, only visible when there's text */}
        {value && (
          <Button
            onClick={handleClear}
            type="button"
            variant="ghost"
            size="icon"
            // Adjusted positioning and added a distinct hover background
            className="absolute right-2 top-1/2 -translate-y-1/2 
                       text-gray-400 hover:text-white hover:bg-gray-600/50 
                       [&_svg]:size-5 rounded-full"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  )
}