import { motion } from 'framer-motion'
import { ArrowRight, ScanLine } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_60%,transparent_100%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="inline-flex items-center px-4 py-1.5 bg-brand-50 border border-brand-100 rounded-full text-brand-700 text-xs font-medium mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-500 mr-2"></span>
          AI-Powered Asset Maintenance Platform
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6"
        >
          Scan. Report. Diagnose. <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-600 to-brand-800">Maintain.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg text-gray-600 mb-10"
        >
          Give every physical asset a digital identity. Streamline issue reporting, AI triage, and maintenance workflows in one centralized platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/login" className="btn-primary w-full sm:w-auto px-8 py-3 text-base">
            Start Free Trial <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
          <Link to="/login" className="btn-secondary w-full sm:w-auto px-8 py-3 text-base">
            <ScanLine className="mr-2 w-4 h-4" /> See How It Works
          </Link>
        </motion.div>
      </div>
    </section>
  )
}