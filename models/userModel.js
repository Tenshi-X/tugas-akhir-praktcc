import { Sequelize } from "sequelize";
import db from "../config/database.js";

const User = db.define(
  "users",
  {
    username: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    password: Sequelize.STRING,
    refreshToken: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
  }
);

export default User;

(async () => {
  await db.sync();
})();
