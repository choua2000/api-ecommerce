import { Request, Response } from "express";
import {
  getAllReviews,
  updateReview,
  deleteReview,
  createReview,
  getUsersReviewsCount,
  getTotalReviewsCountForProduct,
  getAverageRatingForProduct,
  getReviewsByUserId,
  getReviewsByProductId,
  getReviewById,
  getReviewsWithRatingBelow,
  getRecentReviews,
  getReviewsWithComments,
  getReviewsWithRatingAbove,
  getMostReviewedProducts,
  getTopRatedProducts,
} from "../services/review.service";


// MEAN:get all reviews
export const GetAllReviews = async (req:Request,res:Response) =>{
    try {
        const data = await getAllReviews()
        if(data.length===0){
            return res.status(404).json({message:"Not Found"})
        }
        return res.status(200).json({message:"Get Review All Successfully",data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// MEAN: create review
export const CreateReview = async (req:Request,res:Response) =>{
    try {
        const {userId,productId,rating,comment} = req.body
        if(!userId || !productId || !rating || !comment){
            return res.status(400).json({message:"All fields are required"})
        }
        const data = await createReview(userId,productId,rating,comment)
        return res.status(201).json({message:"Create Review Successfully",data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// MEAN: update review
export const UpdateReview = async (req:Request,res:Response) =>{
    try {
        const {id} = req.params
        const {rating,comment} = req.body
        const data = await updateReview(id,{rating,comment})
        if(!data){
            return res.status(404).json({message:"Not Found"})
        }
        return res.status(200).json({message:"Update Review Successfully",data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// MEAN: delete review
export const DeleteReview = async (req:Request,res:Response) =>{
    try {
        const {id} = req.params
        const data = await deleteReview(id)
        if(!data){
            return res.status(404).json({message:"Not Found"})
        }
        return res.status(200).json({message:"Delete Review Successfully",data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// MEAN: get review by id
export const GetReviewById = async (req:Request,res:Response) =>{
    try {
        const {id} = req.params
        const data = await getReviewById(id)
        if(!data){
            return res.status(404).json({message:"Not Found"})
        }
        return res.status(200).json({message:"Get Review By Id Successfully",data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// MEAN: get reviews by user id
export const GetReviewsByUserId = async (req:Request,res:Response) =>{
    try {
        const {userId} = req.params
        const data = await getReviewsByUserId(userId)
        if(data.length===0){
            return res.status(404).json({message:"Not Found"})
        }
        return res.status(200).json({message:"Get Review By User Id Successfully",data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// MEAN: get reviews by product id
export const GetReviewsByProductId = async (req:Request,res:Response) =>{
    try {
        const {productId} = req.params
        const data = await getReviewsByProductId(productId)
        if(data.length===0){
            return res.status(404).json({message:"Not Found"})
        }
        return res.status(200).json({message:"Get Review By Product Id Successfully",data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// MEAN: get users reviews count
export const GetUsersReviewsCount = async (req:Request,res:Response) =>{
    try {
        const {userId} = req.params
        const data = await getUsersReviewsCount(userId)
        return res.status(200).json({message:"Get Users Reviews Count Successfully",data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// MEAN: get total reviews count for product
export const GetTotalReviewsCountForProduct = async (req:Request,res:Response) =>{
    try {
        const {productId} = req.params
        const data = await getTotalReviewsCountForProduct(productId)
        return res.status(200).json({message:"Get Total Reviews Count For Product Successfully",data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// MEAN: get average rating for product
export const GetAverageRatingForProduct = async (req:Request,res:Response) =>{
    try {
        const {productId} = req.params
        const data = await getAverageRatingForProduct(productId)
        return res.status(200).json({message:"Get Average Rating For Product Successfully",data})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error",error})
    }
}

// MEAN: get reviews with rating below
export const GetReviewsWithRatingBelow = async (req: Request, res: Response) => {
    try {
        const { threshold } = req.params;

        // VALIDATION
        const numberThreshold = Number(threshold);
        if (isNaN(numberThreshold)) {
            return res.status(400).json({ message: "Invalid threshold value" });
        }

        const data = await getReviewsWithRatingBelow(numberThreshold);

        return res
            .status(200)
            .json({ message: "Get Reviews With Rating Below Successfully", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

// MEAN: get reviews with rating above
export const GetReviewsWithRatingAbove = async (req: Request, res: Response) => {
    try {
        const { threshold } = req.params;

        // VALIDATION
        const numberThreshold = Number(threshold);
        if (isNaN(numberThreshold)) {
            return res.status(400).json({ message: "Invalid threshold value" });
        }

        const data = await getReviewsWithRatingAbove(numberThreshold);

        return res
            .status(200)
            .json({ message: "Get Reviews With Rating Above Successfully", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

// MEAN: get recent reviews
export const GetRecentReviews = async (req: Request, res: Response) => {
    try {
        const { days } = req.params;

        // VALIDATION
        const numberDays = Number(days);
        if (isNaN(numberDays)) {
            return res.status(400).json({ message: "Invalid days value" });
        }

        const data = await getRecentReviews(numberDays);

        return res
            .status(200)
            .json({ message: "Get Recent Reviews Successfully", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

// MEAN: get reviews with comments
export const GetReviewsWithComments = async (req: Request, res: Response) => {
    try {
        const data = await getReviewsWithComments();

        return res
            .status(200)
            .json({ message: "Get Reviews With Comments Successfully", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

// MEAN: get most reviewed products
export const GetMostReviewedProducts = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit): 10; 
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ message: "Invalid limit value" });
        }

        const data = await getMostReviewedProducts(limit);

        return res
            .status(200)
            .json({ message: "Get Most Reviewed Products Successfully", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};

// MEAN: get top rated products
export const GetTopRatedProducts = async (req: Request, res: Response) => {
    try {
        const limit = req.query.limit ? Number(req.query.limit): 10; 
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ message: "Invalid limit value" });
        }

        const data = await getTopRatedProducts(limit);

        return res
            .status(200)
            .json({ message: "Get Top Rated Products Successfully", data });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
};
