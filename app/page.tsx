import CursiveGenerator from "@/components/CursiveGenerator";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-4 md:py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-6 py-6 w-full">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-3 -tracking-tight text-purple-600">Free Cursive Generator - Beautiful Handwriting Text Generator</h1>
          </div>

          <div className="w-full">
            <CursiveGenerator />
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
