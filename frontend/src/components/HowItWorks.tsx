import { motion } from 'framer-motion';

const steps = [
    { id: 1, title: 'Discover challenges', desc: 'Find unique tasks hidden in plain sight across the globe.' },
    { id: 2, title: 'Visit locations', desc: 'Travel to iconic hotspots and sync your journey data.' },
    { id: 3, title: 'Complete missions', desc: 'Verify your progress and earn digital travel assets.' },
    { id: 4, title: 'Earn rewards', desc: 'Level up your profile and claim exclusive benefits.' }
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-24 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 gradient-text">
                        The Core <br />
                        <span className="text-foreground transition-colors">Loop.</span>
                    </h2>
                    <p className="text-muted max-w-lg transition-colors">
                        Unified travel protocol for the modern explorer. Sync, scale, and reward your reality.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="p-8 mainline-border rounded-3xl bg-surface transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-sm font-bold text-foreground mb-8 group-hover:border-indigo-500 transition-colors">
                                0{step.id}
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-4 transition-colors">{step.title}</h3>
                            <p className="text-muted text-sm leading-relaxed transition-colors">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
