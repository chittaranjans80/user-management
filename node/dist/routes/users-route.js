"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const users_controller_1 = require("../controllers/users-controller");
/**
 * Contains configuration for all routing paths and methods
 * Based on the supported configuration methods, the corresponding method is triggered from users controller
 */
const router = (0, express_1.Router)();
//using middleware to convert the request params
router.use(body_parser_1.default.json());
router.get("/", users_controller_1.fetchAllUsers);
router.get("/:uid", users_controller_1.fetchUserById);
router.post("/", 
//using validation to verify valid inputs (MIDDLEWARE)
users_controller_1.userNameValidator, users_controller_1.emailValidator, users_controller_1.createNewUser);
router.patch("/:uid", 
// using validation to verify valid inputs (MIDDLEWARE)
users_controller_1.userNameValidator, users_controller_1.updateUserById);
router.delete("/:uid", users_controller_1.deleteUser);
exports.default = router;
