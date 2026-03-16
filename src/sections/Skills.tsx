import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import {
  FaJs, FaPython, FaJava, FaReact, FaNodeJs, FaHtml5, FaCss3Alt
} from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiExpress, SiMysql } from "react-icons/si";

const skills = [
  { name: "JavaScript", icon: FaJs, level: 85, color: "#f7df1e", glow: "rgba(247,223,30,0.3)" },
  { name: "Python", icon: FaPython, level: 80, color: "#3776ab", glow: "rgba(55,118,171,0.3)" },
  { name: "Java", icon: FaJava, level: 75, color: "#ed8b00", glow: "rgba(237,139,0,0.3)" },
  { name: "React", icon: FaReact, level: 83, color: "#61dafb", glow: "rgba(97,218,251,0.3)" },
  { name: "Node.js", icon: FaNodeJs, level: 70, color: "#339933", glow: "rgba(51,153,51,0.3)" },
  { name: "Express.js", icon: SiExpress, level: 72, color: "#ffffff", glow: "rgba(255,255,255,0.2)" },
  { name: "Tailwind CSS", icon: SiTailwindcss, level: 88, color: "#38bdf8", glow: "rgba(56,189,248,0.3)" },
  { name: "MongoDB", icon: SiMongodb, level: 68, color: "#47a248", glow: "rgba(71,162,72,0.3)" },
  { name: "MySQL", icon: SiMysql, level: 72, color: "#00758f", glow: "rgba(0,117,143,0.3)" },
  { name: "HTML", icon: FaHtml5, level: 92, color: "#e34f26", glow: "rgba(227,79,38,0.3)" },
  { name: "CSS", icon: FaCss3Alt, level: 88, color: "#1572b6", glow: "rgba(21,114,182,0.3)" },
];

export default function Skills() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="skills" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-purple-400 font-mono text-sm block mb-3"
          >
            // my_skills
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Technical <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            A diverse toolkit forged through hands-on projects and continuous learning.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface SkillCardProps {
  skill: typeof skills[0];
  index: number;
  inView: boolean;
}

function SkillCard({ skill, index, inView }: SkillCardProps) {
  const Icon = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        y: -5,
        boxShadow: `0 0 30px ${skill.glow}, 0 0 60px ${skill.glow.replace("0.3", "0.1")}`,
      }}
      className="glass rounded-2xl p-6 cursor-default group transition-all duration-300"
      style={{ borderColor: "rgba(255,255,255,0.05)" }}
    >
      {/* Icon */}
      <motion.div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${skill.glow}` }}
        whileHover={{ rotate: 10, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Icon size={24} style={{ color: skill.color }} />
      </motion.div>

      {/* Name & Level */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-200 text-sm">{skill.name}</h3>
        <motion.span
          className="text-xs font-bold"
          style={{ color: skill.color }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: index * 0.07 + 0.4 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`,
            boxShadow: `0 0 8px ${skill.glow}`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ delay: index * 0.07 + 0.3, duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
