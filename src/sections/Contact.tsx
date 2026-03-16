import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "../hooks/useInView";
import { FiGithub, FiLinkedin, FiMail, FiSend, FiCheckCircle } from "react-icons/fi";

const MY_EMAIL = "harhsourish3@gmail.com";

export default function Contact() {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);

    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Hi Sourish,\n\nYou have a new message from your portfolio:\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}\n\n---\nSent from your portfolio contact form`
    );
    const mailtoLink = `mailto:${MY_EMAIL}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailtoLink;
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const socials = [
    {
      icon: FiGithub,
      label: "GitHub",
      href: "https://github.com/Sourishharh",
      value: "github.com/Sourishharh",
      color: "text-gray-300 hover:text-white",
      bg: "hover:bg-white/10",
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sourish-harh-86298124b/",
      value: "linkedin.com/in/sourish-harh",
      color: "text-blue-400 hover:text-blue-300",
      bg: "hover:bg-blue-500/10",
    },
    {
      icon: FiMail,
      label: "Email",
      href: `mailto:${MY_EMAIL}`,
      value: MY_EMAIL,
      color: "text-purple-400 hover:text-purple-300",
      bg: "hover:bg-purple-500/10",
    },
  ];

  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6">
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
            // get_in_touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-4xl md:text-5xl font-black mb-4"
          >
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-gray-400 max-w-xl mx-auto"
          >
            Have a project in mind or just want to say hi? I'd love to hear from you!
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Get In Touch</h3>
            <p className="text-gray-400 leading-relaxed mb-8">
              Whether you have a project idea, a question, or just want to connect — my inbox is always open. I'll try my best to get back to you!
            </p>

            {/* Social Links */}
            <div className="space-y-3">
              {socials.map(({ icon: Icon, label, href, value, color, bg }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 glass rounded-xl px-5 py-4 ${color} ${bg} transition-all duration-200`}
                  whileHover={{ x: 6, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} />
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-200 text-sm">{label}</span>
                    <span className="text-xs text-gray-500">{value}</span>
                  </div>
                  <span className="ml-auto text-gray-500 text-sm">→</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-2xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[380px]"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                >
                  <FiCheckCircle size={60} className="text-green-400 mb-5" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Email Client Opened!</h3>
                <p className="text-gray-400 mb-4">
                  Your message is ready to send to{" "}
                  <span className="text-purple-400 font-medium">{MY_EMAIL}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Just hit <span className="text-white font-medium">Send</span> in your email client to deliver the message.
                </p>
                <motion.button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-6 px-6 py-2.5 rounded-xl text-sm font-medium text-purple-300 border border-purple-500/30 hover:bg-purple-500/10 transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 space-y-5"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Your message..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all duration-200 resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-white transition-all duration-200"
                  style={{
                    background: loading
                      ? "rgba(139,92,246,0.5)"
                      : "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                  }}
                  whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 30px rgba(139,92,246,0.4)" } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                >
                  {loading ? (
                    <motion.div
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    />
                  ) : (
                    <>
                      <FiSend size={16} />
                      Send Message to Sourish
                    </>
                  )}
                </motion.button>
                <p className="text-center text-xs text-gray-600">
                  Opens your default email app pre-filled with your message
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
