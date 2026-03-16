import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
    return (
        <section className="relative min-h-[95vh] flex items-center justify-center pt-32 pb-20 px-6">
            <div className="mainline-bg-glow"></div>

            <div className="max-w-7xl w-full flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
                {/* Left: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex-1"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent border border-border mb-10 transition-colors">
                        <div className="w-1 h-1 rounded-full bg-indigo-core animate-pulse"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted">Platform Update 2.4.0</span>
                    </div>

                    <h1 className="text-6xl md:text-[7rem] font-bold tracking-tighter leading-[0.9] mb-10 text-foreground transition-colors">
                        Modern travel <br />
                        <span className="text-muted/40 transition-colors">reimagined.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-muted font-medium max-w-xl mb-12 leading-relaxed transition-colors">
                        HUDOS is the open-source spatial travel ecosystem built for the next generation.
                        Sync your journey, scale your impact, and dominate the mainline.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-10 py-5 bg-accent text-accent-foreground rounded-full font-bold text-sm hover:opacity-90 transition-all shadow-sm">
                            Try HUDOS Free
                        </button>
                        <button className="px-10 py-5 bg-transparent border border-border text-foreground rounded-full font-bold text-sm hover:bg-accent transition-all">
                            View Documentation →
                        </button>
                    </div>
                </motion.div>

                {/* Vertical Dotted Divider (Desktop only) */}
                <div className="hidden lg:block w-px h-96 dotted-divider opacity-40"></div>

                {/* Right: Technical Features / List Style */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex-1 space-y-12"
                >
                    {[
                        { title: 'Tailored missions', desc: 'Custom travel objectives synced to your personal profile.', icon: '⊙' },
                        { title: 'Global sync protocol', desc: 'Real-time location data and competitive social leaderboards.', icon: 'link' },
                        { title: 'Spatial Rewards', desc: 'Earn digital assets for real-world movement and discovery.', icon: '◇' },
                        { title: 'Mainline Insights', desc: 'Advanced spatial analytics for your entire travel history.', icon: '📊' }
                    ].map((feature, i) => (
                        <div key={i} className="flex gap-8 items-start group">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface border border-border text-indigo-core text-xl group-hover:bg-accent transition-colors">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-foreground font-bold text-xl mb-2 transition-colors">{feature.title}</h3>
                                <p className="text-muted text-sm leading-relaxed max-w-sm transition-colors">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
