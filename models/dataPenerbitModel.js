import { Sequelize } from "sequelize";
import db from "../config/database.js";

const dataPenerbit = db.define(
  "penerbit",
  {
    id_penerbit: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    nama: Sequelize.STRING,
    alamat: Sequelize.STRING,
    kota: Sequelize.STRING,
    telepon: Sequelize.STRING,
    email: Sequelize.STRING,
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default dataPenerbit;

(async () => {
  await db.sync();
})();
