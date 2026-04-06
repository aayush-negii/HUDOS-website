"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { MapPin, Flame, Trophy, Star, LogOut, ChevronRight, Zap } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/lib/useAuth';
import Link from 'next/link';

const CHALLENGES = [
    { id: 1, title: 'Old Delhi Food Trail', city: 'Delhi', points: 120, difficulty: 'Medium', emoji: '🍛' },
    { id: 2, title: 'Montmartre Sunrise Walk', city: 'Paris', points: 80, difficulty: 'Easy', emoji: '🗼' },
    { id: 3, title: 'Shibuya Night Circuit', city: 'Tokyo', points: 200, difficulty: 'Hard', emoji: '🌃' },
    { id: 4, title: 'Creek Heritage Loop', city: 'Dubai', points: 100, difficulty: 'Easy', emoji: '🏙️' },
];

const LEADERBOARD = [
    { rank: 1, name: 'Arjun M.', xp: 4820, badge: '👑' },
    { rank: 2, name: 'Léa D.', xp: 4210, badge: '🥈' },
    { rank: 3, name: 'Kenji T.', xp: 3990, badge: '🥉' },
    { rank: 4, name: 'Sara K.', xp: 3450, badge: '⭐' },
    { rank: 5, name: 'You', xp: 340, badge: '🔥', isUser: true },
];

const difficultyColor: Record<string, string> = {
    Easy: 'text-green-500 bg-green-500/10 border-green-500/20',
    Medium: 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20',
    Hard: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function DashboardPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.push('/login');
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-border border-t-indigo-core rounded-full animate-spin" />
            </div>
        );
    }

    const displayName = user.displayName || user.email?.split('@')[0] || 'Explorer';
    const initials = user.displayName
        ? user.displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : user.email?.[0].toUpperCase() ?? '?';

    return (
        <main className="min-h-screen bg-background text-foreground">

            {/* Top bar */}
            <header className="border-b border-border bg-surface/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-7 h-7 rounded-full border border-border flex items-center justify-center bg-background group-hover:border-indigo-core transition-colors">
                            <div className="w-1.5 h-1.5 rounded-full bg-foreground group-hover:bg-indigo-core transition-colors" />
                        </div>
                        <span className="text-base font-bold tracking-tight uppercase text-foreground">HODOS</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-indigo-core flex items-center justify-center text-white text-xs font-black">
                                {initials}
                            </div>
                            <span className="text-sm font-medium text-foreground hidden sm:block">{displayName}</span>
                        </div>
                        <button
                            onClick={() => signOut(auth).then(() => router.push('/'))}
                            className="flex items-center gap-1.5 text-xs font-medium text-muted hover:text-foreground transition-colors"
                        >
                            <LogOut size={14} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

                {/* Welcome */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-border mb-4">
                        <div className="w-1 h-1 rounded-full bg-indigo-core animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Mainline Active</span>
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">
                        Welcome back, {displayName.split(' ')[0]}.
                    </h1>
                    <p className="text-muted mt-2 text-sm">Here's your exploration summary.</p>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {[
                        { label: 'Total XP', value: '340', icon: <Zap size={16} />, color: 'text-indigo-core' },
                        { label: 'Travel Streak', value: '3 days', icon: <Flame size={16} />, color: 'text-orange-400' },
                        { label: 'Challenges Done', value: '4', icon: <Star size={16} />, color: 'text-yellow-400' },
                        { label: 'Global Rank', value: '#5', icon: <Trophy size={16} />, color: 'text-green-400' },
                    ].map((stat) => (
                        <div key={stat.label} className="p-5 rounded-2xl border border-border bg-surface">
                            <div className={`${stat.color} mb-3`}>{stat.icon}</div>
                            <div className="text-2xl font-black text-foreground">{stat.value}</div>
                            <div className="text-[11px] font-bold uppercase tracking-widest text-muted mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Main grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Active Challenges */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2 rounded-2xl border border-border bg-surface p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-base font-bold text-foreground">Active Challenges</h2>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-muted">4 available</span>
                        </div>

                        <div className="space-y-3">
                            {CHALLENGES.map((c) => (
                                <div key={c.id}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:bg-accent/50 transition-all cursor-pointer group">
                                    <div className="w-10 h-10 rounded-xl bg-accent border border-border flex items-center justify-center text-xl flex-shrink-0">
                                        {c.emoji}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-sm text-foreground truncate">{c.title}</div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <MapPin size={11} className="text-muted" />
                                            <span className="text-[11px] text-muted">{c.city}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${difficultyColor[c.difficulty]}`}>
                                            {c.difficulty}
                                        </span>
                                        <span className="text-xs font-black text-indigo-core">+{c.points} XP</span>
                                        <ChevronRight size={14} className="text-muted group-hover:text-foreground transition-colors" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Leaderboard */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
                        className="rounded-2xl border border-border bg-surface p-6"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-base font-bold text-foreground">Leaderboard</h2>
                            <Trophy size={15} className="text-muted" />
                        </div>

                        <div className="space-y-3">
                            {LEADERBOARD.map((entry) => (
                                <div key={entry.rank}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${entry.isUser ? 'bg-indigo-core/10 border border-indigo-core/20' : 'hover:bg-accent/50'}`}>
                                    <span className="text-lg w-6 text-center">{entry.badge}</span>
                                    <div className="flex-1 min-w-0">
                                        <div className={`text-sm font-semibold truncate ${entry.isUser ? 'text-indigo-core' : 'text-foreground'}`}>
                                            {entry.name}
                                        </div>
                                    </div>
                                    <span className="text-xs font-black text-muted">{entry.xp.toLocaleString()} XP</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 border-t border-border">
                            <p className="text-[11px] text-muted text-center font-medium">
                                Complete challenges to climb the ranks
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* XP Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                    className="rounded-2xl border border-border bg-surface p-6"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-base font-bold text-foreground">Mastery Protocol</h2>
                            <p className="text-[11px] text-muted mt-0.5 uppercase tracking-widest font-bold">Level 1 → Level 2</p>
                        </div>
                        <span className="text-sm font-black text-indigo-core">340 / 1000 XP</span>
                    </div>
                    <div className="h-2 w-full bg-accent rounded-full overflow-hidden border border-border">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '34%' }}
                            transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                            className="h-full bg-indigo-core rounded-full"
                        />
                    </div>
                    <p className="text-[11px] text-muted mt-3 font-medium">660 XP to reach Level 2 — keep exploring.</p>
                </motion.div>

            </div>
        </main>
    );
}
