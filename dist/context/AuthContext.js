"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
const react_1 = require("react");
const AuthContext = (0, react_1.createContext)(null);
function AuthProvider({ children }) {
    const [token, setToken] = (0, react_1.useState)(() => localStorage.getItem('equity_flow_token'));
    const [user, setUser] = (0, react_1.useState)(() => {
        const saved = localStorage.getItem('equity_flow_user');
        return saved ? JSON.parse(saved) : null;
    });
    const login = (newToken, newUser) => {
        localStorage.setItem('equity_flow_token', newToken);
        localStorage.setItem('equity_flow_user', JSON.stringify(newUser));
        setToken(newToken);
        setUser(newUser);
    };
    const logout = () => {
        localStorage.removeItem('equity_flow_token');
        localStorage.removeItem('equity_flow_user');
        setToken(null);
        setUser(null);
    };
    return (<AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>);
}
function useAuth() {
    const ctx = (0, react_1.useContext)(AuthContext);
    if (!ctx)
        throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
