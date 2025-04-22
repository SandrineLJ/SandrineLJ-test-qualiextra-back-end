# API REST Utilisateurs - test Qualiextra

## Contexte
Création d'une API REST pour gérer des utilisateurs. Chaque utilisateur a un identifiant unique, un nom, un prénom, un email et un mot de passe. Une route /login permet de s'authentifier et une route /private (accessible uniquement aux utilisateurs connectés) retourne "Hello ${prenom}".

## Fonctionnalités
- Gestion des utilisateurs :
  - Enregistrement, authentification, et gestion des profils utilisateurs.
  - Gestion des rôles (Admin / Member).
  - Vérification d'email lors de la création d'un compte.
Blocage des emails temporaires ou jetables.
- Rôles des utilisateurs :
  - Un utilisateur peut être un "Member" ou un "Admin".
  - Les admins peuvent voir un utilisateur, le modifier, le supprimer et lister l'ensemble des utilisateurs.
  - Les utilisateurs standards peuvent seulement voir et modifier leur propre profil.

## Installation

### Prérequis

- Node.js (version 16 ou supérieure)
- npm
- PostgreSQL
- Un compte (gratuit) sur le site https://mailtrap.io pour simuler la réception des emails

### Etapes d'installation

#### 1. Créer une base de données en local :
- Se connecter à postgreSQL dans le terminal `postgres psql -U postgres`
- Créer un utilisateur `CREATE ROLE user WITH LOGIN PASSWORD 'password';`
- Créer la base de données `CREATE DATABASE db WITH OWNER user;`

#### 2. Cloner le projet dans un terminal et s'y déplacer :
 

 `npm git clone git@github.com:SandrineLJ/SandrineLJ-test-qualiextra-back-end.git`
 


#### 3. Copier le fichier `.env.example` dans un fichier `.env` à la racine du projet et remplir les variables d'environnements.
 ```
 # Port du serveur
 PORT=

 # URL de la base de données
 DB_URL=postgres://nom_d_ulisateur:mdp@localhost:5432/nom_de_la_bdd

 # JWT secret pour la création des tokens
 JWT_SECRET=votre_jwt_secret

 MAILTRAP_USER=votre_mailtrap_user
 MAILTRAP_PASS=votre_mailtrap_password
 ```

 #### 4. Installer les dépendances :
 ```
npm install
```
#### 5. Alimenter la base de données avec les fichiers test sync et seeding
```
npm run db:reset
```
#### 6. Démarrer le serveur :
```
npm run dev 
```
