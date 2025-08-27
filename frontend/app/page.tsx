'use client'

import { useState } from 'react'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  // モックデータ
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Next.js × NestJS で構築されたモダンなECサイト",
      image: "/api/placeholder/400/300",
      tech: ["Next.js", "TypeScript", "NestJS", "PostgreSQL"],
      link: "#"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "リアルタイム協業機能付きタスク管理アプリ",
      image: "/api/placeholder/400/300",
      tech: ["React", "Node.js", "Socket.io", "MongoDB"],
      link: "#"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "このポートフォリオサイト自体のプロジェクト",
      image: "/api/placeholder/400/300",
      tech: ["Next.js", "Tailwind CSS", "shadcn/ui"],
      link: "#"
    }
  ]

  const skills = [
    { name: "JavaScript", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "React", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "NestJS", level: 75 },
    { name: "PostgreSQL", level: 70 },
    { name: "MongoDB", level: 65 }
  ]

  return (
    <Layout>
      {/* ヒーローセクション */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
        {/* 背景の泡アニメーション */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border-2 border-blue-200/40 animate-bubble-float"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(59,130,246,0.15))`,
                boxShadow: `inset 0 2px 4px rgba(255,255,255,0.4), 0 2px 8px rgba(59,130,246,0.3)`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
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
            </h1>
            
            <p className="text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              フルスタック開発者として<br />
              技術とデザインの美しい調和を追求し<br />
              ユーザー体験を革新するプロダクトを創造します
            </p>
            
            {/* 技術スタック表示 */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'NestJS', 'Prisma', 'PostgreSQL'].map((tech, index) => (
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
              <Button size="lg" className="px-16 py-6 text-xl bg-blue-600 hover:bg-blue-700">
                📁 プロジェクトを見る
              </Button>
              <Button variant="outline" size="lg" className="px-16 py-6 text-xl border-2 border-blue-600 text-blue-700 hover:bg-blue-50">
                💬 お問い合わせ
              </Button>
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