"use client"

import { FaUpload, FaSearchDollar, FaMoneyBillWave } from "react-icons/fa"
import { motion } from "framer-motion"

const steps = [
  {
    icon: <FaUpload className="text-4xl text-primary" />,
    title: "Upload License",
    desc: "Securely submit your unused software license details.",
  },
  {
    icon: <FaSearchDollar className="text-4xl text-primary" />,
    title: "Get Valuation",
    desc: "We provide a real-time market valuation for your licenses.",
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-primary" />,
    title: "Get Paid",
    desc: "Receive payment quickly and securely after confirmation.",
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
}

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="bg-background text-foreground py-20 px-6 text-center"
    >
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-primary mb-4">
          How it works?
        </h2>
        <p className="text-lg text-muted-foreground">
          See how easy it is to sell your unused software licenses.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="relative bg-card text-card-foreground p-6 border border-border rounded-xl shadow hover:shadow-lg transition-transform hover:scale-[1.02]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={i}
            variants={fadeInUp}
          >
            <div className="absolute -top-5 left-3 bg-primary text-primary-foreground w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold shadow-md z-10">
              {i + 1}
            </div>
            <div className="mb-6 mt-3 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
