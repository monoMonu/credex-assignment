import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { motion } from "framer-motion"

interface Testimonial {
   rating: number;
   quote: string;
   author: string;
   position: string;
   company: string;
   image: string;
}

const testimonials: Testimonial[] = [
   {
      rating: 5,
      quote: "SoftSell helped us recover value from unused licenses we thought were worthless. The process was fast, transparent, and incredibly efficient.",
      author: "Ahmed Al-Sayed",
      position: "CISO",
      company: "Dubai Finance Corp",
      image: "https://ui-avatars.com/api/?name=Ahmed+Al-Sayed&background=random"
   },
   {
      rating: 5,
      quote: "As a mid-sized business, selling our excess licenses through SoftSell freed up budget instantly. We were able to invest in new projects.",
      author: "Sara Al-Rashid",
      position: "IT Director",
      company: "Riyadh Tech Solutions",
      image: "https://ui-avatars.com/api/?name=Sara+Al-Rashid&background=random"
   },
   {
      rating: 5,
      quote: "From valuation to payout, SoftSell delivered exactly what they promised. We were impressed by their customer support and smooth onboarding.",
      author: "Mohammed Al-Qasimi",
      position: "Security Manager",
      company: "Abu Dhabi Retail Group",
      image: "https://ui-avatars.com/api/?name=Mohammed+Al-Qasimi&background=random"
   }
]



const Testimonials = () => {

   const fadeInUp = {
      hidden: { opacity: 0, y: 20 },
      visible: (i: number) => ({
         opacity: 1,
         y: 0,
         transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut"
         }
      })
   }

   return (
      <div className="w-full bg-background py-16 px-4 sm:px-6 lg:px-8" id='testimonials'>
         <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
               Trusted by Leading Organizations
            </h2>
            <p className="text-lg text-muted-foreground">
               See what our clients across the World have to say
            </p>
         </div>

         <div className="max-w-7xl mx-auto grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
               <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className='flex items-center moving-border p-0.5 relative overflow-hidden flex-1 min-w-[250px] rounded-lg'
               >
                  <Card className="rounded-lg shadow-lg flex h-full flex-1 flex-col items-start gap-4 border relative z-10">
                     <CardContent className="px-6 py-2 space-y-6 flex flex-col justify-between bg-card">
                        <div className='space-y-6'>
                           <div className="flex gap-1.5">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                 <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              ))}
                           </div>
                           <blockquote className="text-base text-foreground">
                              "{testimonial.quote}"
                           </blockquote>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                           <div className="space-y-1 text-left">
                              <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                              <div className="text-sm text-foreground font-medium">{testimonial.author}</div>
                           </div>
                           <Avatar className='size-9'>
                              <AvatarImage src={testimonial.image} alt={testimonial.author} />
                              <AvatarFallback>{testimonial.author.slice(0, 2)}</AvatarFallback>
                           </Avatar>
                        </div>
                     </CardContent>
                  </Card>
               </motion.div>
            ))}

         </div>
      </div>
   );
};

export default Testimonials;