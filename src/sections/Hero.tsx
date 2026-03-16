import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiDownload, FiArrowDown } from "react-icons/fi";
import { useTypewriter } from "../hooks/useTypewriter";

const roles = [
  "Web Developer",
  "Software Engineer",
  "Full Stack Developer",
  "React Developer",
  "Problem Solver",
];

export default function Hero() {
  const typedText = useTypewriter({
    texts: roles,
    typingSpeed: 60,
    deletingSpeed: 40,
    pauseTime: 1800,
  });

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 border border-purple-500/30 rounded"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              rotate: i * 30,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [i * 30, i * 30 + 180, i * 30 + 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6 inline-block">
          <span className="glass px-4 py-2 rounded-full text-xs font-medium text-purple-300 border border-purple-500/30">
            ✨ Welcome to my Portfolio
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-black mb-4 leading-tight"
        >
          Hi, I'm{" "}
          <span className="gradient-text">Sourish Harh</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          variants={itemVariants}
          className="text-xl md:text-2xl font-semibold text-gray-300 mb-3 h-10 flex items-center justify-center gap-2"
        >
          <span className="text-cyan-400">&lt;</span>
          <span className="min-w-[280px] text-left">{typedText}</span>
          <span className="cursor-blink text-purple-400 font-thin text-3xl leading-none">|</span>
          <span className="text-cyan-400">/&gt;</span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 max-w-2xl mx-auto mb-6 text-base md:text-lg leading-relaxed"
        >
          B.Tech CSE (Data Science) graduate · Full Stack Developer passionate about
          building elegant digital experiences and scalable applications.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <motion.a
            href="/resume.pdf"
            download
            className="group relative flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
            }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139,92,246,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "linear-gradient(135deg, #a78bfa, #8b5cf6)" }}
            />
            <FiDownload className="relative z-10" size={18} />
            <span className="relative z-10">Download Resume</span>
          </motion.a>

          <motion.button
            onClick={scrollToProjects}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-purple-300 gradient-border"
            style={{ background: "rgba(139,92,246,0.08)" }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "rgba(139,92,246,0.15)",
              boxShadow: "0 0 20px rgba(139,92,246,0.2)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <FiArrowDown className="group-hover:translate-y-1 transition-transform" size={18} />
            View Projects
          </motion.button>
        </motion.div>

        {/* Social Icons */}
        <motion.div variants={itemVariants} className="flex gap-4 justify-center">
          {[
            {
              Icon: FiGithub,
              href: "https://github.com/Sourishharh",
              label: "GitHub",
              color: "hover:text-white",
            },
            {
              Icon: FiLinkedin,
              href: "https://www.linkedin.com/in/sourish-harh-86298124b/",
              label: "LinkedIn",
              color: "hover:text-blue-400",
            },
          ].map(({ Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`glass p-3 rounded-xl text-gray-400 ${color} transition-colors duration-200`}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col items-center gap-2 text-gray-500"
        >
          <span className="text-xs tracking-widest uppercase">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border border-gray-600 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-purple-400 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
