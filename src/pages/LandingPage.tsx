import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="bg-synchro-light-base min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <h1 className="font-display text-5xl font-bold text-synchro-dark-base mb-6">
            Find the perfect open-source tool
          </h1>
          <p className="text-xl text-synchro-dark-gray mb-12 leading-relaxed">
            Describe what you need. We recommend the best-matching products with integration roadmaps.
          </p>
          <Link
            to="/search"
            className="inline-block bg-synchro-gold text-synchro-white px-8 py-3 rounded font-semibold hover:bg-opacity-90 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="bg-synchro-white px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-synchro-dark-base mb-12 text-center">
            Built for teams at every stage
          </h2>
          <div className="grid grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-6 border border-synchro-light-gray rounded hover:shadow-md transition">
              <div className="w-12 h-12 bg-synchro-gold rounded mb-4" />
              <h3 className="font-semibold text-synchro-dark-base mb-2">For Enterprise Buyers</h3>
              <p className="text-sm text-synchro-medium-gray">
                Evaluate tools against your technical requirements and integration constraints.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 border border-synchro-light-gray rounded hover:shadow-md transition">
              <div className="w-12 h-12 bg-synchro-sky-blue rounded mb-4" />
              <h3 className="font-semibold text-synchro-dark-base mb-2">For Dev Teams</h3>
              <p className="text-sm text-synchro-medium-gray">
                Find tools that fit your stack with clear integration roadmaps.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 border border-synchro-light-gray rounded hover:shadow-md transition">
              <div className="w-12 h-12 bg-synchro-sage-green rounded mb-4" />
              <h3 className="font-semibold text-synchro-dark-base mb-2">For Product Managers</h3>
              <p className="text-sm text-synchro-medium-gray">
                Benchmark options with comprehensive capability matching.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
