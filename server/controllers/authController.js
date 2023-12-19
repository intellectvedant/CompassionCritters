import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../database.js";
import dotenv from "dotenv";
import { tokenVerification } from "../middleware/authMiddleware.js";

dotenv.config();

// Signup/ Register Section

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

// Login Section

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
      return res.status(401).json({
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
      return res.status(401).json({
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
        id: user.user_id,
        name: user.user_name,
        email: userData.user_email,
        is_admin: user.is_admin,
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

// order

export const userOrders = async (req, res) => {
  try {
    const order = await client.query(
      "SELECT o.order_id, o.status, o.payment, p.product_name, p.product_photo, p.product_id, u.user_name FROM orders o JOIN product p ON p.product_id = ANY(o.ordered_products) JOIN users u ON o.buyer = u.user_id WHERE o.buyer = $1 ORDER BY o.created_at DESC",
      [req.user.userId]
    );

    console.log({ order: order });
    res
      .status(201)
      .json({ msg: "Orders Fetched Successfully", order: order.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// admin order

export const adminOrders = async (req, res) => {
  try {
    const orders = await client.query(
      "SELECT o.*, p.*, u.user_name as buyer_name FROM orders o " +
        "JOIN product p ON p.product_id = ANY(o.ordered_products) " +
        "JOIN users u ON o.buyer = u.user_id " +
        "ORDER BY o.created_at DESC"
    );

    console.log({ orders: orders });
    res
      .status(201)
      .json({ msg: "All Orders Fetched Successfully", orders: orders.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// order status

export const orderStatus = async (req, res) => {
  try {
    const { order_id } = req.params;
    const { status } = req.body;

    const order = await client.query(
      "UPDATE orders SET status = $1 WHERE order_id = $2 ",
      [status, order_id]
    );

    console.log({ orders: order });
    res
      .status(201)
      .json({ msg: "Status Changed Successfully", order: order.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


// order successfull

export const orderSuccessfull = async (req, res) => {
  try {

    const {order_id} = req.params;

    const order = await client.query(
      "SELECT * FROM orders WHERE order_id=$1",
      [order_id]
    );

    console.log({ order: order });
    res
      .status(201)
      .json({ msg: "Orders Fetched Successfully", order: order.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// quantity changed

export const quantityUpdate = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;

    const order = await client.query(
      "UPDATE product SET product_quantity = product_quantity - $1 WHERE product_id = $2 ",
      [quantity, product_id]
    );

    res.status(201).json({ msg: "Quantity Changed Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
