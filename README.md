**🚗 Contexte**

Création d'une API REST pour gérer des utilisateurs. Chaque utilisateur a un identifiant unique, un nom, un prénom, un email et un mot de passe. Une route `/login` permet de s'authentifier et une route `/private` (accessible uniquement aux utilisateurs connectés) retourne `"Hello ${prenom}"`.

**🌟  Exigences** 

Nous souhaitons que notre API intègre une gestion des rôles, un processus de vérification d'email et sois sécurisée.

1. **Gestion des Rôles (Admin vs User) :**
    - Introduire un rôle "Admin". Un utilisateur peut être soit un utilisateur standard, soit un administrateur.
    - Seuls les administrateurs peuvent lister *tous* les utilisateurs, voir le détail d'un utilisateur spécifique , modifier un utilisateur et supprimer un utilisateur.
    - Les utilisateurs standards peuvent uniquement voir et modifier *leur propre* profil.
2. **Validation d'Email :**
    - Lorsqu'un nouvel utilisateur crée son compte, son compte doit être marqué comme "non vérifié".
    - Le système doit générer un token de vérification unique et l'associer à l'utilisateur.
    - Une fois le compte créé en base, un email doit être envoyé à l'adresse fournie, contenant un lien unique incluant ce token.
    - L'utilisateur ne peut pas se connecter  tant que son email n'est pas vérifié.
3. **Blocage des Adresses Email Temporaires :**
    - Lors de la création d'un compte, le système doit vérifier si le domaine de l'adresse email fournie appartient à un service d'emails jetables/temporaires connu (ex: mailinator.com, temp-mail.org, etc.).
    - Si l'email provient d'un domaine temporaire identifié, l'inscription doit être refusée avec une erreur appropriée