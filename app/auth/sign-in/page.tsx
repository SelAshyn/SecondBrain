  "use client";

  import { useState } from "react";
  import { createClient } from "@/lib/supabase/client";
  import Link from "next/link";
  import { useRouter } from "next/navigation";

  export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    const handleSignIn = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
        router.refresh();
      }

      setLoading(false);
    };

    return (
      <div className="flex min-h-screen items-center justify-center  px-4">
        <div className="w-full scale-110 max-w-md space-y-6 rounded-lg shadow-2xl shadow-[0_0_50px_rgba(255,255,255,0.3)] p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="text-zinc-500">Welcome back to your Second Brain</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-zinc-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-zinc-300 px-3 py-2 focus:border-zinc-500 focus:outline-none"
                required
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-blue-900 py-2 text-white hover:bg-zinc-800 hover:cursor-pointer disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-lime-400 underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }
