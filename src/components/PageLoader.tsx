import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageLoader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="page-loader"
          id="pageLoader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/JuicyPlayer.github.io/images/icon_256.png"
            alt="Juicy Player"
            className="loader-logo"
          />
          <div className="loader-bar">
            <div className="loader-bar-inner" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
