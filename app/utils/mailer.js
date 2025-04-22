import nodemailer from "nodemailer";

// Configurer le transporteur d'email via Mailtrap.
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io", // Hôte SMTP de Mailtrap.
    port: 2525,                       // Port SMTP pour les connexions sécurisées Mailtrap.
    auth: {
        user: process.env.MAILTRAP_USER, // Identifiant Mailtrap stocké dans les variables d'environnement.
        pass: process.env.MAILTRAP_PASS, // Mot de passe Mailtrap stocké dans les variables d'environnement.
    }
});

/**
 * Fonction utilitaire pour envoyer un email de vérification
 * @param {string} to - Adresse email du destinataire.
 * @param {string} token - Jeton de vérification unique.
 * @param {string} firstname - Prénom de l'utilisateur (pour personnaliser le message).
 */

export const sendVerificationEmail = async (to, token, firstname) => {
    // Créer le lien de vérification.
    const verificationLink = `http://localhost:3000/verify?token=${token}`;

    // Envoyer le lien de vérification par mail.
    await transporter.sendMail({
        from: '"Mon App" <noreply@sandbox.smtp.mailtrap.io',
        to,
        subject: "Vérifieez votre adresse email",
        html: `
            <h1>Bienvenue ${firstname} !</h1>
            <p>Merci de vous être inscrit. Veuillez vérifier votre adresse email en cliquant sur ce lien :</p>
            <a href="${verificationLink}">${verificationLink}</a>
        `
    })
}