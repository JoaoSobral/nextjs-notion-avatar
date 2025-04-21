"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomConfig = void 0;
const const_1 = require("./const");
const getRandomConfig = () => {
    const randomConfig = Object.keys(const_1.AvatarConfigCount).reduce((prev, next) => Object.assign(prev, {
        [next]: Math.floor(Math.random() * (const_1.AvatarConfigCount[next] + 1)),
    }), {});
    randomConfig.detail = 0;
    randomConfig.accessory = 0;
    randomConfig.beard = 0;
    return randomConfig;
};
exports.getRandomConfig = getRandomConfig;
