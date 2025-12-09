import { Router } from "express";
import { GetAllCategories, CreateCategory, DeleteCategory, UpdateCategory, GetCategoryById } from "../controllers/category.controller";
const routerCategory = Router();
routerCategory.get("/categories/", GetAllCategories);
routerCategory.get("/categories/:id", GetCategoryById);
routerCategory.post("/categories/", CreateCategory);
routerCategory.delete("/categories/:id", DeleteCategory);
routerCategory.put("/categories/:id", UpdateCategory);
export default routerCategory;