import { User } from "../entities/user.entity";
import {AppDataSource} from "../config/database";
import { hashPassword } from "../middleware/auth.middleware";

const userRepository = AppDataSource.getRepository(User);
// MEAN: GET USER BY ID
export const getUserById = async (id: string): Promise<User | null> => {
    return await userRepository.findOne({ where: { id } });
};
// MEAN: GET ALL USERS
export const getAllUsers = async (): Promise<User[]> => {
    return await userRepository.find();
}


// MEAN: DELETE USER
export const deleteUser = async (id: string): Promise<boolean> => {
    const result = await userRepository.delete(id);
    if (result.affected && result.affected > 0) {
        return true;
    }
    return false;
};

// MEAN: UPDATE USER
export const updateUser = async (id: string, updateData: Partial<User>): Promise<User | null> => {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
        return null;
    }
    Object.assign(user, updateData);
    return await userRepository.save(user);
};




// MEAN: forgot password - request reset password
export const forgotPassword = async (email: string,newPassword: string): Promise<boolean> => {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
        return false;
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await userRepository.save(user);
    return true;
};

//MEAN: UPDATE PASSWORD
export const updatePassword = async (id: string,currentPassword: string, newPassword: string): Promise<boolean> => {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
        return false;
    }
    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await userRepository.save(user);
    return true;
};