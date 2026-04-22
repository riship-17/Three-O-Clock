import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What time does Three O'Clock Café close?",
    answer: "Three O'Clock Café is open until 3 AM every day of the week, making it Gandhinagar's go-to late-night café."
  },
  {
    question: "Where is Three O'Clock Café located?",
    answer: "Three O'Clock Café is located at 226/2, Koba, PDPU Road, Raysan, Gandhinagar, Gujarat. It is approximately 30 minutes from Ahmedabad city centre."
  },
  {
    question: "Does Three O'Clock Café serve Vietnamese coffee?",
    answer: "Yes! Three O'Clock Café specialises in authentic Vietnamese coffee along with a curated café menu, making it unique in the Gandhinagar–Ahmedabad area."
  },
  {
    question: "Does Three O'Clock Café have live music?",
    answer: "Yes, Three O'Clock Café hosts regular live music nights. Check our Instagram @threeoclock_gandhinagar for upcoming event dates."
  },
  {
    question: "Is Three O'Clock Café open on weekends?",
    answer: "Yes, Three O'Clock Café is open 7 days a week from 10AM to 3 AM, including all weekends and public holidays."
  },
  {
    question: "Is Three O'Clock Café near PDPU?",
    answer: "Yes, Three O'Clock Café is located on PDPU Road in Raysan, making it the closest late-night café to Pandit Deendayal Energy University (PDPU)."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 md:py-40 bg-coffee relative overflow-hidden" id="faq">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/3 -skew-x-12 transform translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-stone" />
            <span className="section-label !text-stone !font-mono text-xs">GOT QUESTIONS?</span>
            <div className="h-px w-8 bg-stone" />
          </div>
          <h2 className="section-title text-linen font-heading uppercase tracking-tighter">FAQs</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-b border-linen/10 transition-colors duration-500 ${openIndex === index ? 'bg-white/5 rounded-2xl px-4 md:px-8' : 'px-4 md:px-8'}`}
            >
              <button
                className="w-full py-6 md:py-8 text-left flex justify-between items-center focus:outline-none group"
                onClick={() => toggleFAQ(index)}
              >
                <span className={`text-lg md:text-2xl font-sans font-bold tracking-tight transition-colors duration-300 ${openIndex === index ? 'text-stone' : 'text-cream group-hover:text-stone'}`}>
                  {faq.question}
                </span>
                <span className={`text-2xl transform transition-transform duration-500 ${openIndex === index ? 'rotate-45 text-stone' : 'text-cream/30'}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  >
                    <p className="pb-6 md:pb-8 text-base md:text-lg text-cream/70 font-sans leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


