import { Request, Response } from "express";
import { Product } from "../entities/product.entity";
import AppDataSource from "../config/database";
import { Category } from '../entities/category.entity';
const productRpository = AppDataSource.getRepository(Product);
import {
  createProduct, 
  getAllProducts,
  getProductById,
  updateProductStock,
  updateProduct,
  deleteProduct,
  getProductsByCategoryId,
  searchProductsByName,
  getProductsWithinPriceRange,
  getProductsWithLowStock,
  getProductsByPriceSort,
  getProductsByCategoryName,
  getMostPopularProducts,
  getProductsWithReviewsAboveRating,
  getProductsWithNoReviews,
  getProductsByMultipleCategoryIds,
  getProductsAddedAfterDate,
  getProductsWithDiscountGreaterThan,
  getMostOrderedProducts,
  getTotalStockValue,
  getAverageProductPrice,
  getProductsByStockSort,
  getProductsByNameContains,
  getProductsByDescriptionContains,
  getProductsWithDiscount

} from "../services/product.service";
// MEAN: CREATE PRODUCT
export const CreateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, categoryId } = req.body;
    if (!name || !description || !price || !stock || !categoryId) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const checkProduct = await productRpository.findOne({ where: { name } });
    if (checkProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }
    const newProduct = await createProduct(
      name,
      description,
      price,
      stock,
      categoryId
    );
    return res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET ALL PRODUCTS
export const GetAllProducts = async (req: Request, res: Response) => {
  try {
    const data = await getAllProducts();
    if(data.length === 0){
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({ message: "Get All Products Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCT BY ID
export const GetProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await getProductById(id);
    if (!data) {
        return res.status(404).json({ message: "Product Id not found" });
    }
    return res.status(200).json({ message: "Get Product By Id Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: UPDATE PRODUCT
export const UpdateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({ message: "Product ID Not Found" });
    }

    const { name, description, price, stock, categoryId } = req.body;

    if (
      name === undefined ||
      description === undefined ||
      price === undefined ||
      stock === undefined ||
      categoryId === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = await updateProduct(productId, {
      name,
      description,
      price,
      stock,
      categoryId,
    });
    return res.status(200).json({
      message: "Update Product Successfully",
      data,
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


// MEAN: DELETE PRODUCT
export const DeleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await deleteProduct(id);
    if (!data) {
      return res.status(404).json({ message: "Product Id not found" });
    }
    return res.status(200).json({ message: "Delete Product Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS BY CATEGORY ID
export const GetProductsByCategoryId = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.params;
    if(!categoryId){
      return res.status(400).json({ message: "Category ID Not Found" });
    }
    const data = await getProductsByCategoryId(categoryId);
    return res
      .status(200)
      .json({ message: "Get Products By Category Id Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: SEARCH PRODUCTS BY NAME
export const SearchProductsByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    if(name.length===0){
        return res.status(400).json({ message: "Product Name Not Found" });
    }
    const data = await searchProductsByName(name);
    return res
      .status(200)
      .json({ message: "Search Products By Name Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: UPDATE PRODUCT STOCK
export const UpdateProductStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if(id.length===0){
        return res.status(400).json({ message: "Product ID Not Found" });
    }
    const { stock } = req.body;
    if (!stock) {
      return res.status(400).json({ message: "Stock is required" });
    }
    const data = await updateProductStock(id, stock);
    return res
      .status(200)
      .json({ message: "Update Product Stock Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS WITHIN PRICE RANGE
export const GetProductsWithinPriceRange = async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice } = req.params;
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (isNaN(min) || isNaN(max)) {
      return res.status(400).json({ message: "Invalid price range" });
    }
    const data = await getProductsWithinPriceRange(min, max);
    return res
      .status(200)
      .json({ message: "Get Products Within Price Range Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS WITH LOW STOCK
export const GetProductsWithLowStock = async (req: Request, res: Response) => {
  try {
    const { threshold } = req.params;
    if (isNaN(parseInt(threshold))) {
        return res.status(400).json({ message: "Invalid stock threshold" });
    }
    const data = await getProductsWithLowStock(parseInt(threshold));
    return res
      .status(200)
      .json({ message: "Get Products With Low Stock Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS BY PRICE SORT
export const GetProductsByPriceSort = async (req: Request, res: Response) => {
  try {
    const { ascending } = req.params;
    if (ascending !== "true" && ascending !== "false") {
        return res.status(400).json({ message: "Invalid ascending value" });
    }
    const data = await getProductsByPriceSort(ascending === "true");
    return res
      .status(200)
      .json({ message: "Get Products By Price Sort Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS BY CATEGORY NAME
export const GetProductsByCategoryName = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.params;

    if (!categoryName) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const data = await getProductsByCategoryName(categoryName);

    if (data.length === 0) {
      return res.status(404).json({ message: "No products found for this category" });
    }

    return res.status(200).json({ message: "Get Products By Category Name Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


// MEAN: GET MOST POPULAR PRODUCTS
export const GetMostPopularProducts = async (req: Request, res: Response) => {
  try {
    const data = await getMostPopularProducts();
    if(data.length === 0){
      return res.status(404).json({ message: "No popular products found" });
    }
    return res
      .status(200)
      .json({ message: "Get Most Popular Products Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS WITH REVIEWS ABOVE RATING
export const GetProductsWithReviewsAboveRating = async (req: Request, res: Response) => {
  try {
    const { rating } = req.params;
    if (isNaN(parseFloat(rating))) {
        return res.status(400).json({ message: "Invalid rating value" });
    }
    const data = await getProductsWithReviewsAboveRating(parseFloat(rating));
    return res
      .status(200)
      .json({ message: "Get Products With Reviews Above Rating Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS WITH NO REVIEWS
export const GetProductsWithNoReviews = async (req: Request, res: Response) => {
  try {
    const data = await getProductsWithNoReviews();
    if(data.length === 0){
      return res.status(404).json({ message: "All products have reviews" });
    }
    return res
      .status(200)
      .json({ message: "Get Products With No Reviews Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS BY MULTIPLE CATEGORY IDS
export const GetProductsByMultipleCategoryIds = async (req: Request, res: Response) => {
  try {
    const { categoryIds } = req.params;
    const data = await getProductsByMultipleCategoryIds(categoryIds.split(","));
    return res
      .status(200)
      .json({ message: "Get Products By Multiple Category Ids Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS ADDED AFTER DATE
export const GetProductsAddedAfterDate = async (req: Request, res: Response) => {
  try {
    const { date } = req.params;
    const data = await getProductsAddedAfterDate(new Date(date));
    return res
      .status(200)
      .json({ message: "Get Products Added After Date Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS WITH DISCOUNT GREATER THAN
export const GetProductsWithDiscountGreaterThan = async (req: Request, res: Response) => {
  try {
    const { discount } = req.params;
    const data = await getProductsWithDiscountGreaterThan(parseFloat(discount));
    return res
      .status(200)
      .json({ message: "Get Products With Discount Greater Than Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET MOST ORDERED PRODUCTS
export const GetMostOrderedProducts = async (req: Request, res: Response) => {
  try {
    const data = await getMostOrderedProducts();
    return res
      .status(200)
      .json({ message: "Get Most Ordered Products Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET TOTAL STOCK VALUE
export const GetTotalStockValue = async (req: Request, res: Response) => {
  try {
    const data = await getTotalStockValue();
    return res
      .status(200)
      .json({ message: "Get Total Stock Value Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET AVERAGE PRODUCT PRICE
export const GetAverageProductPrice = async (req: Request, res: Response) => {
  try {
    const data = await getAverageProductPrice();
    
    return res
      .status(200)
      .json({ message: "Get Average Product Price Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS BY STOCK SORT
export const GetProductsByStockSort = async (req: Request, res: Response) => {
  try {
    const data = await getProductsByStockSort();
    if(data.length === 0){
      return res.status(404).json({message:"Not Found"})
    }
    return res
      .status(200)
      .json({ message: "Get Products By Stock Sort Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS BY NAME CONTAINS
export const GetProductsByNameContains = async (req: Request, res: Response) => {
  try {
    const { substring } = req.params;

    const data = await getProductsByNameContains(substring);
    return res
      .status(200)
      .json({ message: "Get Products By Name Contains Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};

// MEAN: GET PRODUCTS BY DESCRIPTION CONTAINS
export const GetProductsByDescriptionContains = async (req: Request, res: Response) => {
  try {
    const { substring  } = req.params;
    if (!substring  || substring .trim() === "") {
            return res.status(400).json({ message: "Substring is required" });
        }
    const data = await getProductsByDescriptionContains(substring );
    return res
      .status(200)
      .json({ message: "Get Products By Description Contains Successfully", data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};


// MEAN: GET PRODUCTS WITH DISCOUNT
export const GetProductsWithDiscount = async (req: Request, res: Response) => {
    try {
      const data = await getProductsWithDiscount();
      if(data.length === 0){
        return res.status(404).json({message:"Not Found"})
      }
      return res
        .status(200)
        .json({ message: "Get Products With Discount Successfully", data });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error", error });
    }
  };


