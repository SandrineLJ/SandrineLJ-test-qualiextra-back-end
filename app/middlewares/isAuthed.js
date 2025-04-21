import jwt from "jsonwebtoken";

export function isAuthed(req, res, next) {
    // Récupérer le header "Authorization" (Bearer <token>).
    const authHeader = req.headers.authorization;

    // Récupérer le token sans le préfixe "Bearer".
    const token = authHeader && authHeader.split(" ")[1];

    // Si absence de token, renvoyer un message d'erreur.
    if (!token) {
        return res.status(400).json({ error: "Token manquant" });
    }

    try {
        // Décoder le token.
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = tokenDecoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token invalide ou expiré" });
    }
}