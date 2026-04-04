/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ExternalLink, 
  Github, 
  Layers, 
  Zap, 
  Globe, 
  Code2, 
  ArrowRight,
  Monitor,
  Cpu,
  Sparkles
} from 'lucide-react';

// --- Constants & Types ---

const projects = [
  {
    id: 1,
    title: "关系图",
    category: "可视化 / 工具",
    description: "一个深度交互的关系网络可视化工具，展示复杂数据间的内在联系。",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tech: ["GitHub Pages", "D3.js", "Visualization"],
    link: "https://linhexing2.github.io/guanxitu"
  },
  {
    id: 2,
    title: "哔哩哔哩主页",
    category: "内容创作 / 动态",
    description: "作者的 Bilibili 官方主页，分享动效设计与前端开发的探索历程。",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
    tech: ["Bilibili", "Content Creation", "Motion"],
    link: "https://space.bilibili.com/3537124691282425?spm_id_from=333.1007.0.0"
  }
];

const springTransition = { type: "spring", stiffness: 400, damping: 15 };

// --- Components ---

const CinematicText = ({ text, className = "" }: { text: string; className?: string }) => {
  const words = text.split(" ");
  return (
    <div className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: i * 0.1,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="mr-3 inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <div className="glass-panel rounded-[2rem] overflow-hidden flex flex-col h-full">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6">
            <span className="px-3 py-1 bg-accent/20 border border-accent/30 rounded-full text-[10px] font-bold tracking-widest text-accent uppercase">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col flex-1">
          <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map(t => (
              <span key={t} className="text-[10px] font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">
                {t}
              </span>
            ))}
          </div>

          <motion.a
            href={project.link}
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-accent"
          >
            探索项目 <ArrowRight size={16} />
          </motion.a>
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-accent to-accent-purple rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10" />
    </motion.div>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={containerRef} className="relative min-h-screen selection:bg-accent/30 selection:text-white overflow-x-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 -z-20 bg-[#050505]">
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-30"
        >
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-accent/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-purple/20 rounded-full blur-[150px]" />
        </motion.div>
        
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-20 flex items-center justify-between px-8 md:px-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
            <div className="w-5 h-5 bg-black rounded-sm rotate-45" />
          </div>
          <span className="font-display font-bold text-xl tracking-tighter">木板</span>
        </motion.div>

        <div className="flex items-center gap-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-white text-black rounded-full text-xs font-bold tracking-widest uppercase hover:bg-accent transition-colors"
          >
            联系我
          </motion.button>
        </div>
      </nav>

      <main className="relative z-10 pt-32 pb-32 px-8 md:px-16 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-24">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
            >
              <Sparkles size={14} className="text-accent" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                资深动效设计师 & 前端工程师
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tighter leading-tight mb-8">
              打造极致的自定义。
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-lg text-slate-400 max-w-xl leading-relaxed font-light"
            >
              精心策划的数字作品集，由美学驱动，由创新赋能。
            </motion.p>
          </div>
        </section>

        {/* Project Grid */}
        <section>
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-accent mb-2">精选作品</h2>
              <div className="text-3xl font-display font-bold">作品存档</div>
            </div>
            <div className="hidden md:block text-slate-500 text-xs font-mono">
              [ 共 02 个项目 ]
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer Info */}
      <footer className="px-8 md:px-16 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-slate-500 text-[10px] font-bold tracking-widest uppercase">
          © 2026 愿景中心。保留所有权利。
        </div>
        <div className="flex gap-8">
          <a href="https://github.com/linhexing2/linhexing2.github.io" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white transition-colors">
            <Github size={20} />
          </a>
        </div>
      </footer>
    </div>
  );
}
