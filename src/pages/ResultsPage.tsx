import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RecommendResponse } from '../types';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { results: RecommendResponse; filters: any };

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

  const { results, analysis_summary, recommendations } = state.results;

  return (
    <div className="bg-synchro-light-base min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header with Back Button */}
        <div className="mb-8 flex items-center justify-between">
          <button
            onClick={() => navigate('/search')}
            className="text-synchro-sky-blue font-semibold hover:underline flex items-center gap-2"
          >
            ← Back to Search
          </button>
        </div>

        {/* Summary */}
        <div className="bg-synchro-white rounded border border-synchro-light-gray p-8 mb-8">
          <h2 className="font-semibold text-synchro-dark-base mb-4">Analysis Summary</h2>
          <p className="text-synchro-dark-gray leading-relaxed">{analysis_summary}</p>
        </div>

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

function RecommendationCard({ recommendation }: { recommendation: any }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-synchro-white rounded border border-synchro-light-gray p-6 hover:shadow-md transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-8 h-8 bg-synchro-gold text-synchro-white rounded flex items-center justify-center font-bold text-sm">
            {recommendation.rank}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-synchro-dark-base mb-1">{recommendation.product_name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-synchro-very-light-gray text-synchro-dark-gray rounded">
                {recommendation.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Match Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-synchro-dark-gray">Match Score</span>
          <span className="text-sm font-bold text-synchro-gold">{Math.round(recommendation.match_score)}%</span>
        </div>
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
      <div className="mb-4">
        <h4 className="text-xs font-semibold text-synchro-dark-gray mb-2">Recommended Capabilities</h4>
        <div className="flex flex-wrap gap-2">
          {recommendation.recommended_capabilities?.map((cap: string) => (
            <span key={cap} className="text-xs px-2 py-1 bg-synchro-sage-green text-synchro-white rounded">
              {cap}
            </span>
          ))}
        </div>
      </div>

      {/* Integration Roadmap (Collapsible) */}
      <div className="border-t border-synchro-light-gray pt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm font-semibold text-synchro-sky-blue hover:underline flex items-center gap-2"
        >
          {expanded ? '▼' : '▶'} Integration Roadmap ({recommendation.integration_roadmap?.total_estimated_hours || 0} hours)
        </button>

        {expanded && recommendation.integration_roadmap && (
          <div className="mt-4 space-y-4">
            {/* Steps */}
            <div>
              <h5 className="font-semibold text-xs text-synchro-dark-gray mb-3">Steps</h5>
              <ol className="space-y-3">
                {recommendation.integration_roadmap.steps?.map((step: any) => (
                  <li key={step.step_number} className="text-sm">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-synchro-light-gray rounded flex items-center justify-center text-xs font-semibold text-synchro-dark-gray">
                        {step.step_number}
                      </div>
                      <div className="flex-1">
                        <p className="text-synchro-dark-gray mb-1">{step.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 bg-synchro-very-light-gray text-synchro-dark-gray rounded">
                            ~{step.estimated_hours}h
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Required Technologies */}
            {recommendation.integration_roadmap.steps?.[0]?.required_technologies && (
              <div>
                <h5 className="font-semibold text-xs text-synchro-dark-gray mb-2">Required Technologies</h5>
                <div className="flex flex-wrap gap-2">
                  {recommendation.integration_roadmap.steps
                    ?.flatMap((step: any) => step.required_technologies || [])
                    .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i)
                    .map((tech: string) => (
                      <span key={tech} className="text-xs px-2 py-1 bg-synchro-very-light-gray text-synchro-dark-gray rounded">
                        {tech}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Quick Wins */}
            {recommendation.integration_roadmap.quick_wins && (
              <div>
                <h5 className="font-semibold text-xs text-synchro-dark-gray mb-2">Quick Wins</h5>
                <ul className="space-y-1">
                  {recommendation.integration_roadmap.quick_wins.map((win: string) => (
                    <li key={win} className="text-xs text-synchro-dark-gray flex items-start gap-2">
                      <span className="text-synchro-sage-green font-bold">✓</span> {win}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}