import Header from "@/components/Header";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-purple-600">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <p>Welcome to Cursive Generator. We value your privacy and are committed to protecting your personal information.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
            <p>We do not collect any personal information from users of our cursive generator service. No cookies, no tracking, no data collection.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
            <p>Since we do not collect any personal information, we do not use or share any data about you.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">3. Third-Party Services</h2>
            <p>Our website may include links to third-party websites. We are not responsible for the privacy practices of these sites.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">4. Security</h2>
            <p>We take reasonable measures to protect our website, but since we do not collect data, there is no personal information to secure.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">5. Changes to This Policy</h2>
            <p>We may update this privacy policy from time to time. Any changes will be posted on this page.</p>
            
    
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-text-secondary border-t border-border mt-auto">
        <div className="max-w-md mx-auto">
          <p className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-3 text-sm">
            <span>Cursive Generator © {new Date().getFullYear()}</span>
            <span className="flex flex-row gap-3">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms</Link>
              <span>&amp;</span>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link>
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
}