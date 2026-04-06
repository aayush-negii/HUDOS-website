"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ArrowLeft, Check } from 'lucide-react';
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSocialLoading, setIsSocialLoading] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState('');

    const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(f => ({ ...f, [k]: e.target.value }));

    const passwordStrength = (() => {
        const p = form.password;
        if (!p) return 0;
        let score = 0;
        if (p.length >= 8) score++;
        if (/[A-Z]/.test(p)) score++;
        if (/[0-9]/.test(p)) score++;
        if (/[^A-Za-z0-9]/.test(p)) score++;
        return score;
    })();

    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength];
    const strengthColor = ['', 'bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'][passwordStrength];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirm) return;
        setError('');
        setIsLoading(true);
        try {
            const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
            await updateProfile(cred.user, { displayName: form.name });
            router.push('/');
        } catch (err: unknown) {
            const code = (err as { code?: string }).code;
            if (code === 'auth/email-already-in-use') {
                setError('An account with this email already exists.');
            } else if (code === 'auth/weak-password') {
                setError('Password must be at least 6 characters.');
            } else if (code === 'auth/invalid-email') {
                setError('Please enter a valid email address.');
            } else if (code === 'auth/invalid-api-key' || code === 'auth/app-not-authorized') {
                setError('Firebase config error — check your .env.local values.');
            } else {
                setError(`Error: ${code ?? 'unknown'}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogle = async () => {
        setError('');
        setIsSocialLoading('google');
        try {
            await signInWithPopup(auth, googleProvider);
            router.push('/');
        } catch {
            setError('Google sign-in failed. Please try again.');
        } finally {
            setIsSocialLoading('');
        }
    };

    return (
        <main className="min-h-screen w-full flex bg-background overflow-hidden">

            {/* ── Left Panel: Branding ── */}
            <div className="hidden lg:flex flex-col justify-between w-[52%] relative bg-foreground text-background p-14 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-core opacity-20 blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-indigo-core opacity-10 blur-[100px]" />
                </div>
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }}
                />

                <motion.div
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                    className="relative z-10 flex items-center gap-3"
                >
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight uppercase text-white">HODOS</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
                    className="relative z-10"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
                        <div className="w-1 h-1 rounded-full bg-indigo-core animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">Join the mainline</span>
                    </div>
                    <h1 className="text-5xl xl:text-6xl font-bold tracking-tighter leading-[0.95] text-white mb-6">
                        Start exploring.<br />
                        <span className="text-white/30">Earn your place.</span>
                    </h1>
                    <p className="text-white/50 text-base leading-relaxed max-w-sm font-medium">
                        Create your account and unlock challenges, rewards, and a city that rewards every step.
                    </p>
                    <ul className="mt-10 space-y-4">
                        {['Access 340+ live city challenges', 'Earn real rewards at local businesses', 'Compete on global leaderboards'].map((perk) => (
                            <li key={perk} className="flex items-center gap-3 text-white/60 text-sm font-medium">
                                <span className="w-5 h-5 rounded-full bg-indigo-core/20 border border-indigo-core/40 flex items-center justify-center flex-shrink-0">
                                    <Check size={11} className="text-indigo-core" />
                                </span>
                                {perk}
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}
                    className="relative z-10 flex gap-10"
                >
                    {[{ val: '12K+', label: 'Explorers' }, { val: '340+', label: 'Challenges' }, { val: '80+', label: 'Partners' }].map((s) => (
                        <div key={s.label}>
                            <div className="text-2xl font-black text-white">{s.val}</div>
                            <div className="text-[11px] font-bold uppercase tracking-widest text-white/40 mt-0.5">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* ── Right Panel: Form ── */}
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative overflow-y-auto">
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                    className="absolute top-8 left-8"
                >
                    <Link href="/" className="flex items-center gap-2 text-muted hover:text-foreground transition-colors text-sm font-medium">
                        <ArrowLeft size={15} /> Back
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="w-full max-w-sm py-16"
                >
                    <div className="flex items-center gap-3 mb-10 lg:hidden">
                        <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center bg-surface">
                            <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                        </div>
                        <span className="text-lg font-bold tracking-tight uppercase text-foreground">HODOS</span>
                    </div>

                    <h2 className="text-3xl font-bold tracking-tight text-foreground mb-1">Create account.</h2>
                    <p className="text-muted text-sm mb-10">Join thousands of explorers on the mainline.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-muted" htmlFor="name">Full name</label>
                            <input
                                id="name" type="text" autoComplete="name" required
                                value={form.name} onChange={set('name')} placeholder="Alex Rivera"
                                className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground text-sm placeholder:text-muted/50 outline-none focus:border-indigo-core focus:ring-2 focus:ring-indigo-core/10 transition-all"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-muted" htmlFor="email">Email</label>
                            <input
                                id="email" type="email" autoComplete="email" required
                                value={form.email} onChange={set('email')} placeholder="you@example.com"
                                className="w-full px-4 py-3.5 rounded-xl bg-surface border border-border text-foreground text-sm placeholder:text-muted/50 outline-none focus:border-indigo-core focus:ring-2 focus:ring-indigo-core/10 transition-all"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-muted" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    id="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required
                                    value={form.password} onChange={set('password')} placeholder="Min. 8 characters"
                                    className="w-full px-4 py-3.5 pr-11 rounded-xl bg-surface border border-border text-foreground text-sm placeholder:text-muted/50 outline-none focus:border-indigo-core focus:ring-2 focus:ring-indigo-core/10 transition-all"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {form.password && (
                                <div className="space-y-1.5 pt-1">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map(i => (
                                            <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= passwordStrength ? strengthColor : 'bg-border'}`} />
                                        ))}
                                    </div>
                                    <p className="text-[11px] text-muted font-medium">{strengthLabel} password</p>
                                </div>
                            )}
                        </div>

                        {/* Confirm */}
                        <div className="space-y-1.5">
                            <label className="text-[11px] font-bold uppercase tracking-widest text-muted" htmlFor="confirm">Confirm password</label>
                            <div className="relative">
                                <input
                                    id="confirm" type={showConfirm ? 'text' : 'password'} autoComplete="new-password" required
                                    value={form.confirm} onChange={set('confirm')} placeholder="••••••••"
                                    className={`w-full px-4 py-3.5 pr-11 rounded-xl bg-surface border text-foreground text-sm placeholder:text-muted/50 outline-none focus:ring-2 transition-all ${form.confirm && form.confirm !== form.password
                                        ? 'border-red-400 focus:border-red-400 focus:ring-red-400/10'
                                        : 'border-border focus:border-indigo-core focus:ring-indigo-core/10'}`}
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                                    aria-label={showConfirm ? 'Hide password' : 'Show password'}
                                >
                                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {form.confirm && form.confirm !== form.password && (
                                <p className="text-[11px] text-red-400 font-medium">Passwords don't match</p>
                            )}
                        </div>

                        {/* Terms */}
                        <label className="flex items-start gap-3 cursor-pointer pt-1">
                            <button
                                type="button" role="checkbox" aria-checked={agreed} onClick={() => setAgreed(!agreed)}
                                className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border flex items-center justify-center transition-all ${agreed ? 'bg-foreground border-foreground' : 'bg-surface border-border'}`}
                            >
                                {agreed && <Check size={10} className="text-background" />}
                            </button>
                            <span className="text-xs text-muted leading-relaxed">
                                I agree to the{' '}
                                <Link href="#" className="text-indigo-core hover:opacity-70 transition-opacity">Terms of Service</Link>
                                {' '}and{' '}
                                <Link href="#" className="text-indigo-core hover:opacity-70 transition-opacity">Privacy Policy</Link>
                            </span>
                        </label>

                        {error && (
                            <p className="text-xs text-red-400 font-medium bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-3">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit" disabled={isLoading || !agreed || form.password !== form.confirm}
                            className="w-full py-3.5 mt-1 bg-foreground text-background rounded-xl font-bold text-sm hover:opacity-85 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <><span className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> Creating account...</>
                            ) : 'Create account'}
                        </button>
                    </form>

                    <div className="flex items-center gap-4 my-7">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-[11px] font-bold uppercase tracking-widest text-muted">or</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleGoogle} disabled={!!isSocialLoading}
                            className="w-full py-3.5 rounded-xl border border-border bg-surface text-foreground text-sm font-medium hover:bg-accent transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSocialLoading === 'google'
                                ? <span className="w-4 h-4 border-2 border-muted/30 border-t-muted rounded-full animate-spin" />
                                : <GoogleIcon />}
                            Continue with Google
                        </button>
                        <button
                            disabled
                            className="w-full py-3.5 rounded-xl border border-border bg-surface text-foreground text-sm font-medium opacity-40 cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            <AppleIcon /> Continue with Apple
                        </button>
                    </div>

                    <p className="text-center text-sm text-muted mt-8">
                        Already have an account?{' '}
                        <Link href="/login" className="text-indigo-core font-semibold hover:opacity-70 transition-opacity">Sign in</Link>
                    </p>
                </motion.div>
            </div>
        </main>
    );
}

function GoogleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

function AppleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
    );
}
