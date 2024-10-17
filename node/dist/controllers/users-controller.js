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
exports.emailValidator = exports.userNameValidator = exports.deleteUser = exports.updateUserById = exports.createNewUser = exports.fetchUserById = exports.fetchAllUsers = void 0;
const express_validator_1 = require("express-validator");
const http_error_1 = __importDefault(require("../models/http-error"));
const user_1 = __importDefault(require("../models/user"));
/**
 * Validator middleware for handling first name and last name input validation
 * Validation rules: firstName should not be empty and can contain max 100 alphabetic characters
 * Corresponding error message is generated if the validation rule fails
 */
const userNameValidator = [
    (0, express_validator_1.body)("firstName")
        .escape()
        .notEmpty()
        .withMessage("First Name is required")
        .isLength({ max: 100 })
        .withMessage("First name can not exceed 100 characters")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("Only characters are allowed in First Name"),
    (0, express_validator_1.body)("lastName")
        .escape()
        .notEmpty()
        .withMessage("LastName is required")
        .isLength({ max: 100 })
        .withMessage("Last name can not exceed 100 characters")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("Only characters are allowed in Last Name"),
];
exports.userNameValidator = userNameValidator;
/**
 * Validator middleware for handling email input validation
 * Validation rules: email should not be empty and should match with a valid email type
 * Corresponding error message is generated if the validation rule fails
 */
const emailValidator = [
    (0, express_validator_1.body)("email").escape().notEmpty().isEmail().withMessage("Email is not valid"),
];
exports.emailValidator = emailValidator;
/**
 * Fetches the list of all users from database
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 * a promise along with list of user records if the opertaion succeded
 * a promise with Error data along with 404 status code in case the opertaion is failed
 */
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
/**
 * Fetches the details of a user record based on the uid request params
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 * a promise with success response along with user data if the opertaion succeded
 * a promise with Error data along with 404 status code in case the opertaion is failed
 */
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
/**
 * Creates a user record by passing the input values from the request params
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 * a promise containing the newly created user record if the opertaion succeded
 * a promise with Error data along with 404 status code in case the opertaion is failed
 */
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
        res.status(201).json({ data: result, message: "User record created" });
    }
    catch (_a) {
        const error = new http_error_1.default("Error in creating User record", 500);
        next(error);
    }
});
exports.createNewUser = createNewUser;
/**
 * Updates a user record based on the uid passed in the request params
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 * a promise containing the updated user record if the opertaion succeded
 * a promise with Error data along with 404 status code in case the opertaion is failed
 */
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
            res.status(200).json({
                data: userRecord.toObject({ getters: true }),
                message: "User record updated",
            });
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
/**
 * Deletes a user record based on the uid passed in the request params
 *
 * @async
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns
 * a promise containing the deleted user record if the opertaion succeded
 * a promise with Error data along with 404 status code in case the opertaion is failed
 */
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.uid;
    let userRecord;
    try {
        userRecord = yield user_1.default.findById(userId);
        if (userRecord) {
            yield userRecord.deleteOne();
            res.status(200).json({
                data: userRecord.toObject({ getters: true }),
                message: "User record deleted",
            });
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
