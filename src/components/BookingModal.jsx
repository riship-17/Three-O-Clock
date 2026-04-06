import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, MessageCircle } from 'lucide-react';

// All three get the same booking message simultaneously
const WHATSAPP_NUMBERS = [
  '919898947333',
];



export default function BookingModal({ isOpen, onClose, event }) {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState('19:00');
  const [guests, setGuests] = useState('2');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (userName.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Build the WhatsApp message
    const message = [
      `🍵 *New Table Reservation — Three O'Clock Café*`,
      ``,
      `👤 *Name:* ${userName}`,
      `📞 *Phone:* ${phone}`,
      `🎟️ *Pass Type:* ${event?.category || "Standard Table"}`,
      `🎉 *Event:* ${event?.title || "Evening Reservation"}`,
      `📅 *Date:* ${event?.date || "—"}`,
      `🕐 *Time:* ${time}`,
      `👥 *Guests:* ${guests}`,
      ``,
      `_Sent via Three O'Clock website_`,
    ].join('\n');
    const encodedMessage = encodeURIComponent(message);
    // Open a WhatsApp chat for each number (staggered so browsers don't block)
    WHATSAPP_NUMBERS.forEach((number, i) => {
      setTimeout(() => {
        window.open(`https://wa.me/${number}?text=${encodedMessage}`, '_blank');
      }, i * 600);
    });
    setIsSuccess(true);
  };

  const handleClose = () => {
    onClose();
    // Reset state after close animation
    setTimeout(() => {
      setUserName('');
      setPhone('');
      setTime('19:00');
      setGuests('2');
      setErrors({});
      setIsSuccess(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-charcoal/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#fdfcf8] rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="bg-[#3c3c3c] p-6 md:p-8 text-white relative shrink-0">
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl md:text-3xl font-black tracking-tighter">Reserve Your Spot</h3>
            <p className="text-stone text-[10px] md:text-sm font-medium mt-1">
              Book a table for {event?.title}
            </p>
          </div>

          <div className="p-6 md:p-10 overflow-y-auto overflow-x-hidden scrollbar-hide">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    value={userName}
                    onChange={(e) => {
                      setUserName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="Enter your name"
                    className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-stone/10'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#3c3c3c]/10 text-charcoal font-medium transition-all`}
                  />
                  {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone mb-2">Phone Number</label>
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: '' });
                    }}
                    placeholder="10-digit mobile number"
                    className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-stone/10'} rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#3c3c3c]/10 text-charcoal font-medium transition-all`}
                  />
                  {errors.phone && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.phone}</p>}
                </div>

                {/* Guests & Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone mb-2">Guests</label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-white border border-stone/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#3c3c3c]/10 text-charcoal font-medium appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map(n => (
                        <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-stone mb-2">Preferred Time</label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-white border border-stone/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#3c3c3c]/10 text-charcoal font-medium"
                    />
                  </div>
                </div>

                {/* Event Summary */}
                <div className="bg-stone/5 rounded-2xl p-5 border border-stone/5">
                  <div className="flex justify-between text-xs font-bold text-stone tracking-wider uppercase mb-2">
                    <span>Event</span>
                    <span className="text-[#3c3c3c]">{event?.date}</span>
                  </div>
                  <p className="text-charcoal font-medium text-sm">
                    {event?.title} · <span className="text-stone">Three O'Clock Café</span>
                  </p>
                </div>

                {/* WhatsApp hint */}
                <p className="text-[10px] text-stone/70 text-center font-medium tracking-wide">
                  Tapping below will open WhatsApp with your booking details pre-filled.
                </p>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-[#25D366] text-white py-5 rounded-2xl font-bold tracking-widest uppercase hover:bg-[#1ebe5a] transition-all transform active:scale-[0.98] shadow-xl flex items-center justify-center gap-3"
                >
                  <MessageCircle size={20} />
                  Confirm via WhatsApp
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
                  <h4 className="text-3xl font-black tracking-tighter text-[#3c3c3c]">Message Sent!</h4>
                  <p className="text-stone font-medium">
                    WhatsApp opened with your booking for <b>{event?.title}</b>.
                    We'll confirm your reservation shortly!
                  </p>
                </div>

                <button
                  onClick={handleClose}
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
