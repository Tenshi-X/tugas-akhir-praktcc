import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Initial endpoint
export const initialEnpoint = async (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Connected to Data-book Backend!!",
  });
};

//Get User Data by username
export const getUserByUsername = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

//Buat tambah data user
export const Register = async (req, res) => {
  try {
    const { username,password } = req.body;
    const encryptPassword = await bcrypt.hash(password, 5);
    await User.create({
      password: encryptPassword,
      username: username,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error.message);
  }
};

//Login Handler
export const loginhandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (user) {
      const userPayload = {
        username: user.username
      };
      const decryptPassword = await bcrypt.compare(password, user.password);
      if (decryptPassword) {
        const accessToken = jwt.sign(
          userPayload,
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "30s",
          }
        );
        const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: "1d",
        });
        await User.update(
          { refreshToken: refreshToken },
          {
            where: {
              username: user.username,
            },
          }
        );
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          secure: true,
        });
        res.status(200).json({
          status: "Succes",
          message: "Login Berhasil",
          user,
          accessToken,
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Paassword atau email salah",
        });
      }
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Paassword atau email salah",
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findOne({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!user.refreshToken) return res.sendStatus(204);
  const username = user.username;
  await User.update(
    { refreshToken: null },
    {
      where: {
        username: username,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};

//Update user
export const updateUser = async (req, res) => {
  try {
    const {  password, username } = req.body;
    let updatedData = {
      username: username,
    };

    if (password) {
      const encryptPassword = await bcrypt.hash(password, 5);
      updatedData.password = encryptPassword;
    }

    const result = await User.update(updatedData, {
      where: {
        username: req.params.username,
      },
    });

    // Periksa apakah ada baris yang terpengaruh (diupdate)
    if (result[0] === 0) {
      return res.status(404).json({
        status: "failed",
        message: "User not found or no changes applied",
        updatedData: updatedData,
        result,
      });
    }

    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

//Delete user
export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        username: req.params.username,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
