import { User } from "../models/User.js"

export const userController = {
    async getAll(req, res) {
        const users = await User.findAll();

        res.status(200).json(users);
    },

    async getOne(req, res) {
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: `L'utilisateur ${userId} n'existe pas.`});
        }

        res.status(200).json(user);
    },

    async edit(req, res) {
        // Récupérer l'utilisateur en BDD.
        const userId = parseInt(req.params.id);
        const user = await User.findByPk(userId);

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

        // Enregistrer en BDD les modifications.
        await user.save();

        // Retourner les données de l'utilisateur à jour.
        res.status(200).json(user);

    }
}