import dataBuku from "../models/dataBukuModel.js";
import User from "../models/userModel.js";

//Get all from buku
export const getDataBuku = async (req, res) => {
  try {
    const response = await dataBuku.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getDataBukuById = async (req, res) => {
  try {
    const response = await dataBuku.findAll({
      where: {
        id_buku: req.params.id_buku,
      }
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

//Update data buku
export const updateDataBuku = async (req, res) => {
  try {
    await dataBuku.update(req.body, {
      where: {
        id_buku: req.params.id_buku,
      },
    });
    res.status(200).json({ msg: "Book Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

//Buat data buku baru
export const createDataBuku = async (req, res) => {
  try {
    await dataBuku.create(req.body);
    res.status(201).json({ msg: "Data Buku berhasil dibuat" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDataBuku = async (req, res) => {
  try {
    await dataBuku.destroy({
      where: {
        id_buku: req.params.id_buku,
      },
    });
    res.status(200).json({ msg: "Book Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
