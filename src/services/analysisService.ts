import { api } from './api';

export interface AnalysisResponse {
  success: boolean;
  analysis: {
    summary: string;
    confidence_score: number;
    chance_of_winning: number;
    risk_level: string;
    growth_prediction: string;
    strengths: string[];
    risks: string[];
    recommendation: string;
  };
}

export const analysisService = {
  analyzeStartup: (startupId: number) =>
    api.post<AnalysisResponse>(`/startup/${startupId}/analyze`, {}, true),
};
