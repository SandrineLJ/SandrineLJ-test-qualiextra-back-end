import isEmail from "validator/lib/isEmail.js";
import domains from "disposable-email-domains/index.json" with { type: "json" };
import wildcardsDomains from "disposable-email-domains/wildcard.json" with { type: "json" };

export function validateEmail(req, res, next) {
    const { email } = req.body;

    // Vérifier si l'email à le bon format.
    if (!isEmail(email)) {
        return res.status(400).json({ message: "Email invalide" });
    }

    // Vérifier si le domaine appartient à un services d'emails temporaires.
    const domain = email.split("@")[1];
    if (domains.includes(domain) || wildcardsDomains.some(wildcard => domain.endsWith(wildcard))) {
        // Renvoyer un message d'erreur si c'est le cas.
        return res.status(400).json({ message: "Les adresses mails temporaires ne sont pas autorisées, merci de fournir un email valide." });
    }
    next();
}