import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    }
});

export const sendVerificationEmail = async (to, token, firstname) => {
    // Créer le lien de vérification.
    const verificationLink = `http://localhost:3000/verify?token=${token}`;

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