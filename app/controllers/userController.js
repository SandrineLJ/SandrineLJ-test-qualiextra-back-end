import { User } from "../models/User.js"

export const userController = {
    async getAll(req, res) {
        const result = await User.findAll();

        res.status(200).json(result);
    }
}