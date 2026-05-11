import { api } from './api';

export interface StartupSummary {
  id: number;
  name: string;
  location: string;
  description: string;
  websiteUrl: string;
  categoryId: number;
  stageId: number;
  foundedAt: string;
  createdAt: string;
}

export interface ListStartupsResponse {
  success: boolean;
  startups: StartupSummary[];
  total: number;
  page: number;
  limit: number;
}

export interface CampaignSummary {
  id: number;
  startupId: number;
  targetAmount: number;
  raisedAmount: number;
  minInvestment: number;
  revenue: number;
  revenueShare: number;
  burnRate: number;
  runway: number;
  activeCustomers: number;
  valuation: number;
  grossMargin: number;
  status: string;
  deadline: string;
  createdAt: string;
}

export const startupService = {
  listStartups: (page = 1, limit = 9) =>
    api.get<ListStartupsResponse>(`/startup/?page=${page}&limit=${limit}`, false),

  getMyStartups: () =>
    api.get<{ success: boolean; startups: StartupSummary[] }>('/startup/my'),

  getStartup: (id: number) =>
    api.get<Record<string, unknown>>(`/startup/${id}`),

  getCampaignsByStartup: (startupId: number) =>
    api.get<{ success: boolean; campaigns: CampaignSummary[] }>(
      `/startup/${startupId}/campaigns`
    ),

  createStartup: (data: {
    name: string;
    description: string;
    location: string;
    website_url: string;
    team_size: number;
    category_id: number;
    stage_id: number;
    founded_at: string;
  }) =>
    api.post<{ success: boolean; message: string; data: Record<string, string> }>(
      '/startup/create',
      data,
      true
    ),

  updateStartup: (data: {
    startup_id: number;
    name?: string;
    location?: string;
    description?: string;
    website_url?: string;
    category_id?: number;
    stage_id?: number;
    founded_at?: string;
  }) => api.put('/startup/update', data),

  deleteStartup: (startup_id: number) =>
    api.del('/startup/delete', { startup_id }),

  createCampaign: (data: {
    startup_id: number;
    target_amount: number;
    min_investment: number;
    revenue: number;
    revenue_share: number;
    burn_rate: number;
    runway: number;
    active_customers?: number;
    valuation: number;
    gross_margin: number;
    status: string;
    deadline: string;
  }) => api.post('/startup/compaign', data, true),

  updateCampaign: (data: Record<string, unknown>) =>
    api.put('/startup/compaign/update', data),

  deleteCampaign: (campaign_id: number) =>
    api.del('/startup/compaign/delete', { campaign_id }),

  createBankInfo: (data: {
    startup_id: number;
    mfo: string;
    account_number: string;
    receipant_name: string;
  }) => api.post('/startup/bank-info', data, true),

  updateBankInfo: (data: Record<string, unknown>) =>
    api.put('/startup/bank-info/update', data),

  deleteBankInfo: (bank_info_id: number) =>
    api.del('/startup/bank-info/delete', { bank_info_id }),

  createCampaignUpdate: (data: {
    compaign_id: number;
    title: string;
    body: string;
  }) => api.post('/startup/compaign-update', data, true),

  updateCampaignUpdate: (data: Record<string, unknown>) =>
    api.put('/startup/compaign-update/update', data),

  deleteCampaignUpdate: (update_id: number) =>
    api.del('/startup/compaign-update/delete', { update_id }),
};
