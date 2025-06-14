import { User } from "../models/User.js";

export const adminController = {
    async getAllUsers(req, res,) {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }
        });

        res.status(200).json(users);
    },

    async getOneUser(req, res, next) {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] }
        });
        if (!user) {
            return next();
        }

        res.status(200).json(user);
    },

    async editUser(req, res, next) {
        // Récupérer l'utilisateur en BDD.
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] }
        });

        // Si l'utilisateur n'existe pas, renvoyer vers le middleware notFound.
        if (!user) {
            return next();
        }

        // Récupérer les données modifiées.
        const { firstname, lastname, email, role, verified } = req.body;

        if (firstname) { user.firstname = firstname };
        if (lastname) { user.lastname = lastname };
        if (email) { user.email = email };
        if (role) { user.role = role };
        if (verified) { user.verified = verified };

        await user.save()
        // Renvoyer les données à jour sans le mot de passe (car exclus de la requête API).
        res.status(200).json(user);
    },

    async deleteUser(req, res, next) {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"]}
        });

        if (!user) {
            return next();
        }

        await user.destroy();

        res.status(204);
    }
}