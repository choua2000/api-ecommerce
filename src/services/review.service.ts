import { Review } from "../entities/review.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import {AppDataSource} from "../config/database"; 

const reviewRepository = AppDataSource.getRepository(Review);
const productRepository = AppDataSource.getRepository(Product);
const userRepository = AppDataSource.getRepository(User);

// MEAN: GET ALL REVIEWS
export const getAllReviews = async (): Promise<Review[]> => {
    return await reviewRepository.find({ relations: ["user", "product"] });
};

// MEAN: CREATE REVIEW
export const createReview = async ( userId: string, productId: string, rating: number, comment: string): Promise<Review> => {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    const product = await productRepository.findOne({ where: { id: productId } });
    if (!product) {
        throw new Error("Product not found");
    }
    const newReview = await reviewRepository.create({ user, product, rating, comment });
    return await reviewRepository.save(newReview);
};

// MEAN: DELETE REVIEW
export const deleteReview = async (id: string): Promise<boolean> => {
    const result = await reviewRepository.delete(id);
    if (result.affected && result.affected > 0) {
        return true;
    }
    return false;
};

// MEAN: UPDATE REVIEW
export const updateReview = async (id: string, updateData: Partial<Review>): Promise<Review | null> => {
    const review = await reviewRepository.findOne({ where: { id } });
    if (!review) {
        return null;
    }
    Object.assign(review, updateData);
    return await reviewRepository.save(review);
};

// MEAN: GET REVIEW BY ID
export const getReviewById = async (id: string): Promise<Review | null> => {
    return await reviewRepository.findOne({ where: { id }, relations: ["user", "product"] });
};

// MEAN: GET REVIEWS BY PRODUCT ID
export const getReviewsByProductId = async (productId: string): Promise<Review[]> => {
    return await reviewRepository.find({ where: { product: { id: productId } }, relations: ["user", "product"] });
};

// MEAN: GET REVIEWS BY USER ID
export const getReviewsByUserId = async (userId: string): Promise<Review[]> => {
    return await reviewRepository.find({ where: { user: { id: userId } }, relations: ["user", "product"] });
};

// MEAN: GET AVERAGE RATING FOR A PRODUCT
export const getAverageRatingForProduct = async (productId: string): Promise<number> => {
    const reviews = await reviewRepository.find({ where: { product: { id: productId } } });
    if (reviews.length === 0) {
        return 0;
    }
    const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
    return totalRating / reviews.length;
};

// MEAN: GET TOTAL REVIEWS COUNT FOR A PRODUCT
export const getTotalReviewsCountForProduct = async (productId: string): Promise<number> => {
    return await reviewRepository.count({ where: { product: { id: productId } } });
};

// MEAN: GET USER'S REVIEWS COUNT
export const getUsersReviewsCount = async (userId: string): Promise<number> => {
    return await reviewRepository.count({ where: { user: { id: userId } } });
};

// MEAN: GET TOP RATED PRODUCTS
export const getTopRatedProducts = async (limit: number): Promise<Product[]> => {
    const products = await productRepository.find({ relations: ["reviews"] });
    // Calculate average rating for each product
    const productsWithAvgRating = products.map(product => {
        const avgRating = product.reviews && product.reviews.length > 0
            ? product.reviews.reduce((total, review) => total + review.rating, 0) / product.reviews.length
            : 0;
        return { product, avgRating };
    });
    // Sort products by average rating in descending order
    productsWithAvgRating.sort((a, b) => b.avgRating - a.avgRating);
    return productsWithAvgRating.slice(0, limit).map(item => item.product);
};
// MEAN: GET MOST REVIEWED PRODUCTS
export const getMostReviewedProducts = async (limit: number): Promise<Product[]> => {
    const products = await productRepository.find({ relations: ["reviews"] });
    const productsWithReviewCount = products.map(product => {
        const reviewCount = product.reviews ? product.reviews.length : 0;
        return { product, reviewCount };
    });
    productsWithReviewCount.sort((a, b) => b.reviewCount - a.reviewCount);
    return productsWithReviewCount.slice(0, limit).map(item => item.product);
};

// MEAN: GET REVIEWS WITH RATING ABOVE A THRESHOLD
export const getReviewsWithRatingAbove = async (threshold: number): Promise<Review[]> => {
    return await reviewRepository.createQueryBuilder("review").where("review.rating > :threshold", { threshold }).getMany();
};

// MEAN: GET REVIEWS WITH COMMENTS
export const getReviewsWithComments = async (): Promise<Review[]> => {
    return await reviewRepository.createQueryBuilder("review").where("review.comment IS NOT NULL").getMany();
};

// MEAN: GET RECENT REVIEWS
export const getRecentReviews = async (days: number): Promise<Review[]> => {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);
    return await reviewRepository.createQueryBuilder("review").where("review.createdAt >= :dateThreshold", { dateThreshold }).getMany();
};

// MEAN: GET REVIEWS WITH RATING BELOW A THRESHOLD
export const getReviewsWithRatingBelow = async (threshold: number): Promise<Review[]> => {
    return await reviewRepository.createQueryBuilder("review").where("review.rating < :threshold", { threshold }).getMany();
}
