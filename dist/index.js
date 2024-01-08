#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const getArgs_1 = require("./utils/getArgs");
const inputArgs = (0, getArgs_1.getArgs)(["--input", "-input", "--i", "-i"]);
const outputArgs = (0, getArgs_1.getArgs)(["--output", "-output", "--o", "-o"]);
const templateArg = (0, getArgs_1.getArg)(["--template", "-template", "--t", "-t"]);
const envPaths = inputArgs !== null && inputArgs !== void 0 ? inputArgs : [".env"];
const outputPaths = outputArgs !== null && outputArgs !== void 0 ? outputArgs : ["env.d.ts"];
const template = templateArg !== null && templateArg !== void 0 ? templateArg : `${process.argv[1].replace(".bin", "")}/template.d.ts`;
const templateString = fs_1.default.readFileSync(template, "utf-8");
for (const index in envPaths) {
    // .env file path
    const envPath = envPaths[index];
    // ['VAR1', 'VAR2', ...]
    const envKeys = Object.keys((_b = (_a = dotenv_1.default.config({ path: envPath })) === null || _a === void 0 ? void 0 : _a.parsed) !== null && _b !== void 0 ? _b : {});
    // generate env.d.ts string
    const dtsString = templateString.replace(/(\s*?)TEMPLATE_REPLACE/, envKeys.map((k) => `$1${k}: string`).join(""));
    // get output file path
    const outputPath = (_c = outputPaths[index]) !== null && _c !== void 0 ? _c : (() => {
        const output = envPath.startsWith(".") ? envPath.slice(1) : envPath;
        return `${output}.d.ts`;
    })();
    // write env.d.ts file
    fs_1.default.writeFileSync(outputPath, dtsString);
}
