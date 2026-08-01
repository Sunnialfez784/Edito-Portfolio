import React from "react";
import {motion} from "framer-motion";
import {FiScissors, FiSliders, FiLayout, FiCpu} from "react-icons/fi";
import { MdAnimation } from "react-icons/md";
import Reveal from "./Reveal.jsx";

const SKILLS = [
  {
    icon: FiScissors,
    name: "CapCut Pro",
    level: 95,
    exp: "4.5+ Years",
    desc: "Professional mobile & desktop editing for high-quality reels, shorts and quick cinematic edits.",
  },
  {
    icon: FiSliders,
    name: "DaVinci Resolve",
    level: 90,
    exp: "3+ Years",
    desc: "Industry-standard color grading, cinematic editing and audio post-production.",
  },
  {
    icon: FiLayout,
    name: "Canva",
    level: 85,
    exp: "2+ Years",
    desc: "Eye-catching thumbnails, banners, presentations and branding assets.",
  },
  {
    icon: FiCpu,
    name: "Generative AI",
    level: 80,
    exp: "2+ Year",
    desc: "AI background removal, image generation, voice, subtitles, script and smart editing.",
  },
  {
    icon: MdAnimation,
    name: "After Effects",
    level: 60,
    exp: "1+ Year",
    desc: "Create professional motion graphics, logo animations, cinematic transitions, visual effects, and engaging video intros with smooth animations.",
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative section-pad">
      <Reveal className="max-w-2xl mb-16">
        <p className="eyebrow mb-4">00:06:20 — Toolkit</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          Software I <span className="grad-text">master</span>
        </h2>
      </Reveal>

      <div className="grid sm:grid-cols-2 gap-7">
        {SKILLS.map((s, i) => (
          <motion.div key={s.name} initial={{opacity: 0, y: 30}} whileInView={{opacity: 1, y: 0}} viewport={{once: true, amount: 0.2}} transition={{duration: 0.5, delay: i * 0.08}} whileHover={{y: -6}} className="card p-7 hover:border-cyan-400/40">
            <div className="flex items-center gap-4 mb-5">
              <span className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 text-violet-400">
                <s.icon size={20} />
              </span>
              <div>
                <h3 className="font-display text-lg">{s.name}</h3>
                <span className="timecode">{s.exp} experience</span>
              </div>
            </div>
            <p className="text-sm text-mist-500 leading-relaxed mb-5">{s.desc}</p>
            <div className="flex items-center justify-between text-xs text-mist-500 mb-2">
              <span>Proficiency</span>
              <span className="font-mono text-cyan-400">{s.level}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div initial={{width: 0}} whileInView={{width: `${s.level}%`}} viewport={{once: true}} transition={{duration: 1, ease: "easeOut", delay: 0.2}} className="h-full bg-grad-violet-cyan rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
