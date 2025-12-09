import { Request, Response } from "express";
import { getAllAddresses,getAddressById,createAddress,updateAddress,deleteAddress } from "../services/address.service";
// MEAN: GET ALL ADDRESSES
export const GetAllAddresses = async (req: Request, res: Response) => {
    try {
        const addresses = await getAllAddresses();
        return res.status(200).json({ message: "Addresses fetched successfully", addresses });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};
// MEAN: CREATE ADDRESS
export const CreateAddress = async (req: Request, res: Response) => {
    try {
        const { userId, addressLine, city, state, country } = req.body;
        const newAddress = await createAddress(userId, addressLine, city, state, country);
        return res.status(201).json({ message: "Address created successfully", newAddress });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};
// MEAN: DELETE ADDRESS
export const DeleteAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await deleteAddress(id);
        if (result) {
            return res.status(200).json({ message: "Address deleted successfully" });
        }
        return res.status(404).json({ message: "Address not found" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};

// MEAN: UPDATE ADDRESS
export const UpdateAddress = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { addressLine, city, state, country } = req.body;
        const result = await updateAddress(id, { addressLine, city, state, country });
        if (result) {
            return res.status(200).json({ message: "Address updated successfully", result });
        }
        return res.status(404).json({ message: "Address not found" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};
// MEAN: GET ADDRESS BY ID
export const GetAddressById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const address = await getAddressById(id);
        if (address) {
            return res.status(200).json({ message: "Address fetched successfully", address });
        }
        return res.status(404).json({ message: "Address not found" });
    } catch (error) {
        return res
            .status(500)
            .json({ message: "Internal Server Error",  error });
    }
};
