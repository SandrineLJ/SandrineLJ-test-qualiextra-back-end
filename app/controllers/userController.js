import { User } from "../models/User.js"

export const userController = {
    async getAll(req, res) {
        const users = await User.findAll({
            attributes: { exclude: ["password"] }
        });

        res.status(200).json(users);
    },

    async getOne(req, res) {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] }
        });
        if (!user) {
            return res.status(404).json({ error: `L'utilisateur ${userId} n'existe pas.`});
        }

        res.status(200).json(user);
    },

    async edit(req, res) {
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

    async delete(req, res) {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"]}
        });

        if (!user) {
            return res.status(404).json({ error: `L'utilisateur ${userId} n'existe pas.`});
        }

        await user.destroy();

        res.status(204);
    },

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