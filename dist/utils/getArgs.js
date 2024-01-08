"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArgs = exports.getArg = void 0;
function getArg(option) {
    const index = process.argv.findIndex((arg) => option.includes(arg));
    if (index !== -1) {
        const nextArg = process.argv[index + 1];
        if (nextArg && !nextArg.startsWith("-")) {
            return nextArg;
        }
    }
}
exports.getArg = getArg;
function getArgs(option) {
    const result = process.argv
        .map((arg, index) => {
        if (option.includes(arg)) {
            const nextArg = process.argv[index + 1];
            if (nextArg && !nextArg.startsWith("-")) {
                return nextArg;
            }
        }
    })
        .filter(Boolean);
    if (result.length) {
        return result;
    }
}
exports.getArgs = getArgs;
