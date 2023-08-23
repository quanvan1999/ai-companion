"use client"

import { cn } from "@/lib/utils"
import { Home, Plus, Settings } from "lucide-react"
import React from "react"
import { usePathname, useRouter } from "next/navigation"

const routers = [
  {
    icon: Home,
    href: "/",
    label: "Home",
    pro: false,
  },
  {
    icon: Plus,
    href: "/companion/new",
    label: "Create",
    pro: true,
  },
  {
    icon: Settings,
    href: "/settings",
    label: "Settings",
    pro: false,
  },
]

const Sidebar = () => {
  const pathName = usePathname()
  const router = useRouter()

  const handleNavigate = (href: string, pro: boolean) => {
    return router.push(href)
  }

  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="p-3 flex flex-1 justify-center">
        <div className="space-y-2">
          {routers.map(router => (
            <div
              onClick={() => handleNavigate(router.href, router.pro)}
              className={cn(
                "text-muted-foreground text-xs group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10  rounded-lg transition",
                pathName === router.href && "text-primary bg-primary/10"
              )}
              key={router.href}
            >
              <div className="flex flex-col gap-y-2 items-center flex-1">
                <router.icon className="w-5 h-5" />
                {router.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
