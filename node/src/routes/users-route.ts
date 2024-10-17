import { Router } from "express";
import bodyParser from "body-parser";

import {
  fetchAllUsers,
  fetchUserById,
  createNewUser,
  updateUserById,
  deleteUser,
  userNameValidator,
  emailValidator,
} from "../controllers/users-controller";

/**
 * Contains configuration for all routing paths and methods
 * Based on the supported configuration methods, the corresponding method is triggered from users controller
 */

const router = Router();

//using middleware to convert the request params
router.use(bodyParser.json());

router.get("/", fetchAllUsers);

router.get("/:uid", fetchUserById);

router.post(
  "/",
  //using validation to verify valid inputs (MIDDLEWARE)
  userNameValidator,
  emailValidator,
  createNewUser
);

router.patch(
  "/:uid",
  // using validation to verify valid inputs (MIDDLEWARE)
  userNameValidator,
  updateUserById
);

router.delete("/:uid", deleteUser);

export default router;
