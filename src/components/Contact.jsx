import React, {useState} from "react";
import {motion} from "framer-motion";
import {FiPhone, FiMail, FiInstagram, FiLinkedin, FiYoutube, FiGithub, FiCheck, FiMapPin} from "react-icons/fi";
import {SiBehance, SiWhatsapp} from "react-icons/si";
import Reveal from "./Reveal.jsx";

const SOCIALS = [
  {icon: FiInstagram, href: "https://www.instagram.com/rehanneditz/", label: "Instagram"},
  {icon: FiLinkedin, href: "https://www.linkedin.com/in/rehan-sorthiya-573090381/", label: "LinkedIn"},
  {icon: FiYoutube, href: "https://www.youtube.com/@rehann-editz11", label: "YouTube"},
  {icon: SiBehance, href: "https://www.behance.net/khwajaji11", label: "Behance"},
  {icon: SiWhatsapp, href: "https://wa.me/917046340306", label: "WhatsApp"},
  {icon: FiGithub, href: "https://github.com/rehan635", label: "GitHub"},
];

const EMPTY = {name: "", email: "", projectType: "YouTube Editing", budget: "", message: ""};

// Admin's WhatsApp number (same one used in SOCIALS above), digits only, with country code, no + or spaces
const ADMIN_WHATSAPP = "917046340306";

function buildWhatsAppMessage(form) {
  return `*New Project Inquiry*\n\n` + `*Name:* ${form.name}\n` + `*Email:* ${form.email}\n` + `*Project Type:* ${form.projectType}\n` + `*Budget:* ${form.budget ? form.budget : "Not specified"}\n\n` + `*Message:*\n${form.message}`;
}

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("sending");

    const text = encodeURIComponent(buildWhatsAppMessage(form));
    const waUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${text}`;

    setTimeout(() => {
      // Opens WhatsApp (app on mobile, web.whatsapp.com on desktop) with the message pre-filled.
      // User just has to tap Send on their end — WhatsApp doesn't allow silent/automatic
      // sending from a browser without their own Business API + backend.
      window.open(waUrl, "_blank", "noopener,noreferrer");
      setStatus("sent");
      setForm(EMPTY);
      setTimeout(() => setStatus("idle"), 3500);
    }, 800);
  };

  return (
    <section id="contact" className="relative section-pad">
      <Reveal className="max-w-2xl mb-16">
        <p className="eyebrow mb-4">00:15:50 — Contact</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          Let's create something <span className="grad-text">cinematic</span>
        </h2>
        <p className="text-mist-500 mt-4">Have a project in mind? Fill out the form or reach out directly — I usually reply within a few hours.</p>
      </Reveal>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
        <Reveal delay={0.1} className="lg:col-span-3">
          <form onSubmit={submit} className="card p-6 sm:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-xs text-mist-500 mb-1.5">Name</label>
                <input required value={form.name} onChange={(e) => setForm((f) => ({...f, name: e.target.value}))} placeholder="Your name" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 outline-none" />
              </div>
              <div>
                <label className="block text-xs text-mist-500 mb-1.5">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({...f, email: e.target.value}))} placeholder="you@email.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 outline-none" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <label className="block text-xs text-mist-500 mb-1.5">Project Type</label>
                <select value={form.projectType} onChange={(e) => setForm((f) => ({...f, projectType: e.target.value}))} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 outline-none text-mist-200">
                  {["YouTube Editing", "Instagram Reels", "Corporate Video", "Advertisement", "Wedding Highlight", "Other"].map((o) => (
                    <option key={o} value={o} className="bg-ink-800">
                      {o}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-mist-500 mb-1.5">Budget (optional)</label>
                <input value={form.budget} onChange={(e) => setForm((f) => ({...f, budget: e.target.value}))} placeholder="e.g. $200 – $500" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-mist-500 mb-1.5">Message</label>
              <textarea required rows={5} value={form.message} onChange={(e) => setForm((f) => ({...f, message: e.target.value}))} placeholder="Tell me about your project..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-violet-400 outline-none resize-none" />
            </div>

            <motion.button type="submit" disabled={status === "sending"} whileHover={{scale: 1.02}} whileTap={{scale: 0.98}} data-cursor-hover className="btn-primary w-full disabled:opacity-70">
              {status === "sending" && "Sending..."}
              {status === "sent" && (
                <>
                  <FiCheck /> Message Sent
                </>
              )}
              {status === "idle" && "Send Message"}
            </motion.button>
          </form>
        </Reveal>

        <Reveal delay={0.2} className="lg:col-span-2 space-y-6">
          <div className="card p-6 sm:p-7">
            <a href="tel:+917046340306" data-cursor-hover className="flex items-center gap-4 mb-5 group">
              <span className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-violet-500/20 transition-colors">
                <FiPhone size={17} />
              </span>
              <div>
                <p className="timecode">Phone</p>
                <p className="text-sm font-medium">+91 7046340306</p>
              </div>
            </a>
            <a href="mailto:rehann11@gmail.com" data-cursor-hover className="flex items-center gap-4 group">
              <span className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-violet-500/20 transition-colors">
                <FiMail size={17} />
              </span>
              <div>
                <p className="timecode">Email</p>
                <p className="text-sm font-medium">Rehanraja4726@gmail.com</p>
              </div>
            </a>
          </div>

          <div className="card p-6 sm:p-7">
            <p className="timecode mb-4">Find me online</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" data-cursor-hover aria-label={s.label} className="aspect-square rounded-xl bg-white/5 flex items-center justify-center hover:bg-grad-violet-cyan hover:text-ink-950 text-mist-300 transition-all duration-300">
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="card p-0 overflow-hidden relative h-36 sm:h-40">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1A1A2E_0%,#0B0B0F_80%)] flex items-center justify-center flex-col gap-2">
              <FiMapPin className="text-violet-400" size={22} />
              <span className="timecode">Remote — Available Worldwide</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
