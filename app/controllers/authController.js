import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";

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

        const hashedPassword = user.password; // Mot de passe hashé stocké en BDD.
        
        // Comparer la saisie utilisateur et le mot de passe hashé.
        const isMatching = await argon2.verify(hashedPassword, password);

        if (!isMatching) {
            return res.status(400).json({ error: "Email ou mot de passe incorrect."});
        }

        // Créer le token sécurisé.
        const token = jwt.sign(
            { id: user.id, firstname: user.firstname, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );
        
        res.status(200).json({ token });
    }
}