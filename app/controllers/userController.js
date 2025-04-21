import { User } from "../models/User.js"

export const userController = {
    async getMe(req, res) {
        // Récupérer l'id dans le token.
        const userId = req.user.id;

        // Appeler la BDD.
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] }
        });

        res.status(200).json(user);
    },

    async editMe(req, res) {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] }
        });

        const { firstname, lastname, email, password } = req.body;
        if (firstname) { user.firstname = firstname };
        if (lastname) { user.lastname = lastname };
        if (email) { user.email = email };
        if (password) { user.password = password };

        await user.save();

        res.status(200).json(user)
    }
}