import { Address } from "../entities/address.entity";
import { User } from "../entities/user.entity";
import AppDataSource from "../config/database";

const addressRepository = AppDataSource.getRepository(Address);
const userRepository = AppDataSource.getRepository(User);

// MEAN: GET ALL ADDRESSES
export const getAllAddresses = async (): Promise<Address[]> => {
    return await addressRepository.find({ relations: ["user"] });
};

// MEAN: CREATE ADDRESS
export const createAddress = async ( userId: string, addressLine: string, city: string, state: string, country: string): Promise<Address> => {
    const user = await userRepository.findOne({ where: { id: userId } });
    if (!user) {
        throw new Error("User not found");
    }
    const newAddress = await addressRepository.create({ user, addressLine, city, state, country });
    return await addressRepository.save(newAddress);
};

// MEAN: DELETE ADDRESS
export const deleteAddress = async (id: string): Promise<boolean> => {
    const result = await addressRepository.delete(id);
    if (result.affected && result.affected > 0) {
        return true;
    }
    return false;
};

// MEAN: UPDATE ADDRESS
export const updateAddress = async (id: string, updateData: Partial<Address>): Promise<Address | null> => {
    const address = await addressRepository.findOne({ where: { id } });
    if (!address) {
        return null;
    }
    Object.assign(address, updateData);
    return await addressRepository.save(address);
};

// MEAN: GET ADDRESS BY ID
export const getAddressById = async (id: string): Promise<Address | null> => {
    return await addressRepository.findOne({ where: { id }, relations: ["user"] });
};