"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const body_parser_1 = __importDefault(require("body-parser"));
const users_controller_1 = require("../controllers/users-controller");
const router = (0, express_1.Router)();
router.use(body_parser_1.default.json());
router.get("/", users_controller_1.fetchAllUsers);
router.get("/:uid", users_controller_1.fetchUserById);
router.post("/", 
//using validation to verify valid inputs (MIDDLEWARE)
[
    (0, express_validator_1.check)('firstName')
        .escape()
        .notEmpty()
        .withMessage('First Name is required')
        .isLength({ max: 100 })
        .withMessage('First name can not exceed 100 characters')
        .matches(/^[A-Za-z ]+$/)
        .withMessage('Only characters are allowed for First Name'),
    (0, express_validator_1.check)('lastName')
        .escape()
        .notEmpty()
        .withMessage('LastName is required')
        .isLength({ max: 100 })
        .withMessage('Last name can not exceed 100 characters')
        .matches(/^[A-Za-z ]+$/)
        .withMessage('Only characters are allowed for Last Name'),
    (0, express_validator_1.check)('email')
        .escape()
        .notEmpty()
        .isEmail()
        .withMessage('Email is not valid')
], users_controller_1.createNewUser);
router.patch("/:uid", 
// using validation to verify valid inputs (MIDDLEWARE)
[
    (0, express_validator_1.check)('firstName')
        .escape()
        .notEmpty()
        .withMessage('First Name is required')
        .isLength({ max: 100 })
        .withMessage('First name can not exceed 100 characters')
        .matches(/^[A-Za-z]+$/)
        .withMessage('Only characters are allowed for First Name'),
    (0, express_validator_1.check)('lastName')
        .escape()
        .notEmpty()
        .withMessage('LastName is required')
        .isLength({ max: 100 })
        .withMessage('Last name can not exceed 100 characters')
        .matches(/^[A-Za-z]+$/)
        .withMessage('Only characters are allowed for Last Name'),
], users_controller_1.updateUserById);
router.delete("/:uid", users_controller_1.deleteUser);
exports.default = router;
