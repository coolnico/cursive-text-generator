import Header from "@/components/Header";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-purple-600">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-700">
            <p>Welcome to Cursive Generator. By using our service, you agree to these terms and conditions.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">2. Use of Service</h2>
            <p>Our cursive generator is free to use for personal and commercial purposes. You may generate and use the cursive text as needed.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">3. Intellectual Property</h2>
            <p>The cursive text generated is based on Unicode characters and is freely available for use. Our website design and content are protected by copyright.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">4. Limitation of Liability</h2>
            <p>We are not liable for any damages arising from the use of our service. Use at your own risk.</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-3">5. Changes to Terms</h2>
            <p>We may update these terms from time to time. Continued use of the service constitutes acceptance of any changes.</p>
            
       
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