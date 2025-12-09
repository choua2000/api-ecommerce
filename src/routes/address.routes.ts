import { Router } from "express";
import { CreateAddress, GetAllAddresses, GetAddressById, UpdateAddress, DeleteAddress } from "../controllers/address.controller";

const routerAddress = Router();
routerAddress.get("/addresses/", GetAllAddresses);
routerAddress.get("/addresses/:id", GetAddressById);
routerAddress.post("/addresses/", CreateAddress);
routerAddress.delete("/addresses/:id", DeleteAddress);
routerAddress.put("/addresses/:id", UpdateAddress);

export default routerAddress;