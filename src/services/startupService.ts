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

export interface StartupDocument {
  id: number;
  startup_id: number;
  title: string;
  doc_type: string;
  file_url: string;
  created_at: string;
}

export interface CategoriesResponse {
  success: boolean;
  categories: Array<{ id: number; name: string }>;
}

export const startupService = {
  getCategories: () =>
    api.get<CategoriesResponse>('/startup/categories', false),

  listStartups: (params?: { page?: number; limit?: number; search?: string; industry?: string; stage?: string; location?: string; min_investment?: number; sort_by?: string }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.search) query.set('search', params.search);
    if (params?.industry) query.set('industry', params.industry);
    if (params?.stage) query.set('stage', params.stage);
    if (params?.location) query.set('location', params.location);
    if (params?.min_investment) query.set('min_investment', String(params.min_investment));
    if (params?.sort_by) query.set('sort_by', params.sort_by);
    if (!params?.page && !params?.limit) { query.set('page', '1'); query.set('limit', '9'); }
    return api.get<ListStartupsResponse>(`/startup/?${query.toString()}`, false);
  },

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

  getBankInfo: (bank_info_id: number) =>
    api.get<{ success: boolean; id?: number; startupId?: number; accountNumber?: string; bankName?: string; receipientName?: string; mfo?: string }>(`/startup/bank-info/${bank_info_id}`),

  getBankInfoByStartup: (startup_id: number) =>
    api.get<{ success: boolean; id?: number; startupId?: number; accountNumber?: string; bankName?: string; receipientName?: string; mfo?: string }>(`/startup/${startup_id}/bank-info`),

  deleteBankInfo: (bank_info_id: number) =>
    api.del('/startup/bank-info/delete', { bank_info_id }),

  // ── Video ──────────────────────────────────────────────────────────────────
  getVideo: (startupId: number) =>
    api.get<{ success: boolean; youtube_url: string | null }>(`/startup/${startupId}/video`, false),

  setVideo: (startupId: number, youtube_url: string) =>
    api.post<{ success: boolean }>(`/startup/${startupId}/video`, { youtube_url }, true),

  deleteVideo: (startupId: number) =>
    api.del<{ success: boolean }>(`/startup/${startupId}/video`),

  // ── Documents ─────────────────────────────────────────────────────────────
  getDocuments: (startupId: number) =>
    api.get<{ success: boolean; documents: StartupDocument[] }>(`/startup/${startupId}/documents`, false),

  addDocument: (startupId: number, data: { title: string; doc_type: string; file_url: string }) =>
    api.post<{ success: boolean; id: number }>(`/startup/${startupId}/documents`, data, true),

  deleteDocument: (startupId: number, docId: number) =>
    api.del<{ success: boolean }>(`/startup/${startupId}/documents/${docId}`),

  createCampaignUpdate: (data: {
    compaign_id: number;
    title: string;
    body: string;
  }) => api.post<{ success: boolean; message?: string }>('/startup/compaign-update', data, true),

  updateCampaignUpdate: (data: Record<string, unknown>) =>
    api.put('/startup/compaign-update/update', data),

  deleteCampaignUpdate: (update_id: number) =>
    api.del('/startup/compaign-update/delete', { update_id }),
};
