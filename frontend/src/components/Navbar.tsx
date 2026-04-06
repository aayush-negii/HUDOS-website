"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/lib/useAuth';

interface NavbarProps {
    isNightMode: boolean;
    toggleNightMode: () => void;
}

export default function Navbar({ isNightMode, toggleNightMode }: NavbarProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, loading } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const scrollToSection = (id: string) => {
        if (pathname !== '/') {
            router.push(`/#${id}`);
        } else {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

    const menuItems = [
        { name: 'Features', id: 'how-it-works' },
        { name: 'Mission', id: 'gamification' },
        { name: 'Cities', id: 'cities' },
        { name: 'Alliance', id: 'partnerships' },
        { name: 'About', id: '/about', external: true },
    ];

    // Avatar initials from display name or email
    const initials = user?.displayName
        ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : user?.email?.[0].toUpperCase() ?? '?';

    return (
        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
            <div className="glass-pill rounded-full px-8 py-4 flex items-center justify-between shadow-sm transition-all h-20">

                {/* Branding */}
                <Link href="/" className="flex items-center gap-3 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-surface group-hover:border-indigo-core transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-foreground group-hover:bg-indigo-core transition-colors"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground transition-colors uppercase">HODOS</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {menuItems.map((item) => (
                        item.external ? (
                            <Link key={item.name} href={item.id}
                                className={`text-[13px] font-medium transition-all ${pathname === item.id ? 'text-indigo-core' : 'text-muted hover:text-foreground'}`}>
                                {item.name}
                            </Link>
                        ) : (
                            <button key={item.name} onClick={() => scrollToSection(item.id)}
                                className="text-[13px] font-medium text-muted hover:text-foreground transition-all">
                                {item.name}
                            </button>
                        )
                    ))}
                </div>

                {/* Auth Actions */}
                <div className="hidden sm:flex items-center gap-3">
                    {!loading && (
                        user ? (
                            <>
                                <Link href="/dashboard"
                                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-surface hover:bg-accent transition-all text-xs font-bold text-foreground">
                                    <div className="w-5 h-5 rounded-full bg-indigo-core flex items-center justify-center text-white text-[10px] font-black">
                                        {initials}
                                    </div>
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout}
                                    className="px-5 py-2.5 rounded-full text-xs font-bold text-muted hover:text-foreground transition-all border border-transparent hover:border-border">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link href="/login"
                                className="px-8 py-2.5 bg-accent text-accent-foreground rounded-full font-bold text-xs hover:opacity-90 transition-all border border-border/50">
                                Login
                            </Link>
                        )
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-zinc-400 p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute top-20 left-6 right-6 md:hidden"
                    >
                        <div className="glass-pill rounded-3xl p-6 flex flex-col gap-6 mainline-border">
                            {menuItems.map((item) => (
                                item.external ? (
                                    <Link key={item.name} href={item.id} onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-lg font-medium px-2 ${pathname === item.id ? 'text-indigo-core' : 'text-foreground'}`}>
                                        {item.name}
                                    </Link>
                                ) : (
                                    <button key={item.name} onClick={() => scrollToSection(item.id)}
                                        className="text-lg font-medium text-foreground text-left px-2">
                                        {item.name}
                                    </button>
                                )
                            ))}
                            <div className="h-[1px] bg-border w-full"></div>
                            {user ? (
                                <>
                                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}
                                        className="w-full py-4 bg-indigo-core text-white font-bold rounded-2xl text-center block text-sm">
                                        Dashboard
                                    </Link>
                                    <button onClick={handleLogout}
                                        className="w-full py-3 text-muted font-bold text-sm">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full py-4 bg-foreground text-background font-bold rounded-2xl text-center block text-sm">
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
