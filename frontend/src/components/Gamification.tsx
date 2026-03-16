import { motion } from 'framer-motion';

export default function Gamification() {
    return (
        <section id="gamification" className="relative py-24 px-6">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">

                {/* Left Content */}
                <div className="flex-1">
                    <h2 className="text-4xl md:text-5xl font-black mb-8 gradient-text">
                        Scale your <br />
                        <span className="text-white">impact.</span>
                    </h2>
                    <p className="text-zinc-500 text-lg mb-10 max-w-xl leading-relaxed">
                        Your journey is tracked by the Mainline. Maintain your streak, unlock travel protocols, and earn rewards based on real-world movement.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {['Global Ranks', '14-Day Streak', 'Mythic Rewards'].map((tag) => (
                            <div key={tag} className="px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-[11px] font-bold uppercase tracking-widest">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Technical Profile Card */}
                <div className="flex-1 w-full max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="mainline-border rounded-3xl p-8 bg-zinc-950/50 backdrop-blur-xl mainline-glow"
                    >
                        <div className="flex items-center gap-6 mb-10">
                            <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center text-3xl">
                                👾
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Explorer_Mainline</h3>
                                <p className="text-indigo-400 text-[11px] font-bold uppercase tracking-[0.2em]">Rank 01 / Master</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                                    <span>Mastery Protocol</span>
                                    <span className="text-white">42 / 50</span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 w-[84%]"></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: 'Streak', val: '14D', icon: '🔥' },
                                    { label: 'Syncs', val: '32C', icon: '📍' },
                                    { label: 'Rank', val: '88%', icon: '💎' }
                                ].map((stat, i) => (
                                    <div key={i} className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-center">
                                        <div className="text-xl mb-1">{stat.icon}</div>
                                        <div className="text-lg font-bold text-white">{stat.val}</div>
                                        <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{stat.label}</div>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4 bg-white text-black font-bold text-sm rounded-full hover:bg-zinc-200 transition-all">
                                View Full Protocol
                            </button>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
