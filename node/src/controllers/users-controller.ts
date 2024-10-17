import { Request, Response, NextFunction } from "express";
import { validationResult, body } from "express-validator";

import HttpError from "../models/http-error";
import User from "../models/user";

/**
 * Validator middleware for handling first name and last name input validation
 * Validation rules: firstName should not be empty and can contain max 100 alphabetic characters
 * Corresponding error message is generated if the validation rule fails
 */
const userNameValidator = [
  body("firstName")
    .escape()
    .notEmpty()
    .withMessage("First Name is required")
    .isLength({ max: 100 })
    .withMessage("First name can not exceed 100 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Only characters are allowed in First Name"),

  body("lastName")
    .escape()
    .notEmpty()
    .withMessage("LastName is required")
    .isLength({ max: 100 })
    .withMessage("Last name can not exceed 100 characters")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Only characters are allowed in Last Name"),
];

/**
 * Validator middleware for handling email input validation
 * Validation rules: email should not be empty and should match with a valid email type
 * Corresponding error message is generated if the validation rule fails
 */
const emailValidator = [
  body("email").escape().notEmpty().isEmail().withMessage("Email is not valid"),
];

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
const fetchAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await User.find();
    res.status(200).json({ data: result });
  } catch {
    const error = new HttpError("Error in fetching User records", 404);
    next(error);
  }
};

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
const fetchUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.uid;
  let userRecord;
  try {
    userRecord = await User.findById(userId);
    if (userRecord) {
      res.status(200).json({ data: userRecord.toObject({ getters: true }) });
    } else {
      const error = new HttpError("No record found for this user Id", 404);
      next(error);
    }
  } catch {
    const error = new HttpError("Error in fetching user record", 500);
    next(error);
  }
};

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
const createNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, middleName, lastName, email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email,
    });
    const result = await newUser.save();
    res.status(201).json({ data: result, message: "User record created" });
  } catch {
    const error = new HttpError("Error in creating User record", 500);
    next(error);
  }
};

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
const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, middleName, lastName } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const userId = req.params.uid;
  let userRecord;
  try {
    userRecord = await User.findById(userId);
    if (userRecord) {
      userRecord.firstName = firstName;
      userRecord.middleName = middleName;
      userRecord.lastName = lastName;
      await userRecord.save();
      res.status(200).json({
        data: userRecord.toObject({ getters: true }),
        message: "User record updated",
      });
    } else {
      const error = new HttpError("No record found for this user Id", 404);
      next(error);
    }
  } catch {
    const error = new HttpError("Error in fetching user record", 500);
    next(error);
  }
};

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
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;

  let userRecord;
  try {
    userRecord = await User.findById(userId);
    if (userRecord) {
      await userRecord.deleteOne();
      res.status(200).json({
        data: userRecord.toObject({ getters: true }),
        message: "User record deleted",
      });
    } else {
      const error = new HttpError("No record found for this user Id", 404);
      next(error);
    }
  } catch {
    const error = new HttpError("Error in fetching user record", 500);
    next(error);
  }
};

export {
  fetchAllUsers,
  fetchUserById,
  createNewUser,
  updateUserById,
  deleteUser,
  userNameValidator,
  emailValidator,
};
