import { User } from "./User.js";

const users = await User.findAll();
//console.log(users);
console.log(JSON.stringify(users, null, 2));