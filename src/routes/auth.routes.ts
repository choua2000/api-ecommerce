import { Router } from "express";
import { SignUp,Login } from "../controllers/auth.controller";

const routerAuth = Router();
routerAuth.post("/signup", SignUp);
routerAuth.post("/login", Login);

export default routerAuth;