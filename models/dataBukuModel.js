import { Sequelize } from "sequelize";
import db from "../config/database.js";

const dataBuku = db.define(
  "buku",
  {
    id_buku: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    kategori: Sequelize.STRING,
    nama_buku: Sequelize.STRING,
    harga: Sequelize.INTEGER,
    stok: Sequelize.INTEGER,
    penerbit: Sequelize.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default dataBuku;

(async () => {
  await db.sync();
})();
