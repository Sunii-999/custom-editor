"use client"

import { Navbar } from "./navbar"

import { TemplateGallery } from "./template-gallery"
import { usePaginatedQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

import { DocumentsTable } from "./documents-table"
import { useSearchParam } from "@/hooks/use-search-param"


const Home = () => {
  const [search] = useSearchParam();

  const {
    results,
    status,
    loadMore
  } = usePaginatedQuery(api.documents.getDocuments, { search }, { initialNumItems: 5 })


  return (
    <div className="min-h-screen flex flex-col bg-[#202124]">
      <div className="fixed top-0 left-0 right-0 z-10 h-20 bg-[#202124] p-4 rounded-b-lg shadow-xl">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          status={status}
          loadMore={loadMore}
        />
      </div>
    </div>
  )
}

export default Home