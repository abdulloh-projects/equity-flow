"use strict";
"use client";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = Calendar;
const React = __importStar(require("react"));
const lucide_react_0_487_0_1 = require("lucide-react@0.487.0");
const react_day_picker_8_10_1_1 = require("react-day-picker@8.10.1");
const utils_1 = require("./utils");
const button_1 = require("./button");
function Calendar(_a) {
    var { className, classNames, showOutsideDays = true } = _a, props = __rest(_a, ["className", "classNames", "showOutsideDays"]);
    return (<react_day_picker_8_10_1_1.DayPicker showOutsideDays={showOutsideDays} className={(0, utils_1.cn)("p-3", className)} classNames={Object.assign({ months: "flex flex-col sm:flex-row gap-2", month: "flex flex-col gap-4", caption: "flex justify-center pt-1 relative items-center w-full", caption_label: "text-sm font-medium", nav: "flex items-center gap-1", nav_button: (0, utils_1.cn)((0, button_1.buttonVariants)({ variant: "outline" }), "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"), nav_button_previous: "absolute left-1", nav_button_next: "absolute right-1", table: "w-full border-collapse space-x-1", head_row: "flex", head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]", row: "flex w-full mt-2", cell: (0, utils_1.cn)("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md", props.mode === "range"
                ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                : "[&:has([aria-selected])]:rounded-md"), day: (0, utils_1.cn)((0, button_1.buttonVariants)({ variant: "ghost" }), "size-8 p-0 font-normal aria-selected:opacity-100"), day_range_start: "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground", day_range_end: "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground", day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground", day_today: "bg-accent text-accent-foreground", day_outside: "day-outside text-muted-foreground aria-selected:text-muted-foreground", day_disabled: "text-muted-foreground opacity-50", day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground", day_hidden: "invisible" }, classNames)} components={{
            IconLeft: (_a) => {
                var { className } = _a, props = __rest(_a, ["className"]);
                return (<lucide_react_0_487_0_1.ChevronLeft className={(0, utils_1.cn)("size-4", className)} {...props}/>);
            },
            IconRight: (_a) => {
                var { className } = _a, props = __rest(_a, ["className"]);
                return (<lucide_react_0_487_0_1.ChevronRight className={(0, utils_1.cn)("size-4", className)} {...props}/>);
            },
        }} {...props}/>);
}
