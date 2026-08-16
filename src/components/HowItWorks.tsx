import { useEffect, useRef } from 'react'

const STEPS = [
  { num: '1', titleKey: 'step1Title', descKey: 'step1Desc', title: '安装 JuicyPlayer 播放器', desc: '从 Microsoft Store 下载安装 JuicyPlayer 桌面播放器。' },
  { num: '2', titleKey: 'step2Title', descKey: 'step2Desc', title: '安装 Juicy Remoter 遥控器', desc: '在 Android 手机上下载安装 Juicy Remoter APK，授予局域网权限。' },
  { num: '3', titleKey: 'step3Title', descKey: 'step3Desc', title: '连接 & 享受', desc: '确保电脑和手机在同一 Wi-Fi 下，打开遥控器自动连接播放器，开始无线操控。' },
]

export default function HowItWorks() {
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const connectorsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed')
            // 步骤揭示后，延迟激活连接线
            const steps = stepsRef.current.filter(Boolean)
            const idx = steps.indexOf(entry.target as HTMLDivElement)
            if (idx > 0 && connectorsRef.current[idx - 1]) {
              setTimeout(() => {
                connectorsRef.current[idx - 1]?.classList.add('revealed')
              }, 400)
            }
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' },
    )

    stepsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })
    connectorsRef.current.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="howto">
      <div className="container">
        <div className="section-header">
          <span className="section-tag" data-i18n="howtoTag">
            使用指南
          </span>
          <h2 data-i18n="howtoTitle">三步开始使用</h2>
        </div>
        <div className="steps">
          {STEPS.map((step, i) => (
            <div key={i}>
              <div className="step" data-reveal ref={(el) => { stepsRef.current[i] = el }}>
                <div className="step-num">{step.num}</div>
                <div className="step-body">
                  <h3 data-i18n={step.titleKey}>{step.title}</h3>
                  <p data-i18n={step.descKey}>{step.desc}</p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className="step-connector"
                  data-reveal-connector
                  ref={(el) => { connectorsRef.current[i] = el }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
