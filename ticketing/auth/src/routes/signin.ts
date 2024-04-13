import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";
import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existinguser = await User.findOne({ email });

    if (!existinguser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwrodsMatch = await Password.compare(
      existinguser.password,
      password
    );

    if (!passwrodsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    //Generate json web token
    const userJwt = jwt.sign(
      { id: existinguser.id, email: existinguser.email },
      process.env.JWT_KEY!
    );

    //store in session object
    req.session = {
      jwt: userJwt,
    };
    res.status(200).send(existinguser);
  }
);

export { router as signinRouter };
