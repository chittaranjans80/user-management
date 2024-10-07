"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const users_route_1 = __importDefault(require("./routes/users-route"));
dotenv_1.default.config();
const CLIENT_URI = process.env.CLIENT_URI || "";
const port = process.env.PORT || 5000;
const app = (0, express_1.default)();
var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};
app.use((0, cors_1.default)(options));
app.use(users_route_1.default);
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({
        message: error.message || 'An unknown error occured'
    });
});
// Connect to MongoDB
(0, mongoose_1.connect)(CLIENT_URI).then(() => {
    app.listen(port);
}).catch(() => {
    console.log('Error occured in connecting to Database');
});
