import { motion } from 'framer-motion';

export default function AppPreview() {
    return (
        <section id="app-preview" className="relative py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">

                {/* Left: Phone Preview Mockup */}
                <div className="flex-1 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative w-72 h-[580px] mainline-border rounded-[3rem] p-3 bg-surface shadow-2xl transition-all"
                    >
                        <div className="w-full h-full border border-border rounded-[2.5rem] overflow-hidden relative bg-black p-6">
                            {/* Technical bits */}
                            <div className="flex justify-between items-center mb-8">
                                <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                                    <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
                                </div>
                                <div className="text-[8px] font-bold text-zinc-600 tracking-widest uppercase">HUDOS_PROTOCOL_V2</div>
                            </div>

                            <div className="space-y-4">
                                <div className="h-40 w-full rounded-2xl bg-zinc-900/50 border border-white/5 animate-pulse"></div>
                                <div className="h-24 w-full rounded-2xl bg-zinc-900/50 border border-white/5"></div>
                                <div className="h-24 w-full rounded-2xl bg-zinc-900/50 border border-white/5"></div>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 flex justify-between h-8 items-center border-t border-white/5 pt-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Content */}
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter gradient-text uppercase">
                        The world <br />
                        <span className="text-white">synced.</span>
                    </h2>
                    <p className="text-zinc-500 text-lg mb-12 max-w-xl leading-relaxed">
                        HUDOS turns the global map into your personal leaderboard. Sync your movement, scale your rank, and dominate the protocol from your pocket.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <button className="px-8 py-4 bg-foreground text-background rounded-full font-bold text-sm hover:opacity-90 transition-all">
                            App Store
                        </button>
                        <button className="px-8 py-4 border border-border text-foreground rounded-full font-bold text-sm hover:bg-foreground/5 transition-all">
                            Play Store
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
}
