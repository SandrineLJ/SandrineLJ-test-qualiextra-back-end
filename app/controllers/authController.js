import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { sendVerificationEmail } from "../utils/mailer.js";

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
        
        // S'assurer que l'utilisateur est vérifier.
        if (!user.isVerified) {
            return res.status(403).json({ message: "Veuillez valider votre adresse mail." })
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
    },

    async registerUser(req, res) {
        const { firstname, lastname, email, password, confirmPassword } = req.body;

        // S'assurer que tous les champs sont remplis.
        if (!firstname || !lastname || !email || !password || !confirmPassword) {
            res.status(400).json({ message: "Tous les champs sont obligatoires." });
        }

        // Vérifier que le mot de passe et sa confirmation sont identiques.
        if (password !== confirmPassword) {
            res.status(400).json({ message: "Le mot de passe et sa confirmation doivent être identiques."} )
        }

        // Vérifier si un utilisateur avec la même adresse email existe dans notre BDD.
        const existingUser = await User.findOne({
            where: { email: email }
        });

        if (existingUser) {
            return res.status(409).json({ message: "L'email renseigné est déjà utilisé." });
        }

        // Générer le token de vérification que l'on va stocker en BDD pour comparaison au moment de la validation par l'utilisateur.
        const verificationToken = jwt.sign(
            { email },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        // Sauvegarder l'utilisateur dans la BDD.
        await User.create({
            firstname,
            lastname,
            email,
            password,// Le mot de passe est hashé dans notre modèle User avant enregistrement.
            verificationToken,
            // Le rôle "member" est attribué par défaut dans le modèle User.
        });

        await sendVerificationEmail(email, verificationToken, firstname)
        res.status(201).json({ message: "Compte créé avec succès. Veuillez consulter votre boîte mail pour vérifier votre compte." })
    },

    async verifyUser(req, res, next) {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: "Token manquant"} );
        }

        try {
            // Décoder le token de vérification.
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Comparer l'email décodé avec la BDD.
            const user = await User.findOne({ where: { email: decoded.email } });

            if (!user) {
                return next();
            }

            // Vérifier si l'utilisateur est déjà vérifié.
            if (user.isVerified === true) {
                return res.status(400).json({ message: "Utilisateur déjà vérifié." });
            }

            // Mettre à jour l'utilisateur en BDD.
            user.isVerified = true;
            user.verificationToken = null;
            await user.save();

            res.status(200).json({ message: "Email vérifié avec succès."})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Une erreur est survenue lors de la vérification de l'email, merci de réessayer plus tard." })
        }
    }
}