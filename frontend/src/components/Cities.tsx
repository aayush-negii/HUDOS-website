import { motion } from 'framer-motion';

const cities = [
    { name: 'Delhi', challenge: 'Selfie at India Gate', points: 100 },
    { name: 'Paris', challenge: 'Visit Eiffel Tower Cafe', points: 150 },
    { name: 'Tokyo', challenge: 'Hidden Tokyo Alley Photo', points: 120 },
    { name: 'Dubai', challenge: 'Burj Khalifa Sky View', points: 200 },
    { name: 'New York', challenge: 'Times Square Midnight Walk', points: 180 },
];

export default function Cities() {
    return (
        <section id="cities" className="relative py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
                        Active <br />
                        <span className="text-foreground transition-colors">Protocols.</span>
                    </h2>
                    <p className="text-muted max-w-lg transition-colors">
                        Real-time missions deployed by the Mainline. Sync your location to initiate.
                    </p>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-12 no-scrollbar snap-x px-2">
                    {cities.map((city, index) => (
                        <motion.div
                            key={city.name}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="min-w-[320px] p-8 border border-border rounded-3xl bg-surface transition-all snap-center relative group"
                        >
                            <div className="absolute top-6 right-8 text-[11px] font-bold text-muted uppercase tracking-widest">
                                0{index + 1}
                            </div>

                            <div className="mb-8">
                                <span className="text-[10px] font-bold text-indigo-core bg-indigo-500/10 px-3 py-1 rounded-full tracking-widest uppercase mb-4 inline-block border border-indigo-500/20">Spatial Task</span>
                                <h3 className="text-3xl font-bold text-foreground tracking-tight transition-colors">{city.name}</h3>
                            </div>

                            <p className="text-muted font-medium mb-12 group-hover:text-foreground transition-colors leading-snug">
                                "{city.challenge}"
                            </p>

                            <div className="flex justify-between items-center pt-8 border-t border-border">
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-muted font-bold uppercase tracking-widest transition-colors">Protocol Pot</span>
                                    <span className="text-xl font-bold text-foreground">+{city.points} XP</span>
                                </div>
                                <button className="px-5 py-2.5 bg-accent text-accent-foreground text-xs font-bold rounded-full hover:opacity-90 transition-all">
                                    INITIALIZE
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
