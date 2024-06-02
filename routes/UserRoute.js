import express from "express";
import {
  getUserByUsername,
  Register,
  updateUser,
  deleteUser,
  loginhandler,
  initialEnpoint,
  logout,
} from "../controller/userController.js";

import {
  getDataBuku,
  updateDataBuku,
  createDataBuku,
  deleteDataBuku,
  getDataBukuById,
} from "../controller/dataBukuController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controller/refreshToken.js";

const router = express.Router();

router.get("/", initialEnpoint);

//endpoint akses token
router.get("/token", refreshToken);

//endpoint table user
router.post("/login", loginhandler);
router.post("/register", Register);
router.get("/profile/:username", getUserByUsername);
router.put("/profile/update/:username", updateUser);
router.delete("/profile/delete/:username", deleteUser);
router.delete("/logout", logout);

//endpoint tabel buku
router.get("/buku", getDataBuku);
router.post("/buku/create", createDataBuku);
router.get("/buku/detail/:id_buku", getDataBukuById);
router.put("/buku/update/:id_buku", updateDataBuku);
router.delete("/buku/delete/:id_buku", deleteDataBuku);

export default router;
