"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
function midValidateId(req, res, next) {
    try {
        const idParams = Object.values(enums_1.IdParams);
        const invalidParam = idParams.find((param) => {
            const idParam = req.params[param];
            return idParam && !idParam.match(/^[0-9a-fA-F]{24}$/);
        });
        if (invalidParam) {
            return res.status(400).json({ error: `Invalid ${invalidParam} format` });
        }
        return next();
    }
    catch (error) {
        return next(error);
    }
}
exports.default = midValidateId;
