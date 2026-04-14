import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFilters } from '../hooks/useFilters';
import { useRecommend } from '../hooks/useRecommend';
import { RecommendRequest } from '../types';

export default function SearchPage() {
  const navigate = useNavigate();
  const { data: filters, isLoading: filtersLoading, error: filtersError } = useFilters();
  const { mutate: submitRecommend, isPending: isSubmitting } = useRecommend();

  // Form state
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedArchetype, setSelectedArchetype] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [containerized, setContainerized] = useState<string>('any');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('');
  const [selectedComplexity, setSelectedComplexity] = useState('');
  const [selectedApiSurface, setSelectedApiSurface] = useState('');

  const [prompt, setPrompt] = useState('');
  const [buyerContext, setBuyerContext] = useState('');
  const [showContext, setShowContext] = useState(false);

  const handleLanguageToggle = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang]
    );
  };

  const handleTechStackToggle = (tech: string) => {
    setSelectedTechStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const request: RecommendRequest = {
      filters: {
        category: selectedCategory || undefined,
        sdk_languages: selectedLanguages.length > 0 ? selectedLanguages : undefined,
        logic_archetype: selectedArchetype || undefined,
        integration_difficulty: selectedDifficulty || undefined,
        containerized: containerized === 'any' ? undefined : containerized === 'yes' ? true : false,
        technical_stack: selectedTechStack.length > 0 ? selectedTechStack : undefined,
        risk_level: selectedRiskLevel || undefined,
        state_complexity: selectedComplexity || undefined,
        api_surface_area: selectedApiSurface || undefined,
      },
      prompt: prompt || 'Recommend the best-matching open-source products',
      buyer_context: buyerContext || undefined,
      top_n: 5,
    };

    submitRecommend(request, {
      onSuccess: (data) => {
        navigate('/results', { state: { results: data, filters: request.filters } });
      },
      onError: (error: any) => {
        console.error('Recommendation error:', error);
        // If LLM failed (502), retry without prompt for filter-only results
        if (error?.response?.status === 502 && request.prompt) {
          const fallbackRequest = { ...request, prompt: undefined };
          submitRecommend(fallbackRequest, {
            onSuccess: (data) => {
              navigate('/results', { state: { results: data, filters: request.filters } });
            },
          });
        }
      },
    });
  };

  const handleReset = () => {
    setSelectedCategory('');
    setSelectedLanguages([]);
    setSelectedArchetype('');
    setSelectedDifficulty('');
    setContainerized('any');
    setSelectedTechStack([]);
    setSelectedRiskLevel('');
    setSelectedComplexity('');
    setSelectedApiSurface('');
    setPrompt('');
    setBuyerContext('');
  };

  if (filtersLoading) return <div className="p-6 text-center">Loading filters...</div>;
  if (filtersError) return <div className="p-6 text-center text-synchro-coral-red">Error loading filters</div>;
  if (!filters) return null;

  return (
    <div className="bg-synchro-light-base min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="col-span-1 sticky top-8 h-fit">
          <div className="bg-synchro-white rounded border border-synchro-light-gray p-6">
            <h3 className="font-semibold text-synchro-dark-base mb-6">Filters</h3>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-synchro-dark-gray mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-synchro-light-gray rounded text-sm focus:outline-none focus:border-synchro-sky-blue"
              >
                <option value="">All Categories</option>
                {filters.categories?.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* SDK Languages */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-synchro-dark-gray mb-3">SDK Languages</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {filters.sdk_languages?.slice(0, 8).map((lang) => (
                  <label key={lang} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLanguages.includes(lang)}
                      onChange={() => handleLanguageToggle(lang)}
                      className="w-4 h-4 rounded border-synchro-light-gray"
                    />
                    <span className="text-sm text-synchro-dark-gray">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Logic Archetype */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-synchro-dark-gray mb-2">Logic Archetype</label>
              <select
                value={selectedArchetype}
                onChange={(e) => setSelectedArchetype(e.target.value)}
                className="w-full px-3 py-2 border border-synchro-light-gray rounded text-sm focus:outline-none focus:border-synchro-sky-blue"
              >
                <option value="">All Archetypes</option>
                {filters.logic_archetypes?.map((arch) => (
                  <option key={arch} value={arch}>
                    {arch}
                  </option>
                ))}
              </select>
            </div>

            {/* Integration Difficulty */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-synchro-dark-gray mb-2">Integration Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-synchro-light-gray rounded text-sm focus:outline-none focus:border-synchro-sky-blue"
              >
                <option value="">Any Difficulty</option>
                {filters.integration_difficulties?.map((diff) => (
                  <option key={diff} value={diff}>
                    {diff}
                  </option>
                ))}
              </select>
            </div>

            {/* Containerized */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-synchro-dark-gray mb-2">Containerized</label>
              <select
                value={containerized}
                onChange={(e) => setContainerized(e.target.value)}
                className="w-full px-3 py-2 border border-synchro-light-gray rounded text-sm focus:outline-none focus:border-synchro-sky-blue"
              >
                <option value="any">Any</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            {/* Advanced Filters Toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full text-left text-xs font-semibold text-synchro-gold mb-3 hover:underline"
            >
              {showAdvanced ? '▼ Advanced Filters' : '▶ Advanced Filters'}
            </button>

            {showAdvanced && (
              <>
                {/* Technical Stack */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-synchro-dark-gray mb-2">Tech Stack</label>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {filters.technical_stack?.slice(0, 10).map((tech) => (
                      <label key={tech} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedTechStack.includes(tech)}
                          onChange={() => handleTechStackToggle(tech)}
                          className="w-4 h-4 rounded border-synchro-light-gray"
                        />
                        <span className="text-xs text-synchro-dark-gray">{tech}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Risk Level */}
                <div className="mb-6">
                  <label className="block text-xs font-semibold text-synchro-dark-gray mb-2">Risk Level</label>
                  <select
                    value={selectedRiskLevel}
                    onChange={(e) => setSelectedRiskLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-synchro-light-gray rounded text-sm focus:outline-none focus:border-synchro-sky-blue"
                  >
                    <option value="">Any Risk</option>
                    {filters.risk_levels?.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full px-3 py-2 border border-synchro-light-gray rounded text-sm text-synchro-dark-gray hover:bg-synchro-very-light-gray transition"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-span-3">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Prompt Section */}
            <div className="bg-synchro-white rounded border border-synchro-light-gray p-8">
              <h3 className="font-semibold text-synchro-dark-base mb-4">What are you looking for?</h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., I need an e-commerce backend with strong plugin support and Python SDK..."
                className="w-full px-4 py-3 border border-synchro-light-gray rounded focus:outline-none focus:border-synchro-sky-blue resize-none h-32 text-sm"
              />
            </div>

            {/* Buyer Context Section */}
            <div className="bg-synchro-white rounded border border-synchro-light-gray p-8">
              <button
                type="button"
                onClick={() => setShowContext(!showContext)}
                className="text-sm font-semibold text-synchro-gold hover:underline mb-4"
              >
                {showContext ? '▼' : '▶'} Buyer Context (Optional)
              </button>
              {showContext && (
                <textarea
                  value={buyerContext}
                  onChange={(e) => setBuyerContext(e.target.value)}
                  placeholder="e.g., We run Django + PostgreSQL + Redis..."
                  className="w-full px-4 py-3 border border-synchro-light-gray rounded focus:outline-none focus:border-synchro-sky-blue resize-none h-24 text-sm"
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-synchro-gold text-synchro-white py-4 rounded font-semibold hover:bg-opacity-90 transition disabled:opacity-70"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <svg className="animate-spin h-5 w-5 text-synchro-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  AI is analyzing products for you...
                </span>
              ) : (
                'Find Products'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
