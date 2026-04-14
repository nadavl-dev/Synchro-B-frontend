import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecommendResponse, Recommendation } from '../types';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { results: RecommendResponse; filters: any } | null;

  if (!state?.results) {
    return (
      <div className="min-h-screen bg-synchro-light-base flex items-center justify-center">
        <div className="text-center">
          <p className="text-synchro-dark-gray mb-4">No results found. Please try your search again.</p>
          <button
            onClick={() => navigate('/search')}
            className="text-synchro-gold font-semibold hover:underline"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const { analysis_summary, recommendations, total_products, after_filters, mode } = state.results;

  return (
    <div className="bg-synchro-light-base min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header with Back Button + Funnel Stats */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/search')}
            className="text-synchro-sky-blue font-semibold hover:underline flex items-center gap-2"
          >
            ← Back to Search
          </button>
          <div className="flex items-center gap-3 text-sm text-synchro-medium-gray">
            <span>{total_products} products</span>
            <span>→</span>
            <span>{after_filters} matched filters</span>
            <span>→</span>
            <span className="font-semibold text-synchro-dark-base">{recommendations.length} recommended</span>
            {mode === 'llm_ranked' && (
              <span className="ml-2 px-2 py-0.5 bg-synchro-gold text-synchro-white text-xs rounded">AI Ranked</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {analysis_summary && (
          <div className="bg-synchro-white rounded border border-synchro-light-gray p-8 mb-8">
            <h2 className="font-semibold text-synchro-dark-base mb-4">Analysis Summary</h2>
            <p className="text-synchro-dark-gray leading-relaxed">{analysis_summary}</p>
          </div>
        )}

        {/* Recommendations */}
        <div className="space-y-6">
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((rec) => (
              <RecommendationCard key={rec.product_id} recommendation={rec} />
            ))
          ) : (
            <div className="bg-synchro-white rounded border border-synchro-light-gray p-8 text-center">
              <p className="text-synchro-medium-gray">No products match your criteria. Try broadening your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 80
      ? 'bg-synchro-sage-green'
      : score >= 50
        ? 'bg-synchro-gold'
        : 'bg-synchro-coral-red';

  return (
    <div className={`${color} text-synchro-white px-3 py-1 rounded text-sm font-bold`}>
      {Math.round(score)}%
    </div>
  );
}

function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  const [expanded, setExpanded] = useState(false);
  const roadmap = recommendation.integration_roadmap;

  return (
    <div className="bg-synchro-white rounded border border-synchro-light-gray p-6 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-8 h-8 bg-synchro-gold text-synchro-white rounded flex items-center justify-center font-bold text-sm flex-shrink-0">
            {recommendation.rank}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-synchro-dark-base mb-1">{recommendation.product_name}</h3>
          </div>
        </div>
        <ScoreBadge score={recommendation.match_score} />
      </div>

      {/* Match Score Bar */}
      <div className="mb-4">
        <div className="h-2 bg-synchro-very-light-gray rounded overflow-hidden">
          <div
            className="h-full bg-synchro-gold transition-all"
            style={{ width: `${recommendation.match_score}%` }}
          />
        </div>
      </div>

      {/* Match Reasoning */}
      <p className="text-sm text-synchro-dark-gray mb-4">{recommendation.match_reasoning}</p>

      {/* Recommended Capabilities */}
      {recommendation.recommended_capabilities && recommendation.recommended_capabilities.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-synchro-dark-gray mb-2">Recommended Capabilities</h4>
          <ul className="space-y-1">
            {recommendation.recommended_capabilities.map((cap, i) => (
              <li key={i} className="text-xs text-synchro-dark-gray flex items-start gap-2">
                <span className="text-synchro-sage-green font-bold flex-shrink-0">•</span>
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Integration Roadmap (Collapsible) */}
      {roadmap && (
        <div className="border-t border-synchro-light-gray pt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm font-semibold text-synchro-sky-blue hover:underline flex items-center gap-2"
          >
            {expanded ? '▼' : '▶'} Integration Roadmap
            {roadmap.estimated_hours > 0 && (
              <span className="text-xs font-normal text-synchro-medium-gray">
                (~{roadmap.estimated_hours} hours)
              </span>
            )}
          </button>

          {expanded && (
            <div className="mt-4 space-y-4">
              {/* Steps — API returns string[] */}
              {roadmap.steps && roadmap.steps.length > 0 && (
                <div>
                  <h5 className="font-semibold text-xs text-synchro-dark-gray mb-3">Steps</h5>
                  <ol className="space-y-2">
                    {roadmap.steps.map((step, i) => (
                      <li key={i} className="text-sm flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-synchro-light-gray rounded flex items-center justify-center text-xs font-semibold text-synchro-dark-gray">
                          {i + 1}
                        </div>
                        <p className="text-synchro-dark-gray flex-1">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {/* Required Technologies */}
              {roadmap.required_technologies && roadmap.required_technologies.length > 0 && (
                <div>
                  <h5 className="font-semibold text-xs text-synchro-dark-gray mb-2">Required Technologies</h5>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.required_technologies.map((tech) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-synchro-very-light-gray text-synchro-dark-gray rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Risks */}
              {roadmap.risks && roadmap.risks.length > 0 && (
                <div>
                  <h5 className="font-semibold text-xs text-synchro-dark-gray mb-2">Risks</h5>
                  <ul className="space-y-1">
                    {roadmap.risks.map((risk, i) => (
                      <li key={i} className="text-xs text-synchro-dark-gray flex items-start gap-2">
                        <span className="text-synchro-coral-red font-bold flex-shrink-0">⚠</span>
                        <span>{risk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Wins — API returns a single string */}
              {roadmap.quick_wins && (
                <div>
                  <h5 className="font-semibold text-xs text-synchro-dark-gray mb-2">Quick Wins</h5>
                  <p className="text-xs text-synchro-dark-gray flex items-start gap-2">
                    <span className="text-synchro-sage-green font-bold flex-shrink-0">✓</span>
                    <span>{roadmap.quick_wins}</span>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
