export interface Filter {
  categories: string[];
  sdk_languages: string[];
  logic_archetypes: string[];
  integration_difficulties: string[];
  technical_stack: string[];
  risk_levels: string[];
  state_complexities: string[];
  api_surface_areas: string[];
  containerized: boolean[];
}

export interface RecommendRequest {
  filters: {
    category?: string;
    sdk_languages?: string[];
    logic_archetype?: string;
    integration_difficulty?: string;
    containerized?: boolean;
    technical_stack?: string[];
    risk_level?: string;
    state_complexity?: string;
    api_surface_area?: string;
  };
  prompt?: string;
  buyer_context?: string;
  top_n: number;
}

// Matches actual API response from POST /recommend
export interface IntegrationRoadmap {
  steps: string[];
  estimated_hours: number;
  required_technologies: string[];
  risks: string[];
  quick_wins: string;
}

export interface Recommendation {
  rank: number;
  product_name: string;
  product_id: string;
  match_score: number;
  match_reasoning: string;
  recommended_capabilities: string[];
  integration_roadmap: IntegrationRoadmap;
}

export interface RecommendResponse {
  total_products: number;
  after_filters: number;
  filters_applied: Record<string, any>;
  mode: 'llm_ranked' | 'filter_scored';
  analysis_summary: string;
  recommendations: Recommendation[];
}

// Matches GET /products response
export interface ProductSummary {
  id: string;
  product_name: string;
  url: string;
  category: string;
  summary: string;
  logic_archetype: string;
  integration_difficulty: string;
  sdk_languages: string[];
  capabilities_count: number;
  use_cases_count: number;
}

// Matches GET /products/{id} response (index portion)
export interface ProductDetail {
  id: string;
  product_name: string;
  url: string;
  category: string;
  summary: string;
  target_audience: string;
  technical_stack: string[];
  sdk_languages: string[];
  capabilities: string[];
  use_cases: string[];
  auth_methods: string[];
  integrations: string[];
  logic_archetype: string;
  abstract_problem: string;
  data_flow_pattern: string;
  state_complexity: string;
  containerized: boolean;
  scaling_model: string;
  integration_difficulty: string;
  estimated_integration_hours: number;
  required_technologies: string[];
  complexity_factors: string[];
  risk_level: string;
  migration_path: string;
  api_surface_area: string;
  comparable_systems: string[];
}
