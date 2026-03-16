import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { FiCode, FiLayers, FiServer, FiStar } from "react-icons/fi";

const highlights = [
  { icon: FiCode, label: "Web Development", color: "text-purple-400" },
  { icon: FiLayers, label: "Full Stack Dev", color: "text-cyan-400" },
  { icon: FiServer, label: "Backend & APIs", color: "text-violet-400" },
  { icon: FiStar, label: "Problem Solving", color: "text-blue-400" },
];

export default function About() {
  const [ref, inView] = useInView(0.2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 -left-64 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref as React.RefObject<HTMLDivElement>}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Profile Image */}
          <motion.div variants={imageVariants} className="flex justify-center">
            <div className="relative">
              {/* Rotating ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, #8b5cf6, #06b6d4, #8b5cf6)",
                  padding: "3px",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="w-full h-full rounded-full"
                  style={{ background: "hsl(222, 47%, 6%)" }}
                />
              </motion.div>

              {/* Avatar */}
              <motion.div
                className="relative w-64 h-64 rounded-full glass-dark flex items-center justify-center overflow-hidden"
                style={{ zIndex: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="w-60 h-60 rounded-full flex items-center justify-center text-8xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))",
                  }}
                >
                  👨‍💻
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 glass px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-300 border border-purple-500/30"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                B.Tech CSE
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 glass px-3 py-1.5 rounded-xl text-xs font-semibold text-cyan-300 border border-cyan-500/30"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                Data Science
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div variants={itemVariants} className="mb-4">
              <span className="text-purple-400 font-mono text-sm">// about_me</span>
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-5xl font-black mb-6"
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 leading-relaxed mb-6 text-base"
            >
              Hi, I'm <span className="text-purple-400 font-semibold">Sourish Harh</span>, a Full Stack Web Developer and Software Engineer from India. I completed my{" "}
              <span className="text-cyan-400 font-semibold">B.Tech in Computer Science (Data Science)</span>{" "}in 2026 from Brainware University.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 leading-relaxed mb-6 text-base"
            >
              I thrive on solving problems and turning ideas into reality, whether it's through clean code, intuitive designs, or robust backend systems. My journey in CSE has equipped me with a diverse skill set including JavaScript, Python, Java, React, Node.js, and Tailwind CSS.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 leading-relaxed mb-8 text-base"
            >
              I'm always excited to take on new challenges and connect with like-minded individuals.
            </motion.p>

            {/* Highlights */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-3"
            >
              {highlights.map(({ icon: Icon, label, color }) => (
                <motion.div
                  key={label}
                  className="glass rounded-xl p-4 flex items-center gap-3"
                  whileHover={{ scale: 1.04, borderColor: "rgba(139,92,246,0.4)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Icon className={color} size={20} />
                  <span className="text-sm font-medium text-gray-300">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
