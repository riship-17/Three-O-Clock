import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

export default function BookingModal({ isOpen, onClose, event }) {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState('2');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    emailjs.init("zUM9PAhuNFivjm347");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceID = "service_071p8uo";
    const templateID = "template_58n4g6l";

    const templateParams = {
      name: userName,
      phone: phone,
      guests: guests,
      event: event.title,
      day: event.date
    };

    try {
      const result = await emailjs.send(serviceID, templateID, templateParams);
      console.log("EmailJS Success:", result.text);
    } catch (err) {
      console.error("EmailJS Error:", err);
    } finally {
      setIsSuccess(true);
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-charcoal/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#fdfcf8] rounded-[40px] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#3c3c3c] p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-3xl font-black tracking-tighter">Reserve Your Spot</h3>
            <p className="text-stone text-sm font-medium mt-1">Book a table for {event.title}</p>
          </div>

          <div className="p-10">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-white border border-stone/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#3c3c3c]/10 text-charcoal font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone mb-2">Phone</label>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone number"
                      className="w-full bg-white border border-stone/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#3c3c3c]/10 text-charcoal font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone mb-2">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-white border border-stone/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#3c3c3c]/10 text-charcoal font-medium appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                        <option key={n} value={n}>{n} Guests</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="bg-stone/5 rounded-2xl p-6 border border-stone/5">
                  <div className="flex justify-between text-xs font-bold text-stone tracking-wider uppercase mb-2">
                    <span>Schedule</span>
                    <span className="text-[#3c3c3c]">{event.date}</span>
                  </div>
                  <p className="text-charcoal leading-relaxed font-medium">Selected: <span className="text-stone">Three O'Clock Café</span></p>
                </div>

                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-[#3c3c3c] text-white py-5 rounded-2xl font-bold tracking-widest uppercase hover:bg-stone transition-all transform active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>Confirm Reservation &rarr;</>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-6 space-y-8"
              >
                <div className="flex justify-center">
                  <div className="w-24 h-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={48} />
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-3xl font-black tracking-tighter text-[#3c3c3c]">Reservation Confirmed!</h4>
                  <p className="text-stone font-medium">Your booking for <b>{event.title}</b> has been submitted. We'll be in touch soon!</p>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-[#3c3c3c] text-white py-5 rounded-2xl font-bold tracking-widest uppercase hover:bg-stone transition-all transform active:scale-[0.98] shadow-xl"
                >
                  Close
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
