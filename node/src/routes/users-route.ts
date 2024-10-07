import { Router } from "express";
import { check } from "express-validator";
import bodyParser from "body-parser";

import {
  fetchAllUsers,
  fetchUserById,
  createNewUser,
  updateUserById,
  deleteUser,
} from "../controllers/users-controller";

const router = Router();

router.use(bodyParser.json());

router.get("/", fetchAllUsers);

router.get("/:uid", fetchUserById);

router.post(
  "/",
  //using validation to verify valid inputs (MIDDLEWARE)
  [

    check('firstName')
    .escape()
    .notEmpty()
    .withMessage('First Name is required')
    .isLength({max:100})       
    .withMessage('First name can not exceed 100 characters')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('Only characters are allowed for First Name')
    ,

    check('lastName')
    .escape()
    .notEmpty()
    .withMessage('LastName is required')
    .isLength({max:100})       
    .withMessage('Last name can not exceed 100 characters')
    .matches(/^[A-Za-z ]+$/)
    .withMessage('Only characters are allowed for Last Name')
    ,
 
    check('email')
    .escape()
    .notEmpty()
    .isEmail()
    .withMessage('Email is not valid')
  ],
  createNewUser
);

router.patch(
  "/:uid",
  // using validation to verify valid inputs (MIDDLEWARE)
  [
    check('firstName')
    .escape()
    .notEmpty()
    .withMessage('First Name is required')
    .isLength({max:100})       
    .withMessage('First name can not exceed 100 characters')
    .matches(/^[A-Za-z]+$/)
    .withMessage('Only characters are allowed for First Name'),

    check('lastName')
    .escape()
    .notEmpty()
    .withMessage('LastName is required')
    .isLength({max:100})       
    .withMessage('Last name can not exceed 100 characters')
    .matches(/^[A-Za-z]+$/)
    .withMessage('Only characters are allowed for Last Name'),
  ],
  updateUserById
);

router.delete("/:uid", deleteUser);

export default router;
