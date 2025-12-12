import { Request, Response } from "express";
import AppDataSource from "../config/database";
import { User } from "../entities/user.entity";
import { deleteUser,updateUser} from "../services/user.service";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../middleware/auth.middleware";

const userRrepository = AppDataSource.getRepository(User);

// MEAN: REGISTER USER
export const SignUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }
    const checkUser = await userRrepository.findOne({ where: { email } });
    if (checkUser) {
      return res.status(400).json({ message: "User already exist" });
    }   
    const hashedPassword = await hashPassword(password);

    const newUser = userRrepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await userRrepository.save(newUser);
    return res
      .status(201)
      .json({ message: "User register successfully", newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};


// MEAN: LOGIN USER
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await userRrepository.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Email Invalid credentials" });
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Password Invalid credentials" });
    }
    const token = generateToken(user.id, user.email, user.role);
    return res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};
