'use client'

import { useEffect, useMemo, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type Bubble = {
  id: number
  size: number
  top: number
  left: number
  delay: number
  dur: number
  drift: number
  blur: number
  popping?: boolean
}

type Burst = {
  id: number
  x: number   // scene内のpx
  y: number   // scene内のpx
  parts: {
    dx: number; dy: number; rot: number; size: number; dur: number;
  }[]
}

function usePopAudio() {
  const ctxRef = useRef<AudioContext | null>(null)
  useEffect(() => () => { ctxRef.current?.close() }, [])
  return useCallback(() => {
    const AC: any = (window as any).AudioContext || (window as any).webkitAudioContext
    if (!AC) return
    if (!ctxRef.current) ctxRef.current = new AC()
    const ctx = ctxRef.current!
    const t = ctx.currentTime

    // “ポン”音：短いサイン波＋減衰
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, t)
    osc.frequency.exponentialRampToValueAtTime(1400, t + 0.03)
    gain.gain.setValueAtTime(0.0001, t)
    gain.gain.exponentialRampToValueAtTime(0.45, t + 0.005)
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.1)
    osc.connect(gain).connect(ctx.destination)
    osc.start(t)
    osc.stop(t + 0.11)
  }, [])
}

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [bursts, setBursts] = useState<Burst[]>([])
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const popSound = usePopAudio()

  // ---- モックデータ（元のまま） ----
  const projects = useMemo(() => ([
    { id: 1, title: "E-Commerce Platform", description: "Next.js × NestJS で構築されたモダンなECサイト", image: "/api/placeholder/400/300", tech: ["Next.js", "TypeScript", "NestJS", "PostgreSQL"], link: "#" },
    { id: 2, title: "Task Management App", description: "リアルタイム協業機能付きタスク管理アプリ", image: "/api/placeholder/400/300", tech: ["React", "Node.js", "Socket.io", "MongoDB"], link: "#" },
    { id: 3, title: "Portfolio Website", description: "このポートフォリオサイト自体のプロジェクト", image: "/api/placeholder/400/300", tech: ["Next.js", "Tailwind CSS", "shadcn/ui"], link: "#" }
  ]), [])

  const skills = useMemo(() => ([
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "NestJS", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "MongoDB", level: 65 }
  ]), [])

  // ---- 泡ランダム生成（SSRミスマッチ回避のためマウント後） ----
  const makeBubble = useCallback((id: number): Bubble => {
    const size  = 20 + Math.random() * 50
    const top   = Math.random() * 100
    const left  = Math.random() * 100
    const delay = Math.random() * 3
    const dur   = 3 + Math.random() * 2
    const drift = (Math.random() * 12 - 6)
    const blur  = Math.random() < 0.4 ? Math.random() * 2 : 0
    return { id, size, top, left, delay, dur, drift, blur }
  }, [])

  useEffect(() => {
    setBubbles(Array.from({ length: 36 }, (_, i) => makeBubble(i)))
  }, [makeBubble])

  // ---- パーティクルのバースト生成 ----
  const spawnBurstAt = useCallback((clientX: number, clientY: number) => {
    const rect = sceneRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = clientX - rect.left
    const y = clientY - rect.top

    const N = 12 + Math.floor(Math.random() * 8) // 12〜19個
    const parts = Array.from({ length: N }, () => {
      const ang = Math.random() * Math.PI * 2
      const dist = 24 + Math.random() * 38       // 飛距離(px)
      const dx = Math.cos(ang) * dist + 'px'
      const dy = Math.sin(ang) * dist + 'px'
      const rot = (Math.random() * 360 - 180) + 'deg'
      const size = (3 + Math.random() * 6) + 'px'
      const dur = (0.45 + Math.random() * 0.25)  // 0.45〜0.7s
      return { dx, dy, rot, size, dur }
    })

    const id = Date.now() + Math.random()
    setBursts(prev => [...prev, { id, x, y, parts }])

    // 後始末（最長dur後に消す）
    const maxDur = Math.max(...parts.map(p => p.dur))
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== id))
    }, Math.ceil(maxDur * 1000) + 20)
  }, [])

  // ---- クリック：弾ける → パーティクル & 音 ----
  const popBubble = useCallback((id: number, e: React.MouseEvent<HTMLDivElement>) => {
    setBubbles(prev => prev.map(b => b.id === id ? ({ ...b, popping: true }) : b))
    popSound()
    spawnBurstAt(e.clientX, e.clientY)
  }, [popSound, spawnBurstAt])

  // ---- “弾け”アニメ終了で補充 ----
  const handlePopEnd = useCallback((id: number) => {
    setBubbles(prev => {
      const maxId = prev.reduce((m, b) => Math.max(m, b.id), -1)
      const remain = prev.filter(b => b.id !== id)
      return [...remain, makeBubble(maxId + 1)]
    })
  }, [makeBubble])

  return (
    <Layout>
      {/* ヒーロー */}
      <section
        ref={sceneRef}
        className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden"
      >
        {/* 泡レイヤー（クリック可能） */}
        <div className="absolute inset-0 z-0">
          {bubbles.map(b => (
            <div
              key={b.id}
              onClick={(e) => popBubble(b.id, e)}
              onAnimationEnd={(e) => {
                if ((e.target as HTMLElement).classList.contains('bubble-pop')) {
                  handlePopEnd(b.id)
                }
              }}
              style={{
                '--size':  `${b.size}px`,
                '--top':   `${b.top}%`,
                '--left':  `${b.left}%`,
                '--delay': `${b.delay}s`,
                '--dur':   `${b.dur}s`,
                '--drift': `${b.drift}%`,
                '--blur':  `${b.blur}px`,
                '--popDur': '.24s',
              } as React.CSSProperties}
              className={[
                'bubble border-2 border-blue-200/40 bg-bubble shadow-bubble',
                b.popping ? 'bubble-pop' : '',
              ].join(' ')}
            />
          ))}
        </div>

        {/* パーティクルレイヤー（ポインター透過） */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {bursts.map(burst => (
            <div key={burst.id} className="absolute" style={{ top: burst.y, left: burst.x }}>
              {burst.parts.map((p, i) => (
                <span
                  key={i}
                  className="particle"
                  style={
                    {
                      '--dx': p.dx,
                      '--dy': p.dy,
                      '--rot': p.rot,
                      '--p-size': p.size,
                      '--p-dur': `${p.dur}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          ))}
        </div>
        
        <div className="relative z-10 text-center max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <div className="inline-block px-12 py-6 bg-white/90 text-blue-800 font-bold mb-12 rounded-full border border-blue-300 shadow-lg backdrop-blur-sm">
              🚀 Full-Stack Developer
            </div>
            
            <h1 className="text-7xl md:text-[8rem] font-bold mb-12 leading-none">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">Kodama</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-500 bg-clip-text text-transparent">Portfolio</span>
              <br />
            </h1>
            
            <p className="text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              将来のフルスタック開発者として、<br />
              様々な技術を学び、アウトプットしていきます。
            </p>
            
            {/* 技術スタック表示 */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['Next.js', 'TypeScript', 'Tailwind CSS', 'NestJS', 'PostgreSQL', 'Docker', 'A11y',].map((tech, index) => (
                <div 
                  key={tech}
                  className="px-6 py-3 bg-white/80 text-blue-800 font-medium rounded-full border border-blue-200 shadow-md hover:scale-105 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {tech}
                </div>
              ))}
            </div>
            
            {/* CTA ボタン */}
            <div className="flex gap-8 justify-center">
              <Link href="/projects" className="px-16 py-6 text-xl bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-105">
                📁 プロジェクトを見る
              </Link>
              <Link href="/contact" className="px-16 py-6 text-xl border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-bold rounded-full transition-all duration-300 hover:scale-105">
                💬 お問い合わせ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 自己紹介セクション */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Me</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              技術への情熱と創造性を武器に、ユーザー中心のデザインと堅牢なアーキテクチャを両立させた
              プロダクト開発を得意としています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                K
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">経歴</h3>
                <p className="text-gray-600 leading-relaxed">
                  5年以上の開発経験を持つフルスタックエンジニア。スタートアップから大企業まで、
                  様々な規模のプロジェクトに携わり、スケーラブルなアーキテクチャの設計と
                  ユーザー体験の向上に注力しています。
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">専門分野</h3>
                <p className="text-gray-600 leading-relaxed">
                  フロントエンド開発、バックエンドAPI設計、データベース設計、
                  クラウドインフラ構築、DevOps、チームリーダーシップ
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* プロジェクト紹介セクション */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              最新の技術スタックを活用した、実用的で美しいプロダクトをご紹介します。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id}
                className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {project.title}
                  </div>
                  {hoveredProject === project.id && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Button variant="secondary">詳細を見る</Button>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    プロジェクト詳細
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* スキルセクション */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Technical Skills</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              継続的な学習と実践を通じて習得した技術スキルです。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">{skill.name}</span>
                  <span className="text-sm text-gray-600">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
          <p className="text-xl mb-8 opacity-90">
            新しいプロジェクトやコラボレーションの機会をお待ちしています。
            お気軽にお問い合わせください。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="opacity-90">kodama@example.com</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="opacity-90">+81 90-1234-5678</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="opacity-90">Tokyo, Japan</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              📧 メールで連絡
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
              💬 チャットで連絡
            </Button>
          </div>
    </div>
      </section>
    </Layout>
  )
}