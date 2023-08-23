"use client"

import { Search } from "lucide-react"
import React, { useEffect, useState } from "react"
import qs from "query-string"
import { Input } from "@/components/ui/input"
import { useRouter, useSearchParams } from "next/navigation"
import useDebounce from "@/hooks/useDebounce"

const SearchInput = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const category = searchParams.get("categoryId")
  const name = searchParams.get("name")

  const [value, setValue] = useState(name || "")
  const debounceValue = useDebounce(value)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  useEffect(() => {
    const query = {
      name: debounceValue,
      categoryId: category,
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    )

    router.push(url)
  }, [debounceValue, router, category])

  return (
    <div className="relative">
      <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
      <Input value={value} onChange={onChange} placeholder="Search ..." className="pl-10 bg-primary/10" />
    </div>
  )
}

export default SearchInput
