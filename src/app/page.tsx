'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, PlusIcon, PauseCircle, CheckCircle, Menu } from "lucide-react"
import RepairPage from './repair-page'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showRepairPage, setShowRepairPage] = useState(false)
  const username = "John"
  const phonesRepaired = 1234
  const amountEarned = 98765
  const freeRepairsLeft = 3

  const handleStartRepair = () => {
    setShowRepairPage(true)
  }

  const handleBackToHome = () => {
    setShowRepairPage(false)
  }

  if (showRepairPage) {
    return <RepairPage onBackToHome={handleBackToHome} />
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-red-50 to-cyan-50">
      <Button
        className="md:hidden fixed top-4 left-4 z-50 bg-red-600 hover:bg-red-700 text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div className={`w-full md:w-1/4 bg-white p-4 overflow-y-auto shadow-lg transition-all duration-300 ease-in-out ${sidebarOpen ? 'fixed inset-0 z-40' : 'hidden md:block'}`}>
        <Button className="w-full mb-4 justify-start bg-red-600 hover:bg-red-700 text-white">
          <PlusIcon className="mr-2 h-4 w-4" /> New repair
        </Button>
        <h2 className="text-red-800 mb-2 font-semibold">Paused Repairs</h2>
        {["iPhone 12 Screen Repair", "Samsung Galaxy Battery"].map((title, index) => (
          <div key={index} className="bg-red-50 text-red-800 p-3 rounded mb-2 cursor-pointer hover:bg-red-100 transition-colors duration-200">
            <div className="font-semibold flex items-center">
              <PauseCircle className="mr-2 h-4 w-4 text-red-600" />
              {title}
            </div>
            <div className="text-sm text-red-600">Last update: The repair process...</div>
          </div>
        ))}
        <h2 className="text-cyan-800 mt-4 mb-2 font-semibold">Completed Repairs</h2>
        {["iPad Air Screen Replacement", "Google Pixel Camera Fix"].map((title, index) => (
          <div key={index} className="bg-cyan-50 text-cyan-800 p-3 rounded mb-2 cursor-pointer hover:bg-cyan-100 transition-colors duration-200">
            <div className="font-semibold flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-cyan-600" />
              {title}
            </div>
            <div className="text-sm text-cyan-600">Completed on: 2023-05-{15 - index}</div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-3/4 flex flex-col items-center justify-start p-4 md:p-8 relative">
        <Avatar className="absolute top-4 right-4 cursor-pointer">
          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl md:text-3xl font-semibold text-red-800 mb-6 mt-12 md:mt-0">Welcome, {username}</h1>
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-8 mb-8 md:mb-12 w-full">
          <Card className="w-full md:w-1/3 bg-red-50 border-red-200">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-3xl md:text-4xl font-bold text-red-600 mb-2">{phonesRepaired}</p>
              <h2 className="text-lg md:text-xl font-semibold text-red-800">Phones Repaired</h2>
            </CardContent>
          </Card>
          <Card className="w-full md:w-1/3 bg-cyan-50 border-cyan-200">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <p className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">₹{amountEarned}</p>
              <h2 className="text-lg md:text-xl font-semibold text-cyan-800">Amount Earned</h2>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mb-8 bg-yellow-50 p-4 rounded-lg shadow-md w-full md:w-auto">
          <p className="text-base md:text-lg text-yellow-800 font-semibold">Free Diagnosis</p>
          <p className="text-base md:text-lg text-yellow-800 font-semibold">No Fix, No Fee</p>
          <p className="text-base md:text-lg text-yellow-800 font-semibold">90-Day Warranty</p>
        </div>
        <div className="relative">
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white text-lg md:text-xl py-4 md:py-6 px-8 md:px-12 rounded-lg flex items-center gap-3 transition-colors duration-200 shadow-lg"
            onClick={handleStartRepair}
          >
            <Smartphone className="w-5 h-5 md:w-6 md:h-6" />
            Start Repair
          </Button>
          <Badge className="absolute -top-3 -right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
            {freeRepairsLeft} free repairs left
          </Badge>
        </div>
      </div>
    </div>
  )
}