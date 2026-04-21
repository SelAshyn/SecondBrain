import Link from "next/link";
import { Brain, FileText, MessageSquare, Shield, ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
          <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Second Brain
          </span>
          
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/auth/sign-in"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Sign In
          </Link>
          <Link
            href="/auth/sign-up"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 pt-20 pb-32 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1 text-sm dark:border-zinc-800 dark:bg-zinc-900 mb-6">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-zinc-600 dark:text-zinc-400">
              AI-Powered Knowledge Base
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-6">
            Your thoughts, organized.
            <br />
            <span className="text-zinc-400">Amplified by AI.</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10">
            Upload notes, documents, and PDFs. Then chat with your own data using
            AI. Your personal knowledge base, private and secure.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/sign-up"
              className="group flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-base font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Start for Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/auth/sign-in"
              className="rounded-full border border-zinc-300 px-6 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Everything you need to capture and use your knowledge
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Store notes, upload documents, and have intelligent conversations with your data.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Notes & Documents"
              description="Create text notes and upload PDFs, Word docs, and more. All your knowledge in one place."
            />
            <FeatureCard
              icon={<MessageSquare className="h-5 w-5" />}
              title="AI Chat"
              description="Chat with your documents using AI. Ask questions, get summaries, and find insights."
            />
            <FeatureCard
              icon={<Brain className="h-5 w-5" />}
              title="Smart Retrieval"
              description="AI understands your content and finds exactly what you need, when you need it."
            />
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Private & Secure"
              description="Your data is yours alone. Private by default with secure authentication."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
            Ready to build your Second Brain?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
            Join today and start organizing your knowledge with AI.
          </p>
          <Link
            href="/auth/sign-up"
            className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-base font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-zinc-400" />
            <span className="text-sm text-zinc-500">Second Brain</span>
          </div>
          <p className="text-sm text-zinc-400">
            Your AI-Powered Personal Knowledge Base
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="h-10 w-10 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
