"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.investService = void 0;
const api_1 = require("./api");
exports.investService = {
    invest: (data) => api_1.api.post('/invest/', data, true),
    myInvestments: () => api_1.api.get('/invest/my'),
};
