import { Request, Response } from "express";
import AppDataSource from "../config/database";
import { User } from "../entities/user.entity";
import { deleteUser, updateUser, forgotPassword, updatePassword } from "../services/user.service";


const userRrepository = AppDataSource.getRepository(User);



// MEAN: DELETE USER
export const DeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteUser(id);
    if (result) {
      return res.status(200).json({ message: "User deleted successfully" });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

//MEAN: UPDATE USER
export const UpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const result = await updateUser(id, { name, email, password });
    if (result) {
      return res.status(200).json({ message: "User updated successfully", result });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};

// MEAN: FORGOT PASSWORD
export const ForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ message: "Email and new password are required" });
    }
    const result = await forgotPassword(email, newPassword);
    if (result) {
      return res.status(200).json({ message: "Password updated successfully" });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};


// MEAN: UPDATE PASSWORD
export const UpdatePassword = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: "Current and new passwords are required" });
    }
    const result = await updatePassword(id, currentPassword, newPassword);
    if (result) {
      return res.status(200).json({ message: "Password updated successfully", result });
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error",  error });
  }
};