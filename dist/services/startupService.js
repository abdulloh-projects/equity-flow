"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startupService = void 0;
const api_1 = require("./api");
exports.startupService = {
    listStartups: (params) => {
        const query = new URLSearchParams();
        if (params === null || params === void 0 ? void 0 : params.page)
            query.set('page', String(params.page));
        if (params === null || params === void 0 ? void 0 : params.limit)
            query.set('limit', String(params.limit));
        if (params === null || params === void 0 ? void 0 : params.search)
            query.set('search', params.search);
        if (params === null || params === void 0 ? void 0 : params.industry)
            query.set('industry', params.industry);
        if (params === null || params === void 0 ? void 0 : params.stage)
            query.set('stage', params.stage);
        if (params === null || params === void 0 ? void 0 : params.location)
            query.set('location', params.location);
        if (params === null || params === void 0 ? void 0 : params.min_investment)
            query.set('min_investment', String(params.min_investment));
        if (params === null || params === void 0 ? void 0 : params.sort_by)
            query.set('sort_by', params.sort_by);
        if (!(params === null || params === void 0 ? void 0 : params.page) && !(params === null || params === void 0 ? void 0 : params.limit)) {
            query.set('page', '1');
            query.set('limit', '9');
        }
        return api_1.api.get(`/startup/?${query.toString()}`, false);
    },
    getMyStartups: () => api_1.api.get('/startup/my'),
    getStartup: (id) => api_1.api.get(`/startup/${id}`),
    getCampaignsByStartup: (startupId) => api_1.api.get(`/startup/${startupId}/campaigns`),
    createStartup: (data) => api_1.api.post('/startup/create', data, true),
    updateStartup: (data) => api_1.api.put('/startup/update', data),
    deleteStartup: (startup_id) => api_1.api.del('/startup/delete', { startup_id }),
    createCampaign: (data) => api_1.api.post('/startup/compaign', data, true),
    updateCampaign: (data) => api_1.api.put('/startup/compaign/update', data),
    deleteCampaign: (campaign_id) => api_1.api.del('/startup/compaign/delete', { campaign_id }),
    createBankInfo: (data) => api_1.api.post('/startup/bank-info', data, true),
    updateBankInfo: (data) => api_1.api.put('/startup/bank-info/update', data),
    deleteBankInfo: (bank_info_id) => api_1.api.del('/startup/bank-info/delete', { bank_info_id }),
    createCampaignUpdate: (data) => api_1.api.post('/startup/compaign-update', data, true),
    updateCampaignUpdate: (data) => api_1.api.put('/startup/compaign-update/update', data),
    deleteCampaignUpdate: (update_id) => api_1.api.del('/startup/compaign-update/delete', { update_id }),
};
