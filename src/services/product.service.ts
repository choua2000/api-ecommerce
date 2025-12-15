import { Product } from "../entities/product.entity";
import { Category } from "../entities/category.entity";
import {AppDataSource} from "../config/database";

const productRepository = AppDataSource.getRepository(Product);
const categoryRepository = AppDataSource.getRepository(Category);

// MEAN: GET ALL PRODUCTS
export const getAllProducts = async (): Promise<Product[]> => {
  return await productRepository.find({ relations: ["category"] });
};
// MEAN: CREATE PRODUCT
export const createProduct = async (
  name: string,
  description: string,
  price: number,
  stock: number,
  categoryId: string
): Promise<Product> => {
  const category = await categoryRepository.findOne({
    where: { id: categoryId },
  });
  if (!category) {
    throw new Error("Category not found");
  }

  const newProduct = productRepository.create({
    name,
    description,
    price,
    stock,
    category,
  });
  return await productRepository.save(newProduct);
};

// MEAN: DELETE PRODUCT
export const deleteProduct = async (id: string): Promise<boolean> => {
  const result = await productRepository.delete(id);
  if (result.affected && result.affected > 0) {
    return true;
  }
  return false;
};
// MEAN: UPDATE PRODUCT
export const updateProduct = async (
  id: string,
  updateData: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: string;
  }
): Promise<Product | null> => {
  let categoryEntity = undefined;
  // If category is provided, fetch category by category ID
  if (updateData.categoryId) {
    categoryEntity = await categoryRepository.findOne({
      where: { id: updateData.categoryId },
    });

    if (!categoryEntity) {
      throw new Error("Category not found");
    }
  }

  // Find product
  const product = await productRepository.findOne({ where: { id } });
  if (!product) {
    return null;
  }

  // Assign updated values
  product.name = updateData.name ?? product.name;
  product.description = updateData.description ?? product.description;
  product.price = updateData.price ?? product.price;
  product.stock = updateData.stock ?? product.stock;

  if (categoryEntity) {
    product.category = categoryEntity;
  }

  return await productRepository.save(product);
};

// MEAN: GET PRODUCT BY ID
export const getProductById = async (id: string): Promise<Product | null> => {
  return await productRepository.findOne({
    where: { id },
    relations: ["category"],
  });
};

// MEAN: GET PRODUCTS BY CATEGORY ID
export const getProductsByCategoryId = async (
  categoryId: string
): Promise<Product[]> => {
  const category = await categoryRepository.findOne({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error("Category not found");
  }

  const products = await productRepository.find({
    where: { category: { id: category.id } }, // FIXED
    relations: ["category"],
  });

  return products;
};

// MEAN: SEARCH PRODUCTS BY NAME
export const searchProductsByName = async (
  name: string
): Promise<Product[]> => {
  return await productRepository.find({
    where: { name },
    relations: ["category"],
  });
};

// MEAN: GET PRODUCTS WITHIN PRICE RANGE
export const getProductsWithinPriceRange = async (
  minPrice: number,
  maxPrice: number
): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .where("product.price >= :minPrice AND product.price <= :maxPrice", {
      minPrice,
      maxPrice,
    })
    .getMany();
};

// MEAN: GET PRODUCTS WITH LOW STOCK
export const getProductsWithLowStock = async (
  threshold: number
): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .where("product.stock <= :threshold", { threshold })
    .getMany();
};

// MEAN: UPDATE PRODUCT STOCK
export const updateProductStock = async (
  id: string,
  newStock: number
): Promise<Product | null> => {
  const product = await productRepository.findOne({ where: { id } });
  if (!product) {
    return null;
  }
  product.stock = newStock;
  return await productRepository.save(product);
};

// MEAN: GET PRODUCTS BY PRICE SORT
export const getProductsByPriceSort = async (
  ascending: boolean = true
): Promise<Product[]> => {
  return await productRepository.find({
    order: { price: ascending ? "ASC" : "DESC" },
  });
};

// MEAN: GET PRODUCTS BY CATEGORY NAME
export const getProductsByCategoryName = async (
  categoryName: string
): Promise<Product[]> => {
  // Get the category entity first
  const category = await categoryRepository
    .createQueryBuilder("category")
    .where("LOWER(category.name) = LOWER(:name)", { name: categoryName })
    .getOne();
  if (!category) {
    throw new Error("Category not found");
  }
  // Query products using categoryId directly
  const products = await productRepository.find({
    where: { category: { id: category.id } }, // <-- Use categoryId directly
    relations: ["category"],
  });
  return products;
};

// MEAN: GET MOST POPULAR PRODUCTS
export const getMostPopularProducts = async (
  limit: number = 10
): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.reviews", "review")
    .addSelect("COUNT(review.id)", "reviewCount")
    .groupBy("product.id")
    .orderBy("reviewCount", "DESC")
    .limit(limit)
    .getMany();
};

// MEAN: GET PRODUCTS WITH REVIEWS ABOVE RATING
export const getProductsWithReviewsAboveRating = async (
  rating: number
): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.reviews", "review")
    .where("review.rating > :rating", { rating })
    .getMany();
};

// MEAN: GET PRODUCTS WITH NO REVIEWS
export const getProductsWithNoReviews = async (): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.reviews", "review")
    .where("review.id IS NULL")
    .getMany();
};

// MEAN: GET PRODUCTS BY MULTIPLE CATEGORY IDS
export const getProductsByMultipleCategoryIds = async (
  categoryIds: string[]
): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .leftJoinAndSelect("product.category", "category")
    .where("category.id IN (:...categoryIds)", { categoryIds })
    .getMany();
};
// MEAN: GET PRODUCTS ADDED AFTER DATE
export const getProductsAddedAfterDate = async (
  date: Date
): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .where("product.createdAt > :date", { date })
    .getMany();
};
// MEAN:
export const getProductsWithDiscountGreaterThan = async (
  discountPercentage: number
): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .where("product.discountPercentage > :discountPercentage", {
      discountPercentage,
    })
    .getMany();
};

// MEAN: GET ALL ORDERS
export const getMostOrderedProducts = async (
  limit: number = 10
): Promise<any[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .leftJoin("product.orderItems", "orderItem") // <-- join only, no select
    .addSelect("SUM(orderItem.quantity)", "totalOrdered")
    .groupBy("product.id")
    .orderBy("SUM(orderItem.quantity)", "DESC")
    .limit(limit)
    .getRawMany(); // <-- important: raw output contains totalOrdered
};

// MEAN: GET TOTAL STOCK VALUE
export const getTotalStockValue = async (): Promise<number> => {
  const products = await productRepository.find();
  return products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );
};

// MEAN: GET AVERAGE PRODUCT PRICE
export const getAverageProductPrice = async (): Promise<number> => {
  const products = await productRepository.find();
  if (products.length === 0) return 0;

  const totalPrice = products.reduce(
    (total, product) => total + Number(product.price),
    0
  );

  return totalPrice / products.length;
};

// MEAN: GET PRODUCTS BY STOCK SORT
export const getProductsByStockSort = async (
  ascending: boolean = true
): Promise<Product[]> => {
  return await productRepository.find({
    order: { stock: ascending ? "ASC" : "DESC" },
  });
};

// MEAN: GET PRODUCTS BY NAME CONTAINS
export const getProductsByNameContains = async (
  substring: string
): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .where("product.name LIKE :name", { name: `%${substring}%` })
    .getMany();
};

// MEAN: GET PRODUCTS BY DESCRIPTION CONTAINS
export const getProductsByDescriptionContains = async (
  substring: string
): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .where("product.description LIKE :description", {
      description: `%${substring}%`,
    })
    .getMany();
};

// MEAN: GET PRODUCTS WITH DISCOUNT
export const getProductsWithDiscount = async (): Promise<Product[]> => {
  return await productRepository
    .createQueryBuilder("product")
    .where("product.discountPercentage > 0")
    .getMany();
};
