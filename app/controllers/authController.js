import { User } from "../models/User.js";
import jwt from "jsonwebtoken";

export const authController = {
    async loginUser(req, res) {
        // Récupérer l'email et le mot de passe saisis par l'utilisateur.
        const { email, password } = req.body;

        // Si l'un des champs manque, renvoyer un message d'erreur.
        if (!email || !password) {
            return res.status(400).json({ error: "Tous les champs sont obligatoires." });
        }

        // Vérifier que l'utilisateur existe en BDD.
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: "Email ou mot de passe incorrect." });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: "Email ou mot de passe incorrect." })
        }

        const token = jwt.sign(
            { id: user.id, firstname: user.firstname, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        res.status(200).json({ message: `Hello ${user.firstname}`, token });
    }
}