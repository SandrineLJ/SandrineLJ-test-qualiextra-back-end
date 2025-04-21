import { User } from "../models/User.js";

export const adminController = {
    async getAllUsers(req, res) {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }
        });

        res.status(200).json(users);
    },

    async getOneUser(req, res) {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] }
        });
        if (!user) {
            return res.status(404).json({ error: `L'utilisateur ${userId} n'existe pas.`});
        }

        res.status(200).json(user);
    },

    async editUser(req, res) {
        // Récupérer l'utilisateur en BDD.
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] }
        });

        // Si l'utilisateur n'existe pas, envoyer un message d'erreur.
        if (!user) {
            return res.status(404).json({ error: `L'utilisateur ${userId} n'existe pas.`});
        }

        // Récupérer les données modifiées.
        const { firstname, lastname, email, role, verified } = req.body;

        if (firstname) { user.firstname = firstname };
        if (lastname) { user.lastname = lastname };
        if (email) { user.email = email };
        if (role) { user.role = role };
        if (verified) { user.verified = verified };

        // Renvoyer les données à jour sans le mot de passe (car exclus de la requête API).
        res.status(200).json(user);
    },

    async deleteUser(req, res) {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"]}
        });

        if (!user) {
            return res.status(404).json({ error: `L'utilisateur ${userId} n'existe pas.`});
        }

        await user.destroy();

        res.status(204);
    }
}