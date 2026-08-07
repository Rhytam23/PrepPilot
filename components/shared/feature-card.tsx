 "use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

type FeatureCardProps = {
  title: string
  description: string
  icon: LucideIcon
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
}: FeatureCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group rounded-lg border border-white/10 bg-white/[0.03] p-5 shadow-2xl shadow-black/20 transition duration-300 hover:border-cyan-300/30 hover:bg-white/[0.055] hover:shadow-cyan-950/25"
    >
      <div className="mb-5 flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-cyan-300">
        <Icon className="size-5 transition duration-300 group-hover:scale-110" />
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
    </motion.article>
  )
}
