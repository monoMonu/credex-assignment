"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MessageSquare } from "lucide-react"

const mockResponses: Record<string, string> = {
   "how do i sell my license": "You can upload your license details and receive a valuation instantly.",
   "is this secure": "Absolutely. We use encrypted transactions and vet all buyers.",
   "hello": "Hi there! How can I help you today?",
   "what can you do": "I can answer questions about selling your licenses.",
}

const messageVariants = {
   initial: { opacity: 0, y: 10 },
   animate: { opacity: 1, y: 0 },
   exit: { opacity: 0, y: -10 },
}

const TypingIndicator = () => (
   <div className="text-muted-foreground rounded-md py-1 px-2 bg-accent text-left">
      SoftBot: <span className="animate-pulse"> typing</span><span className="animate-bounce ml-1 w-1 h-1 rounded-full bg-muted-foreground inline-block"></span><span className="animate-bounce ml-1 w-1 h-1 rounded-full bg-muted-foreground inline-block delay-150"></span><span className="animate-bounce ml-1 w-1 h-1 rounded-full bg-muted-foreground inline-block delay-300"></span>
   </div>
)

export default function ChatUI() {
   const [messages, setMessages] = useState<(string | React.ReactNode)[]>([])
   const [input, setInput] = useState("")
   const chatWindowRef = useRef<HTMLDivElement>(null)
   const [isResponding, setIsResponding] = useState(false)
   const [open, setOpen] = useState(false)

   useEffect(() => {
      if (chatWindowRef.current && open) {
         chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
      }
   }, [messages, open])

   const send = () => {
      const question = input.toLowerCase().trim()
      if (question && !isResponding && open) {
         setMessages((prev) => [...prev, `You: ${input}`])
         setInput("")
         setIsResponding(true)

         // Add typing indicator
         setMessages((prev) => [...prev, <TypingIndicator key="typing" />])

         // Simulate API call with a 3-second delay
         setTimeout(() => {
            const answer = mockResponses[question] || "I'm not sure, but a team member will reach out soon."
            // Remove typing indicator
            setMessages((prev) => prev.filter((msg) => {
               if (typeof msg === 'string') return true
               if (msg && typeof msg === 'object' && 'key' in msg) {
                  return msg.key !== 'typing'
               }
               return false
            }))
            setMessages((prev) => [...prev, `SoftBot: ${answer}`])
            setIsResponding(false)
         }, 3000)
      } else if (question && isResponding) {
         console.log("Waiting for the previous response...")
      }
   }

   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && open) {
         send()
      }
   }

   return (
      <>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
               <motion.button
                  className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full shadow-md p-3 z-50 cursor-pointer hover:opacity-90"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
               >
                  <MessageSquare className="w-6 h-6" />
               </motion.button>
            </DialogTrigger>
            <DialogContent className="fixed bottom-6 right-6 w-screen-md bg-card text-card-foreground border border-border rounded-lg shadow-lg p-4 z-50 flex flex-col h-[calc(80vh-48px)]">
               <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-primary">SoftBot</DialogTitle>
               </DialogHeader>
               <div
                  ref={chatWindowRef}
                  className="overflow-y-auto text-sm space-y-2 flex-grow"
               >
                  <AnimatePresence>
                     {messages.map((msg, idx) => {
                        if (typeof msg === 'string') {
                           const isUser = msg.startsWith("You:")
                           return (
                              <motion.p
                                 key={idx}
                                 className={`pt-1 px-2 ${isUser ? "text-right" : "text-left"
                                    }`}
                                 variants={messageVariants}
                                 initial="initial"
                                 animate="animate"
                                 exit="exit"
                              >
                                 <span 
                                    className={`inline-block max-w-4/5 text-muted-foreground rounded-md py-1 px-2 ${isUser ? "bg-muted" : "bg-accent"
                                 }`}>
                                    {msg}
                                 </span>
                              </motion.p>
                           )
                        }
                        // Render the TypingIndicator component
                        return msg
                     })}
                  </AnimatePresence>
               </div>
               <div className="flex gap-2 mt-3">
                  <Input
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder="Type a question..."
                     className="bg-background text-foreground flex-grow"
                     disabled={isResponding}
                  />
                  <Button
                     onClick={send}
                     className="bg-primary text-primary-foreground hover:opacity-90"
                     disabled={isResponding}
                  >
                     Send
                  </Button>
               </div>
            </DialogContent>
         </Dialog>
      </>
   )
}