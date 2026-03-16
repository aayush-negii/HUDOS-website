"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';

export default function AboutPage() {
    // We'll keep theme state local for now since toggle is hidden
    const [isNightMode, setIsNightMode] = React.useState(false);

    const stats = [
        { label: 'Active explorers', val: '12,000+', note: 'Across 3 cities' },
        { label: 'Partner businesses', val: '80+', note: 'Cafés, hotels, studios' },
        { label: 'Live challenges', val: '340+', note: 'Updated daily' },
        { label: 'Clubs partnered', val: '47+', note: 'Running, cycling, yoga' }
    ];

    const values = [
        { title: 'Movement should be rewarded', desc: "Every step, route and checkpoint deserves something back. We don't believe in points that go nowhere — every reward on HUDOS is redeemable at a real business, for real value." },
        { title: 'Cities deserve better discovery', desc: 'The best places in any city are the ones that don\'t advertise. We exist to surface hidden spots, support independent businesses, and push people one street further than they\'d normally go.' },
        { title: 'Community beats solo', desc: 'Running clubs, cycling crews, college groups — the best exploration happens together. We build every feature with communities in mind first, because when groups move through a city, it comes alive.' },
        { title: 'Local businesses win too', desc: 'Every challenge we place is a chance for a local café, studio or hotel to earn new customers. HUDOS is not just an app for explorers — it\'s a growth tool for the businesses that make cities worth visiting.' }
    ];

    return (
        <main className={`relative w-full overflow-hidden transition-colors duration-500 ${isNightMode ? 'night-mode' : ''}`}>
            <Navbar isNightMode={isNightMode} toggleNightMode={() => setIsNightMode(!isNightMode)} />

            {/* 1. Header Section */}
            <section className="pt-48 pb-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-6 block"
                    >
                        Our story
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 text-foreground"
                    >
                        We're making cities worth exploring.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-muted max-w-2xl mx-auto leading-relaxed"
                    >
                        HUDOS started with a simple observation — people travel to incredible places and still miss everything that makes them alive. We built the app that changes that.
                    </motion.p>
                </div>
            </section>

            {/* 2. Origin Story Section */}
            <section className="py-24 px-6 border-t border-border/50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-12 block">The origin</span>
                        <div className="space-y-8 text-lg text-muted leading-relaxed font-medium">
                            <p>
                                I was in Landour — a quiet hill town above Mussoorie that most people drive straight past on their way somewhere else. No crowds, no tourist buses, just old colonial cottages, pine forests, and a bakery that's been open since 1845. I found it by accident, by taking a wrong turn on a morning walk.
                            </p>
                            <p>
                                That wrong turn stuck with me. How many places like this exist in every city, every town, every neighbourhood across India — places that are extraordinary but invisible because there's no reason built into travel to go looking for them?
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <blockquote className="text-3xl md:text-4xl font-bold tracking-tight text-foreground border-l-4 border-indigo-core pl-8 py-4 mb-10">
                            "What if the city itself was the game? What if getting lost was the point — and every hidden corner came with a reward for finding it?"
                        </blockquote>
                        <div className="space-y-8 text-lg text-muted leading-relaxed">
                            <p>
                                That question became HUDOS. Back from Landour, we spent months talking to solo travelers, backpackers, running clubs, café owners and hotel managers before touching a keyboard. The answer was the same everywhere — people want to explore more, they just need a reason.
                            </p>
                            <p>
                                HUDOS is that reason. We're building the platform that turns every city into a game worth playing — one challenge, one hidden spot, one real reward at a time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Values Section */}
            <section className="py-24 px-6 bg-accent/30 border-y border-border/50">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-4 block">What we believe</span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Four principles that guide everything we build.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {values.map((v, i) => (
                            <div key={i} className="group">
                                <div className="text-sm font-bold text-indigo-core mb-4 uppercase tracking-widest transition-opacity group-hover:opacity-80">0{i + 1} — {v.title}</div>
                                <p className="text-muted leading-relaxed text-lg max-w-md">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. Traction Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-4 block">By the numbers</span>
                        <h2 className="text-4xl font-bold text-foreground">Early traction that tells the story.</h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((s, i) => (
                            <div key={i} className="p-10 border border-border rounded-3xl bg-surface shadow-sm hover:shadow-md transition-all">
                                <div className="text-4xl font-black text-indigo-core mb-2">{s.val}</div>
                                <div className="text-sm font-bold text-foreground mb-1 uppercase tracking-tight">{s.label}</div>
                                <div className="text-xs text-muted font-medium">{s.note}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Timeline */}
            <section className="py-24 px-6 border-t border-border/50">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-8 block">Timeline</span>
                    <h2 className="text-4xl font-bold text-foreground uppercase tracking-widest italic opacity-40">we have just started yet</h2>
                </div>
            </section>

            {/* 6. Backed By Section */}
            <section className="py-24 px-6 bg-accent/20 border-y border-border/50">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-8 block">Backed by</span>
                    <h2 className="text-3xl font-bold text-foreground mb-8">4 college friends who are avoiding corporate jobs</h2>
                </div>
            </section>

            {/* 7. Final CTA */}
            <section className="py-32 px-6 border-t border-border/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-10">Come explore with us.</h2>
                    <p className="text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
                        Whether you're a traveler, a club founder, a café owner or just someone who takes wrong turns — there's a place for you in the HUDOS story.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="px-10 py-5 bg-accent text-accent-foreground rounded-full font-bold text-sm shadow-sm hover:opacity-90 transition-all">Download HUDOS</button>
                        <button className="px-10 py-5 bg-transparent border border-border text-foreground rounded-full font-bold text-sm hover:bg-accent transition-all">Partner with us →</button>
                    </div>
                </div>
            </section>

            {/* Simple Footer Copy */}
            <footer className="py-12 px-6 text-center border-t border-border/30">
                <p className="text-xs text-muted uppercase tracking-widest font-bold">© 2026 HUDOS Protocol. All rights reserved.</p>
            </footer>
        </main>
    );
}
