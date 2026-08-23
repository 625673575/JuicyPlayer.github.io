import { motion } from 'framer-motion'

export default function HeadphoneShowcase() {
  return (
    <section className="headphone-showcase">
      <div className="container">
        <motion.div
          className="headphone-image-wrap"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <img
            src="/JuicyPlayer.github.io/images/headphone-bg.jpg"
            alt="Encore One Headphones"
            className="headphone-image"
          />
        </motion.div>
      </div>
    </section>
  )
}
