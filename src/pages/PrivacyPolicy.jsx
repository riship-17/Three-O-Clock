import { useEffect } from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fdfcf8] pt-32 pb-24 selection:bg-charcoal selection:text-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-charcoal/5 flex items-center justify-center">
              <Shield className="w-8 h-8 text-charcoal" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">Privacy Policy</h1>
          <p className="text-stone font-medium text-lg uppercase tracking-widest">
            Last Updated: March 2026
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-charcoal/5 prose prose-stone max-w-none"
        >
          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">1. Introduction</h2>
            <p className="text-slate leading-relaxed">
              At Three O'Clock Café, we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit our website, and our practices for collecting and using that information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">2. Information We Collect (Firebase Analytics)</h2>
            <p className="text-slate leading-relaxed mb-4">
              We use <strong>Google Firebase Analytics</strong> to better understand how visitors interact with our website. When you consent to our use of cookies, Firebase collects anonymized data about your visit, including:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate mb-6">
              <li>Pages visited and time spent on the site</li>
              <li>General location data (city/country)</li>
              <li>Device and browser type</li>
              <li>Referral sources</li>
            </ul>
            <p className="text-slate leading-relaxed font-medium">
              We do not sell, rent, or trade any personal data to third parties. All analytics data is used strictly internally to improve user experience.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">3. Why We Collect It</h2>
            <p className="text-slate leading-relaxed">
              The data collected helps us troubleshoot website errors, determine which menu items or events are most popular, and ensure our site runs smoothly across all devices. This allows us to provide a better, faster, and more tailored digital experience that matches the quality of our physical café.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">4. How to Opt-Out</h2>
            <p className="text-slate leading-relaxed mb-4">
              You have full control over your data. You can easily opt-out of analytics tracking at any time by:
            </p>
            <ol className="list-decimal pl-5 space-y-3 text-slate">
              <li>Clicking the floating <strong>Cookie icon</strong> in the bottom-left corner of our website and selecting "Decline".</li>
              <li>Clearing your browser's Local Storage or Cookies for this site.</li>
              <li>Using browser extensions like the Google Analytics Opt-out Browser Add-on.</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-4">5. Contact Us</h2>
            <p className="text-slate leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us at:
              <br /><br />
              <strong>Email:</strong> privacy@threeoclockcafe.com<br />
              <strong>Address:</strong> Signature 13, Raysan, Gandhinagar, Gujarat
            </p>
          </section>
        </motion.div>

      </div>
    </div>
  );
}
