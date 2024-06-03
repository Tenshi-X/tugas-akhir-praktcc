import dataPenerbit from "../models/dataPenerbitModel.js";

//Get all from buku
export const getDataPenerbit = async (req, res) => {
  try {
    const response = await dataPenerbit.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getDataPenerbitById = async (req, res) => {
  try {
    const response = await dataPenerbit.findAll({
      where: {
        id_penerbit: req.params.id_penerbit,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

//Update data buku
export const updateDataPenerbit = async (req, res) => {
  try {
    await dataPenerbit.update(req.body, {
      where: {
        id_penerbit: req.params.id_penerbit,
      },
    });
    res.status(200).json({ msg: "Penerbit Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

//Buat data buku baru
export const createDataPenerbit = async (req, res) => {
  try {
    await dataPenerbit.create(req.body);
    res.status(201).json({ msg: "Data Penerbit berhasil dibuat" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDataPenerbit = async (req, res) => {
  try {
    await dataPenerbit.destroy({
      where: {
        id_penerbit: req.params.id_penerbit,
      },
    });
    res.status(200).json({ msg: "Penerbit Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
