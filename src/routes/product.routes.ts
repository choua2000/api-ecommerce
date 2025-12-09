import { Router } from "express";
import { 
    CreateProduct,
    GetAllProducts,
    GetProductsWithDiscount,
    GetProductsByDescriptionContains,
    GetProductsByNameContains,
    GetProductsByStockSort,
    GetAverageProductPrice,
    GetTotalStockValue,
    GetMostOrderedProducts,
    GetProductsWithDiscountGreaterThan,
    GetProductsAddedAfterDate,
    GetProductsByMultipleCategoryIds,
    GetProductsWithNoReviews,
    GetProductsWithReviewsAboveRating,
    GetMostPopularProducts,
    GetProductsByCategoryName,
    GetProductsByPriceSort,
    GetProductsWithLowStock,
    GetProductsWithinPriceRange,
    UpdateProductStock,
    SearchProductsByName,
    GetProductsByCategoryId,
    UpdateProduct,
    DeleteProduct,
    GetProductById,

 } from "../controllers/product.controller";

const routerProduct = Router();
routerProduct.post("/products/", CreateProduct);
routerProduct.get("/products/", GetAllProducts);
routerProduct.get("/products/with-discount/", GetProductsWithDiscount);
routerProduct.get("/products/description-contains/:substring", GetProductsByDescriptionContains);
routerProduct.get("/products/name-contains/:substring", GetProductsByNameContains);
routerProduct.get("/products/stock-sort/", GetProductsByStockSort);
routerProduct.get("/products/average-price/", GetAverageProductPrice);
routerProduct.get("/products/total-stock-value/", GetTotalStockValue);
routerProduct.get("/products/most-ordered/", GetMostOrderedProducts);
routerProduct.get("/products/discount-greater-than/:discount", GetProductsWithDiscountGreaterThan);
routerProduct.get("/products/added-after-date/:date", GetProductsAddedAfterDate);
routerProduct.get("/products/multiple-category-ids/:categoryIds", GetProductsByMultipleCategoryIds);
routerProduct.get("/products/no-reviews/", GetProductsWithNoReviews);
routerProduct.get("/products/reviews-above-rating/:rating", GetProductsWithReviewsAboveRating);
routerProduct.get("/products/most-popular/", GetMostPopularProducts);
routerProduct.get("/products/category-name/:categoryName", GetProductsByCategoryName);
routerProduct.get("/products/price-sort/:ascending", GetProductsByPriceSort);
routerProduct.get("/products/low-stock/:threshold", GetProductsWithLowStock);
routerProduct.get("/products/price-range/:minPrice/:maxPrice", GetProductsWithinPriceRange);
routerProduct.put("/products/:id/stock/", UpdateProductStock);
routerProduct.get("/products/search/:name", SearchProductsByName);
routerProduct.get("/products/category/:categoryId", GetProductsByCategoryId);
routerProduct.put("/products/:productId", UpdateProduct);
routerProduct.delete("/products/:id", DeleteProduct);
routerProduct.get("/products/:id/", GetProductById);

export default routerProduct;