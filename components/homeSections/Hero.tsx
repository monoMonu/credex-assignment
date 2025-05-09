"use client"

import { motion } from "framer-motion"
import { FaRocket } from "react-icons/fa"

export default function Hero() {
   return (
      <section className="relative bg-gradient-to-b from-muted/40 to-background text-foreground text-center py-28 px-6 overflow-hidden">
         {/* Decorative Tagline */}
         <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-medium mb-4"
         >
            Trusted by Software Sellers Worldwide
         </motion.div>

         {/* Heading */}
         <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 max-w-4xl mx-auto leading-tight"
         >
            Unlock Value from Unused Software Licenses
         </motion.h1>

         {/* Subtext */}
         <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
         >
            SoftSell helps you securely sell unused software licenses with ease and transparency.
         </motion.p>

         {/* CTA Button */}
         <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-[var(--radius)] font-medium flex items-center gap-2 mx-auto hover:bg-primary/80 cursor-pointer transition"
         >
            <FaRocket className="text-base" />
            Sell My Licenses
         </motion.button>
      </section>
   )
}
