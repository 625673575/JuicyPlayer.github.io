import { motion } from 'framer-motion'

const STEPS = [
  { num: '1', titleKey: 'step1Title', descKey: 'step1Desc', title: '安装 JuicyPlayer 播放器', desc: '从 Microsoft Store 下载安装 JuicyPlayer 桌面播放器。' },
  { num: '2', titleKey: 'step2Title', descKey: 'step2Desc', title: '安装 Juicy Remoter 遥控器', desc: '在 Android 手机上下载安装 Juicy Remoter APK，授予局域网权限。' },
  { num: '3', titleKey: 'step3Title', descKey: 'step3Desc', title: '连接 & 享受', desc: '确保电脑和手机在同一 Wi-Fi 下，打开遥控器自动连接播放器，开始无线操控。' },
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
            使用指南
          </span>
          <h2 data-i18n="howtoTitle">三步开始使用</h2>
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
