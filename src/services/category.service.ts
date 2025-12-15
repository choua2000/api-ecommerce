
import { Category } from "../entities/category.entity";
import {AppDataSource} from "../config/database";

const categoryRepository = AppDataSource.getRepository(Category);

// MEAN: GET ALL CATEGORIES
export const getAllCategories = async (): Promise<Category[]> => {
    return await categoryRepository.find();
};

// MEAN: CREATE CATEGORY
export const createCategory = async (name: string, description: string): Promise<Category> => {
    const existingCategory = await categoryRepository.findOne({ where: { name } });
    if (existingCategory) {
        throw new Error("Category already exists");
    }
    const newCategory = categoryRepository.create({ name, description });
    return await categoryRepository.save(newCategory);
};

// MEAN: DELETE CATEGORY
export const deleteCategory = async (id: string): Promise<boolean> => {
    const result = await categoryRepository.delete(id);
    if (result.affected && result.affected > 0) {
        return true;
    }
    return false;
};

// MEAN: UPDATE CATEGORY
export const updateCategory = async (id: string, updateData: Partial<Category>): Promise<Category | null> => {
    const category = await categoryRepository.findOne({ where: { id } });
    if (!category) {
        return null;
    }
    // Object.assign(category, updateData);
    return await categoryRepository.save(category);
};

// MEAN: GET CATEGORY BY ID
export const getCategoryById = async (id: string): Promise<Category | null> => {
    return await categoryRepository.findOne({ where: { id } });
};