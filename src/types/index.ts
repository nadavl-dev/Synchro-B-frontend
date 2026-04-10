export interface Filter {
  categories: string[];
  sdk_languages: string[];
  logic_archetypes: string[];
  integration_difficulties: string[];
  technical_stack: string[];
  risk_levels: string[];
  state_complexities: string[];
  api_surface_areas: string[];
}

export interface RecommendRequest {
  filters: {
    category?: string;
    sdk_languages?: string[];
    logic_archetype?: string;
    integration_difficulty?: string;
    containerized?: boolean | string;
    technical_stack?: string[];
    risk_level?: string;
    state_complexity?: string;
    api_surface_area?: string;
  };
  prompt: string;
  buyer_context?: string;
  top_n: number;
}

export interface IntegrationStep {
  step_number: number;
  description: string;
  estimated_hours: number;
  required_technologies: string[];
  risks: string[];
}

export interface IntegrationRoadmap {
  steps: IntegrationStep[];
  total_estimated_hours: number;
  quick_wins: string[];
}

export interface Recommendation {
  rank: number;
  product_name: string;
  product_id: string;
  category: string;
  match_score: number;
  match_reasoning: string;
  recommended_capabilities: string[];
  integration_roadmap: IntegrationRoadmap;
}

export interface RecommendResponse {
  analysis_summary: string;
  recommendations: Recommendation[];
  filters_applied: Record<string, any>;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  website?: string;
  github?: string;
  [key: string]: any;
}
