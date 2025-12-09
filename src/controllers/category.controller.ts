import {Request, Response} from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../services/category.service";

// MEAN: GET ALL CATEGORIES
export const GetAllCategories = async (req: Request, res: Response) => {
    try {
        const categories = await getAllCategories();
        return res.status(200).json({ message: "Categories fetched successfully", categories });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};

// MEAN: CREATE CATEGORY
export const CreateCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({ message: "Name and description are required" });
        }
        const newCategory = await createCategory(name, description);
        return res.status(201).json({ message: "Category created successfully", newCategory });
    } catch (error) {
        if (error instanceof Error && error.message === "Category already exists") {
            return res.status(409).json({ message: error.message });
        }
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};
// MEAN: DELETE CATEGORY
export const DeleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteCategory(id);
        if (result) {
            return res.status(200).json({ message: "Category deleted successfully" });
        }
        return res.status(404).json({ message: "Category not found" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};

// MEAN: UPDATE CATEGORY
export const UpdateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const result = await updateCategory(id,{name, description});
        if (result) {
            return res.status(200).json({ message: "Category updated successfully", result });
        }
        return res.status(404).json({ message: "Category not found" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};

// MEAN: GET CATEGORY BY ID
export const GetCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await getCategoryById(id);
        if (category) {
            return res.status(200).json({ message: "Category fetched successfully", category });
        }
        return res.status(404).json({ message: "Category not found" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};