import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { FiGithub, FiExternalLink, FiZap } from "react-icons/fi";

const projects = [
  {
    title: "Smart Resume Builder",
    description:
      "AI-powered resume builder that helps users generate professional resumes quickly. Leverages intelligent templates and smart suggestions to craft standout resumes.",
    github: "https://github.com/Sourishharh/Smart-Resume-Builder",
    tags: ["AI", "React", "JavaScript"],
    gradient: "from-purple-500/20 to-violet-500/20",
    border: "border-purple-500/20",
    glow: "rgba(139,92,246,0.3)",
    emoji: "📄",
  },
  {
    title: "Password Manager",
    description:
      "Secure password manager application for storing and managing credentials safely. Features encryption, organized storage, and an intuitive interface.",
    github: "https://github.com/Sourishharh/Password-Manager",
    tags: ["Security", "JavaScript", "Encryption"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/20",
    glow: "rgba(6,182,212,0.3)",
    emoji: "🔐",
  },
  {
    title: "PDF Chatbot",
    description:
      "AI chatbot that allows users to interact with and ask questions from multiple PDF documents. Upload PDFs and chat intelligently with your documents.",
    github: "https://github.com/Sourishharh/chat-in-multiple-pdfs",
    tags: ["AI", "LLM", "Python", "LangChain"],
    gradient: "from-violet-500/20 to-purple-500/20",
    border: "border-violet-500/20",
    glow: "rgba(168,85,247,0.3)",
    emoji: "🤖",
  },
];

export default function Projects() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-purple-400 font-mono text-sm block mb-3"
          >
            // featured_projects
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            My <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            Here are some projects I've built — from AI-powered tools to secure applications.
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface Project {
  title: string;
  description: string;
  github: string;
  tags: string[];
  gradient: string;
  border: string;
  glow: string;
  emoji: string;
}

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 60px ${project.glow}, 0 0 0 1px ${project.glow.replace("0.3", "0.4")}`,
      }}
      className={`glass rounded-2xl p-6 flex flex-col border ${project.border} transition-all duration-300 group cursor-default`}
    >
      {/* Header */}
      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}>
        {project.emoji}
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
        {project.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 text-xs font-medium rounded-full"
            style={{
              background: project.glow.replace("0.3", "0.15"),
              color: project.glow.includes("6,182") ? "#67e8f9" : project.glow.includes("168,85") ? "#c4b5fd" : "#c4b5fd",
              border: `1px solid ${project.glow.replace("0.3", "0.2")}`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3">
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-200 transition-all"
          style={{ background: "rgba(255,255,255,0.06)" }}
          whileHover={{
            scale: 1.05,
            background: "rgba(255,255,255,0.12)",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <FiGithub size={16} />
          GitHub
        </motion.a>
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ml-auto"
          style={{
            background: project.glow.replace("0.3", "0.15"),
            color: project.glow.includes("6,182") ? "#67e8f9" : "#c4b5fd",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <FiZap size={14} />
          View
          <FiExternalLink size={13} />
        </motion.a>
      </div>
    </motion.div>
  );
}
