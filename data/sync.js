import { sequelize } from "../app/models/sequelize-client.js";
import { User } from "../app/models/User.js";

//creation de la table User dans la BDD
try {
    await sequelize.sync({ force : true});
    console.log("Database synced succesfully.")
    await sequelize.close();

} catch (error) {
    console.error("Database synced failed", error);
    
};