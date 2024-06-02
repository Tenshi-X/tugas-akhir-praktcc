import { Sequelize } from "sequelize";
import db from "../config/database.js";

const User = db.define(
  "users",
  {
    id_user: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    refreshToken: Sequelize.TEXT,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default User;

(async () => {
  await db.sync();
})();
