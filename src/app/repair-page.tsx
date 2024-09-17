'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Pause, X, ArrowLeft } from "lucide-react"

type Message = {
  text: string;
  isUser: boolean;
}

interface RepairPageProps {
  onBackToHome: () => void;
}

export default function RepairPage({ onBackToHome }: RepairPageProps) {
  const [formData, setFormData] = useState({
    field1: '', field2: '', field3: '', field4: ''
  })
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [language, setLanguage] = useState('en')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSend = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, isUser: true }])
      setInputMessage('')
      // Here you would typically send the message to your backend and get a response
      // For now, we'll just simulate a response
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "Thank you for your message. How can I assist you further?", isUser: false }])
      }, 1000)
    }
  }

  const handlePause = () => {
    // Implement pause functionality
    console.log('Conversation paused')
  }

  const handleCancel = () => {
    // Implement cancel functionality
    setMessages([])
    setInputMessage('')
  }

  const isFormFilled = Object.values(formData).every(field => field.trim() !== '')

  return (
    <div className="container mx-auto p-4 max-w-4xl flex flex-col min-h-screen">
      <Button
        className="mb-4 self-start bg-red-600 hover:bg-red-700 text-white"
        onClick={onBackToHome}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Button>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Device Model" name="field1" value={formData.field1} onChange={handleInputChange} />
            <Input placeholder="Issue Description" name="field2" value={formData.field2} onChange={handleInputChange} />
            <Input placeholder="Customer Name" name="field3" value={formData.field3} onChange={handleInputChange} />
            <Input placeholder="Contact Number" name="field4" value={formData.field4} onChange={handleInputChange} />
          </div>
        </CardContent>
      </Card>

      <Card className="flex-grow mb-4 overflow-hidden flex flex-col">
        <CardContent className="p-4 flex-grow overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block p-2 rounded-lg ${message.isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                {message.text}
              </span>
            </div>
          ))}
        </CardContent>
        <CardContent className="p-4 border-t">
          <div className="flex items-center gap-2">
            <Input 
              placeholder="Type your message here" 
              value={inputMessage} 
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow"
            />
            <Button onClick={handleSend}><Send className="h-4 w-4" /></Button>
            <Button onClick={handlePause}><Pause className="h-4 w-4" /></Button>
            <Button onClick={handleCancel}><X className="h-4 w-4" /></Button>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-500 mt-4">
        <p>Disclaimer: This conversation is for repair assistance purposes only. Personal information shared during this interaction is subject to our privacy policy. We do not guarantee the accuracy of repair advice given through this platform. Please consult with a professional technician for complex issues.</p>
      </div>
    </div>
  )
}