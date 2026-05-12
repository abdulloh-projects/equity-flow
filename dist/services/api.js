"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const BASE_URL = '/api';
function getToken() {
    return localStorage.getItem('equity_flow_token');
}
function request(method_1, path_1, body_1) {
    return __awaiter(this, arguments, void 0, function* (method, path, body, requiresAuth = true) {
        const headers = { 'Content-Type': 'application/json' };
        if (requiresAuth) {
            const token = getToken();
            if (token)
                headers['Authorization'] = `Bearer ${token}`;
        }
        const res = yield fetch(`${BASE_URL}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });
        const data = yield res.json().catch(() => ({}));
        if (!res.ok)
            throw new Error(data.detail || data.message || `HTTP ${res.status}`);
        return data;
    });
}
exports.api = {
    get: (path, requiresAuth = true) => request('GET', path, undefined, requiresAuth),
    post: (path, body, requiresAuth = false) => request('POST', path, body, requiresAuth),
    put: (path, body) => request('PUT', path, body, true),
    del: (path, body) => request('DELETE', path, body, true),
};
