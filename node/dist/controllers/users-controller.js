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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserById = exports.createNewUser = exports.fetchUserById = exports.fetchAllUsers = void 0;
const express_validator_1 = require("express-validator");
const http_error_1 = __importDefault(require("../models/http-error"));
const user_1 = __importDefault(require("../models/user"));
const fetchAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_1.default.find();
        res.status(200).json({ data: result });
    }
    catch (_a) {
        const error = new http_error_1.default("Error in fetching User records", 404);
        next(error);
    }
});
exports.fetchAllUsers = fetchAllUsers;
const fetchUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.uid;
    let userRecord;
    try {
        userRecord = yield user_1.default.findById(userId);
        if (userRecord) {
            res.status(200).json({ data: userRecord.toObject({ getters: true }) });
        }
        else {
            const error = new http_error_1.default("No record found for this user Id", 404);
            next(error);
        }
    }
    catch (_a) {
        const error = new http_error_1.default("Error in fetching user record", 500);
        next(error);
    }
});
exports.fetchUserById = fetchUserById;
const createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, middleName, lastName, email } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    try {
        const newUser = new user_1.default({
            firstName,
            middleName,
            lastName,
            email,
        });
        const result = yield newUser.save();
        res.status(201).json({ data: result, message: 'User record created' });
    }
    catch (_a) {
        const error = new http_error_1.default("Error in creating User record", 500);
        next(error);
    }
});
exports.createNewUser = createNewUser;
const updateUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, middleName, lastName } = req.body;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const userId = req.params.uid;
    let userRecord;
    try {
        userRecord = yield user_1.default.findById(userId);
        if (userRecord) {
            userRecord.firstName = firstName;
            userRecord.middleName = middleName;
            userRecord.lastName = lastName;
            yield userRecord.save();
            res.status(200).json({ data: userRecord.toObject({ getters: true }), message: 'User record updated' });
        }
        else {
            const error = new http_error_1.default("No record found for this user Id", 404);
            next(error);
        }
    }
    catch (_a) {
        const error = new http_error_1.default("Error in fetching user record", 500);
        next(error);
    }
});
exports.updateUserById = updateUserById;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.uid;
    let userRecord;
    try {
        userRecord = yield user_1.default.findById(userId);
        if (userRecord) {
            yield userRecord.deleteOne();
            res.status(200).json({ data: userRecord.toObject({ getters: true }), message: 'User record deleted' });
        }
        else {
            const error = new http_error_1.default("No record found for this user Id", 404);
            next(error);
        }
    }
    catch (_a) {
        const error = new http_error_1.default("Error in fetching user record", 500);
        next(error);
    }
});
exports.deleteUser = deleteUser;
