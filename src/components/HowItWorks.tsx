import { motion } from 'framer-motion'

const STEPS = [
  { num: '1', titleKey: 'step1Title', descKey: 'step1Desc', title: 'Install JuicyPlayer', desc: 'Download and install JuicyPlayer desktop player from Microsoft Store.' },
  { num: '2', titleKey: 'step2Title', descKey: 'step2Desc', title: 'Install Juicy Remoter', desc: 'Download and install Juicy Remoter APK on your Android phone, grant LAN permission.' },
  { num: '3', titleKey: 'step3Title', descKey: 'step3Desc', title: 'Connect & Enjoy', desc: 'Make sure your PC and phone are on the same Wi-Fi. Open the remote — it auto-connects to the player.' },
]

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

const connectorVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: { scaleX: 1, opacity: 1 },
}

export default function HowItWorks() {
  return (
    <section className="howto">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -50px 0px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag" data-i18n="howtoTag">
            Getting Started
          </span>
          <h2 data-i18n="howtoTitle">3 Steps to Start</h2>
        </motion.div>
        <div className="steps">
          {STEPS.map((step, i) => (
            <div key={i}>
              <motion.div
                className="step"
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '0px 0px -50px 0px' }}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: i * 0.15 }}
              >
                <motion.div
                  className="step-num"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  {step.num}
                </motion.div>
                <div className="step-body">
                  <h3 data-i18n={step.titleKey}>{step.title}</h3>
                  <p data-i18n={step.descKey}>{step.desc}</p>
                </div>
              </motion.div>
              {i < STEPS.length - 1 && (
                <motion.div
                  className="step-connector"
                  variants={connectorVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 + i * 0.15 }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
