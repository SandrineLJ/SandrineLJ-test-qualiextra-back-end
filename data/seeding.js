import { sequelize } from "../app/models/sequelize-client.js";
import { User } from "../app/models/User.js";

try {
    await User.bulkCreate([
        {
            firstname: "Admin",
            lastname: "Istrator",
            email: "admin@admin.fr",
            password: "adminPassword123",
            role: "admin",
            verified: true,
        },
        {
            firstname: "Member",
            lastname: "User",
            email: "member@user.com",
            password: "member123",
            role: "member",
            verified: true,
        }
    ]);
    console.log("Seeding database succesfully.");
    await sequelize.close();

} catch (error) {
    console.error("Seeding failed.", error);
}