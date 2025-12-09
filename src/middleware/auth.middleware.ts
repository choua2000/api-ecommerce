import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET as string, (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// Hash password utility function
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password, salt);
}



// Compare password utility function
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcryptjs.compare(password, hashedPassword);
}

// Generate JWT token utility function
export const generateToken = (userId: string,email: string, role: string): string => {
    return jwt.sign({ id: userId, email, role }, JWT_SECRET as string, { expiresIn: '1d' });
}