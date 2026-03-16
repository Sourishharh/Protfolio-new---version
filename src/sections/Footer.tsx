import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiHeart } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(139,92,246,0.05), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-gray-500 text-sm flex items-center gap-2"
        >
          © 2026 Sourish Harh · Made with{" "}
          <motion.span
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <FiHeart className="text-red-400 inline" size={14} />
          </motion.span>
          {" "}& ☕
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4"
        >
          {[
            { icon: FiGithub, href: "https://github.com/Sourishharh", label: "GitHub" },
            { icon: FiLinkedin, href: "https://www.linkedin.com/in/sourish-harh-86298124b/", label: "LinkedIn" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-gray-500 hover:text-purple-400 transition-colors duration-200"
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}
