import { Router } from "express";
import { DeleteUser, UpdateUser, ForgotPassword, UpdatePassword } from "../controllers/user.controller";
const routerUser = Router();

routerUser.delete("/delete/:id", DeleteUser);
routerUser.put("/update/:id", UpdateUser);
routerUser.post("/forgot-password", ForgotPassword);
routerUser.put("/update-password/:id", UpdatePassword);


export default routerUser;