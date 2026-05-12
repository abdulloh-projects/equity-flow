"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("react-dom/client");
const App_tsx_1 = __importDefault(require("./App.tsx"));
require("./index.css");
const AuthContext_tsx_1 = require("./context/AuthContext.tsx");
(0, client_1.createRoot)(document.getElementById("root")).render(<AuthContext_tsx_1.AuthProvider>
    <App_tsx_1.default />
  </AuthContext_tsx_1.AuthProvider>);
