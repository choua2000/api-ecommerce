import { Router } from "express";
import { 
    GetAllReviews,
    CreateReview,
    UpdateReview,
    DeleteReview,
    GetReviewById,
    GetReviewsByUserId,
    GetReviewsByProductId,
    GetUsersReviewsCount,
    GetTotalReviewsCountForProduct,
    GetAverageRatingForProduct,
    GetReviewsWithRatingBelow,
    GetReviewsWithRatingAbove,
    GetRecentReviews,
    GetReviewsWithComments,
    GetMostReviewedProducts,
    GetTopRatedProducts

 } from "../controllers/review.controller";


const routerReview = Router()


routerReview.get("/reviews/",GetAllReviews)
routerReview.post("/reviews/create/",CreateReview)
routerReview.put("/reviews/update/:id",UpdateReview)
routerReview.delete("/reviews/delete/:id",DeleteReview)
routerReview.get("/reviews/byId/:id",GetReviewById)
routerReview.get("/reviews/byUser/:userId",GetReviewsByUserId)
routerReview.get("/reviews/byProduct/:productId",GetReviewsByProductId)
routerReview.get("/reviews/users/:userId/count",GetUsersReviewsCount)
routerReview.get("/reviews/products/:productId/total-count",GetTotalReviewsCountForProduct)
routerReview.get("/reviews/products/:productId/average-rating",GetAverageRatingForProduct)
routerReview.get("/reviews/rating/below/:threshold",GetReviewsWithRatingBelow)
routerReview.get("/reviews/rating/above/:threshold",GetReviewsWithRatingAbove)
routerReview.get("/reviews/recent/:days",GetRecentReviews)
routerReview.get("/reviews/with-comments/",GetReviewsWithComments)
routerReview.get("/reviews/most-reviewed-products/",GetMostReviewedProducts)
routerReview.get("/reviews/top-rated-products/",GetTopRatedProducts)


export default routerReview

