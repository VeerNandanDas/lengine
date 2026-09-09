"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleSignUp(e: React.MouseEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    setError(null);
    setIsLoading(false);
    // Show a success-like message reusing the error state for simplicity
    setError("Check your email for a confirmation link.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa]">
      <div className="w-full max-w-[380px] px-6">
        {/* Branding */}
        <div className="text-center mb-10">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Lengine
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Cross-Border Trade Intelligence
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg border border-[#eaeaea] p-8">
          <h2 className="text-base font-medium text-slate-900 mb-6">
            Sign in to your account
          </h2>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 bg-white border-[#eaeaea] text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-10 bg-white border-[#eaeaea] text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-indigo-500 focus-visible:border-indigo-500"
              />
            </div>

            {error && (
              <p
                className={`text-sm ${
                  error.includes("Check your email")
                    ? "text-emerald-600"
                    : "text-red-500"
                }`}
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-10 bg-slate-900 hover:bg-slate-800 text-white font-medium transition-colors"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <div className="relative flex items-center justify-center my-3">
              <span className="w-full border-t border-[#eaeaea]" />
              <span className="bg-white px-2 text-[11px] uppercase tracking-wider text-slate-400">
                or
              </span>
              <span className="w-full border-t border-[#eaeaea]" />
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={() => {
                document.cookie = "demo_session=alex.chen@meridian-trade.com; path=/; max-age=86400";
                router.push("/dashboard");
                router.refresh();
              }}
              className="w-full h-10 border-[#eaeaea] hover:bg-slate-50 text-slate-700 font-normal text-sm"
            >
              Access Trade Terminal
            </Button>
          </form>

          <div className="mt-4 pt-4 border-t border-[#eaeaea]">
            <button
              onClick={handleSignUp}
              disabled={isLoading}
              className="w-full text-sm text-slate-500 hover:text-slate-900 transition-colors text-center"
            >
              Don&apos;t have an account?{" "}
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Create one
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center mt-8 text-xs text-slate-400">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
