"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analysisService = void 0;
const api_1 = require("./api");
exports.analysisService = {
    analyzeStartup: (startupId) => api_1.api.post(`/startup/${startupId}/analyze`, {}, true),
};
