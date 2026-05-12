import { api } from './api';

export interface InvestRequest {
  startup_id: number;
  campaign_id: number;
  amount: number;
  message?: string;
}

export interface InvestResponse {
  success: boolean;
  message: string;
  investment_id?: string;
}

export interface MyInvestmentsResponse {
  success: boolean;
  investments: Array<{
    id: string;
    user_id: string;
    startup_id: number;
    campaign_id: number;
    amount: number;
    message?: string;
    status: string;
    created_at: string;
  }>;
}

export interface InvestmentsByStartupResponse {
  success: boolean;
  investments: Array<{
    id: string;
    user_id: string;
    startup_id: number;
    campaign_id: number;
    amount: number;
    message?: string;
    status: string;
    created_at: string;
  }>;
}

export const investService = {
  invest: (data: InvestRequest) =>
    api.post<InvestResponse>('/invest/', data, true),

  myInvestments: () =>
    api.get<MyInvestmentsResponse>('/invest/my'),

  investmentsByStartup: (startupId: number) =>
    api.get<InvestmentsByStartupResponse>(`/invest/by-startup/${startupId}`),
};
