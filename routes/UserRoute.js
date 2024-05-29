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
router.get("/profile/:username", verifyToken, getUserByUsername);
router.put("/profile/update/:username", verifyToken, updateUser);
router.delete("/profile/delete/:username", verifyToken, deleteUser);
router.delete("/logout", logout);

//endpoint tabel buku
router.get("/buku", getDataBuku);
router.post("/buku/create", verifyToken, createDataBuku);
router.get("/buku/detail/:id_buku", verifyToken, getDataBukuById);
router.put("/buku/update/:id_buku", verifyToken, updateDataBuku);
router.delete("/buku/delete/:id_buku", verifyToken, deleteDataBuku);

export default router;