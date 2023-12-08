import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../database.js";
import dotenv from "dotenv";
import { tokenVerification } from "../middleware/authMiddleware.js";

dotenv.config();

export const userRegister = async (req, res) => {
  try {
    console.log(req.body.signup.name);
    const userData = {
      user_name: req.body.signup.name,
      user_email: req.body.signup.email,
      user_password: req.body.signup.password,
    };

    console.log(userData.user_name);

    // check if user already exsits

    const userExsits = await client.query(
      "SELECT * FROM users WHERE user_email=$1",
      [userData.user_email]
    );

    if (userExsits.rows.length !== 0) {
      return res.status(409).send({ msg: "User already exsits!" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(userData.user_password, 10);

    // save user to database
    const saveUser = await client.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [userData.user_name, userData.user_email, hashedPassword]
    );

    const user = saveUser.rows[0];

    res.status(201).json({
      msg: "User Registered Succesfully!",
      user: {
        id: user.user_id,
        name: user.user_name,
        email: user.user_email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const userData = {
      user_email: req.body.loginData.email1,
      user_password: req.body.loginData.password1,
    };

    // check if the user exists
    const userExsits = await client.query(
      "SELECT * FROM users WHERE user_email = $1",
      [userData.user_email]
    );

    if (userExsits.rows.length === 0) {
      return res
        .status(401)
        .json({
          error: "Invalid Username or Password",
          msg: "Invalid Username or Password",
        });
    }

    const user = userExsits.rows[0];

    const passwordMatch = await bcrypt.compare(
      userData.user_password,
      user.user_password
    );

    if (!passwordMatch) {
      return res
        .status(401)
        .json({
          error: "Invalid Username or Password",
          msg: "Invalid Username or Password",
        });
    }

    const token = jwt.sign(
      { userId: user.user_id, name: user.user_name },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      token,
      user: {
        name: user.user_name,
        email: userData.user_email,
      },
      msg: "User Logined Succesfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error!" });
  }
};

export const test = async (req, res) => {
  return res.status(200).send({ msg: "Yo fam good!" });
};
