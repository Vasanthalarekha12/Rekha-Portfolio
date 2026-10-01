import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { createDocument } from '../lib/db';
import SectionHeader from '../components/SectionHeader';
import InteractiveBackground from '../components/InteractiveBackground';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await createDocument('contactMessages', formData);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div id="contact" className="w-full py-24 relative overflow-hidden min-h-screen">
      <InteractiveBackground theme="contact" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader label="GET IN TOUCH" title1="Contact" title2="Me" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">Let's Connect</h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed text-lg mb-8">
                Feel free to reach out to me for any questions or opportunities. I am always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>

            <div className="space-y-8">
              <a href="mailto:vasanthalarekha12@gmail.com" className="flex items-center gap-6 group premium-card p-6 border-transparent hover:border-[var(--color-accent)]/30 transition-all">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-[var(--color-text-primary)] transition-colors duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] font-medium mb-1 uppercase tracking-wider">Email</p>
                  <p className="text-lg text-[var(--color-text-primary)] font-medium group-hover:text-[var(--color-accent)] transition-colors">vasanthalarekha12@gmail.com</p>
                </div>
              </a>
              
              <a href="https://wa.me/918247848743" target="_blank" rel="noreferrer" className="flex items-center gap-6 group premium-card p-6 border-transparent hover:border-[var(--color-accent)]/30 transition-all">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-300">
                  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] font-medium mb-1 uppercase tracking-wider">WhatsApp</p>
                  <p className="text-lg text-[var(--color-text-primary)] font-medium group-hover:text-[var(--color-accent)] transition-colors">+91 82478 48743</p>
                </div>
              </a>

              <div className="flex items-center gap-6 premium-card p-6 border-transparent">
                <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] font-medium mb-1 uppercase tracking-wider">Location</p>
                  <p className="text-lg text-[var(--color-text-primary)] font-medium">Samalkot, Andhra Pradesh, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="premium-card p-8 md:p-10">
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8">Send me a message</h2>
              
              {status.message && (
                <div className={`p-4 rounded-xl mb-8 ${status.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                  {status.message}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="premium-input"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="premium-input"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="premium-input"
                    placeholder="How can I help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--color-text-muted)] mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="premium-input resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <button
                  id="contact-cta"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-[var(--color-accent)] text-[var(--color-text-primary)] rounded-xl font-bold tracking-wide hover:bg-[var(--color-accent)] hover:shadow-[0_0_20px_rgba(255,122,0,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed group mt-4"
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
