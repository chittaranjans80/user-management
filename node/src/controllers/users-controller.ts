import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import HttpError from "../models/http-error";
import User from "../models/user";

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
    res.status(201).json({ data: result, message: 'User record created' });
  } catch {
    const error = new HttpError("Error in creating User record", 500);
    next(error);
  }
};

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
      res.status(200).json({ data: userRecord.toObject({ getters: true }), message: 'User record updated'  });
    } else {
      const error = new HttpError("No record found for this user Id", 404);
      next(error);
    }
  } catch {
    const error = new HttpError("Error in fetching user record", 500);
    next(error);
  }
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.uid;

  let userRecord;
  try {
    userRecord = await User.findById(userId);
    if (userRecord) {
      await userRecord.deleteOne();
      res.status(200).json({ data: userRecord.toObject({ getters: true }), message: 'User record deleted'  });
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
};
