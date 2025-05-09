import { FileText, Globe, Server, Shield } from "lucide-react"
import { FaDollarSign } from "react-icons/fa"
import { motion } from "framer-motion"

const features = [
   {
      head: "Instant License Valuation",
      content: "Get real-time market pricing for your unused software licenses",
      icon: <FaDollarSign size={34} className="text-primary" />
   },
   {
      head: "Secure Transaction Handling",
      content: "All deals are vetted and processed with strict data confidentiality",
      icon: <Shield size={34} className="text-primary" />
   },
   {
      head: "Compliance-Aware Resale",
      content: "Ensure your license sales align with global software compliance rules",
      icon: <Globe size={34} className="text-primary" />
   },
   {
      head: "Bulk License Upload",
      content: "Easily upload and manage multiple licenses at once with ease",
      icon: <Server size={34} className="text-primary" />
   },
   {
      head: "Smart Document Generator",
      content: "Automatically generate resale agreements and compliance documentation",
      icon: <FileText size={34} className="text-primary" />
   }
]


export default function WhyChooseUs() {

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
      <section id="why-choose-us" className="bg-muted text-foreground py-20 px-6">
         <div className="max-w-7xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
               Why Choose Us ?
            </h2>
            <p className="text-lg text-muted-foreground">
               See what sets us apart from the competition
            </p>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-screen-xl mx-auto place-items-center">
            {features.map((item, index) => (
               <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className='flex items-center moving-border p-0.5 relative overflow-hidden flex-1 min-w-[250px] max-w-[450px] rounded-lg'
               >
                  <div className="bg-card rounded-lg shadow-lg p-4 flex h-full flex-1 flex-col items-start gap-4 border relative z-10">
                     <div className="flex-shrink-0">
                        {item.icon}
                     </div>
                     <div>
                        <h3 className="font-semibold text-lg mb-1">{item.head}</h3>
                        <p className="text-sm text-muted-foreground">{item.content}</p>
                     </div>
                  </div>
               </motion.div>
            ))}

         </div>
      </section>
   )
}
