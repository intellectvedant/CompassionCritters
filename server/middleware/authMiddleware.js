import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import client from "../database.js";

dotenv.config();
// protected middleware route
export const tokenVerification = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ Error: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .send({ Error: "Unauthorized - Token not provided" });
    }
    req.user = decoded;
    next();
  });
};

export const isAdmin = async (req, res, next) => {
  try {
    const userId = req.user.userId;


    const user = await client.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);

    if (!user.rows.length) {
      return res.status(401).send({ Error: "Unauthorized - User not found" });
    }

    const isAdmin = user.rows[0].is_admin;

    if (!isAdmin) {
      return res
        .status(403)
        .send({ Error: "Unauthorized - Access forbidden for non-admin users" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
