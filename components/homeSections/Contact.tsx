"use client"

import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
   CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
   Select,
   SelectTrigger,
   SelectValue,
   SelectContent,
   SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { z } from "zod"
import { useState } from "react"

const formSchema = z.object({
   name: z.string().min(2, "Name is required"),
   email: z.string().email("Invalid email"),
   company: z.string().min(2, "Company is required"),
   license: z.string().min(1, "License type is required"),
   message: z.string().min(5, "Message is too short"),
})

type FormData = z.infer<typeof formSchema>

export default function ContactForm() {
   const [formData, setFormData] = useState<FormData>({
      name: "",
      email: "",
      company: "",
      license: "",
      message: "",
   })

   const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
   const [submitted, setSubmitted] = useState(false)

   const handleChange = (field: keyof FormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
   }

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      const result = formSchema.safeParse(formData)

      if (!result.success) {
         const fieldErrors: Partial<Record<keyof FormData, string>> = {}
         result.error.errors.forEach((err) => {
            const field = err.path[0] as keyof FormData
            fieldErrors[field] = err.message
         })
         setErrors(fieldErrors)
         return
      }

      console.log("Submitted data:", result.data)
      setSubmitted(true)
      setErrors({})
   }

   return (
      <section id="contact" className="bg-muted text-foreground py-20 px-6">
         <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side */}
            <div className="space-y-6 text-center md:text-left px-4">
               <h2 className="text-4xl font-bold tracking-tight">Let’s Work Together</h2>
               <p className="text-muted-foreground text-lg">
                  Tell us about your unused software licenses and we’ll help you turn them into value.
               </p>
               <Image
                  src="/contact.svg"
                  alt="Contact illustration"
                  width={500}
                  height={200}
                  className="mx-auto md:mx-0"
               />
            </div>

            {/* Right side: Form */}
            <Card className="border-border shadow-lg">
               <CardHeader>
                  <CardTitle className="text-2xl">Contact Us</CardTitle>
                  <CardDescription>
                     Fill out the form below to reach our team.
                  </CardDescription>
               </CardHeader>

               <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                           <Label htmlFor="name">Name</Label>
                           <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleChange("name", e.target.value)}
                              className="bg-background mt-1"
                           />
                           {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                        </div>

                        <div>
                           <Label htmlFor="email">Email</Label>
                           <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange("email", e.target.value)}
                              className="bg-background mt-1"
                           />
                           {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                        </div>
                     </div>

                     <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                           id="company"
                           value={formData.company}
                           onChange={(e) => handleChange("company", e.target.value)}
                           className="bg-background mt-1"
                        />
                        {errors.company && <p className="text-sm text-red-500 mt-1">{errors.company}</p>}
                     </div>

                     <div>
                        <Label>License Type</Label>
                        <Select
                           onValueChange={(value) => handleChange("license", value)}
                           value={formData.license}
                        >
                           <SelectTrigger className="bg-background mt-1">
                              <SelectValue placeholder="Select license type" />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="microsoft">Microsoft Office</SelectItem>
                              <SelectItem value="adobe">Adobe Creative Cloud</SelectItem>
                              <SelectItem value="autodesk">Autodesk</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                           </SelectContent>
                        </Select>
                        {errors.license && <p className="text-sm text-red-500 mt-1">{errors.license}</p>}
                     </div>

                     <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                           id="message"
                           rows={4}
                           value={formData.message}
                           onChange={(e) => handleChange("message", e.target.value)}
                           className="bg-background mt-1"
                        />
                        {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                     </div>
                  </CardContent>

                  <CardFooter className="pt-5">
                     <Button type="submit" className="w-full bg-primary text-primary-foreground">
                        Submit
                     </Button>
                  </CardFooter>
               </form>
            </Card>
         </div>

         {submitted && (
            <p className="text-center mt-6 text-green-600 font-medium">Thank you! We'll be in touch.</p>
         )}
      </section>
   )
}
