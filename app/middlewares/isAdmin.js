export function isAdmin(req, res, next) {
    // Vérifier si l'utilisateur est authentifié et s'il a le rôle admin.
    if (req.user && req.user.role === "admin") {
        next()
    } else {
        // Renvoyer un message d'erreur pour les utilisateurs standards.
        return res.status(403).json({ error: "Accès réserver aux administrateurs."});
    }
}