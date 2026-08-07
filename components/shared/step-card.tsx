 "use client"

import { motion } from "framer-motion"

type StepCardProps = {
  index: string
  title: string
  description: string
}

export function StepCard({ index, title, description }: StepCardProps) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group rounded-lg border border-white/10 bg-zinc-950/70 p-5 transition duration-300 hover:border-white/20 hover:bg-white/[0.035]"
    >
      <div className="mb-5 flex size-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-sm font-semibold text-cyan-200 transition duration-300 group-hover:border-cyan-200/50 group-hover:bg-cyan-300/15">
        {index}
      </div>
      <h3 className="text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
    </motion.article>
  )
}
