export default function Partnerships() {
    const partners = ['Airlines', 'Hotel Chains', 'Digital Nomads', 'Travel Tech', 'Gov Tourism'];

    return (
        <section id="partnerships" className="relative py-24 px-6">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl font-black mb-16 gradient-text uppercase tracking-widest">
                    The Alliance.
                </h2>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 hover:opacity-100 transition-opacity duration-700">
                    {partners.map(partner => (
                        <div key={partner} className="text-xl md:text-2xl font-bold text-foreground tracking-tighter cursor-default transition-colors">
                            {partner}
                        </div>
                    ))}
                </div>

                <div className="mt-20">
                    <button className="px-8 py-3 bg-transparent border border-border rounded-full font-bold text-[11px] text-muted hover:text-foreground hover:border-foreground/20 transition-all uppercase tracking-widest">
                        Partner Inquiry →
                    </button>
                </div>
            </div>
        </section>
    );
}
