"use strict";
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomConfig = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const const_1 = require("./const");
const accessory_1 = __importDefault(require("./accessory"));
const index_1 = __importDefault(require("./beard/index"));
const index_2 = __importDefault(require("./detail/index"));
const index_3 = __importDefault(require("./eye/index"));
const index_4 = __importDefault(require("./eyebrow/index"));
const index_5 = __importDefault(require("./face/index"));
const index_6 = __importDefault(require("./glass/index"));
const index_7 = __importDefault(require("./hair/index"));
const index_8 = __importDefault(require("./mouth/index"));
const index_9 = __importDefault(require("./nose/index"));
const NotionAvatar = (props) => {
    const { className, style, shape = 'circle', bgColor, config } = props;
    const { face, eye, eyebrow, glass, hair, mouth, nose, accessory, beard, detail, } = config;
    const borderRadius = const_1.ShapeBorderRadius[shape];
    return ((0, jsx_runtime_1.jsx)("div", { className: className, style: {
            backgroundColor: shape in const_1.ShapeBorderRadius ? bgColor : 'rgba(255, 0, 0, 0)',
            overflow: 'hidden',
            borderRadius,
            ...style,
        }, children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 1080 1080", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)(index_5.default, { type: face }), (0, jsx_runtime_1.jsx)(index_3.default, { type: eye }), (0, jsx_runtime_1.jsx)(index_4.default, { type: eyebrow }), (0, jsx_runtime_1.jsx)(index_6.default, { type: glass }), (0, jsx_runtime_1.jsx)(index_7.default, { type: hair }), (0, jsx_runtime_1.jsx)(index_8.default, { type: mouth }), (0, jsx_runtime_1.jsx)(index_9.default, { type: nose }), (0, jsx_runtime_1.jsx)(accessory_1.default, { type: accessory }), (0, jsx_runtime_1.jsx)(index_1.default, { type: beard }), (0, jsx_runtime_1.jsx)(index_2.default, { type: detail })] }) }));
};
exports.default = NotionAvatar;
var utils_1 = require("./utils");
Object.defineProperty(exports, "getRandomConfig", { enumerable: true, get: function () { return utils_1.getRandomConfig; } });
__exportStar(require("./types"), exports);
