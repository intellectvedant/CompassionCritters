import client from "../database.js";
import slugify from "slugify";
import fs from "fs";
import cloudinary from "cloudinary";

// create product
export const createProduct = async (req, res) => {
  try {
    const userData = {
      product_name: req.fields.name,
      product_description: req.fields.description,
      product_price: req.fields.price,
      product_category: req.fields.category,
      product_quantity: req.fields.quantity,
      product_shipping: req.fields.shipping,
      product_photo: req.files.photo,
    };

    const slug = slugify(userData.product_name, { lower: true });

    // const photoBuffer = userData.product_photo
    //   ? fs.readFileSync(userData.product_photo.path)
    //   : null;

    const timeStamp = Date.now();
    const uniqueIdentifier = `${slug}_${timeStamp}`;

    // uploading image to cloudinary

    const uploadPhoto = await cloudinary.uploader.upload(
      userData.product_photo.path,
      {
        public_id: `products/${uniqueIdentifier}`,
        folder: "products",
      }
    );

    const photoUrl = uploadPhoto.secure_url;

    const product = await client.query(
      "INSERT INTO product (product_name,product_slug, product_description,product_price,category_id,product_quantity,product_shipping,product_photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        userData.product_name,
        slug,
        userData.product_description,
        userData.product_price,
        userData.product_category,
        userData.product_quantity,
        userData.product_shipping,
        photoUrl,
      ]
    );

    res.status(201).json({
      msg: "Product Created Successfully",
      product: product.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// update product
export const updateProduct = async (req, res) => {
  try {
    const userData = {
      product_name: req.fields.name,
      product_description: req.fields.description,
      product_price: req.fields.price,
      product_category: req.fields.category,
      product_quantity: req.fields.quantity,
      product_shipping: req.fields.shipping,
      product_photo: req.files.photo,
    };

    console.log({photo1 : userData.product_photo})
    console.log({photo2 : req.files.photo})

    const { product_id } = req.params;

    const slug = slugify(userData.product_name, { lower: true });

    const timeStamp = Date.now();
    const uniqueIdentifier = `${slug}_${timeStamp}`;

    // uploading image to cloudinary

    let photoUrl;

    if(userData.product_photo !== undefined){
      const uploadPhoto = await cloudinary.uploader.upload(
        userData.product_photo.path,
        {
          public_id: `products/${uniqueIdentifier}`,
          folder: "products",
        }
      );
  
      photoUrl = uploadPhoto.secure_url;
    }else{
      console.log({photo3: req.fields.photo})
      photoUrl = req.fields.photo
    }






    const product = await client.query(
      "UPDATE product SET product_name = $1, product_slug = $2, product_description = $3, product_price = $4, category_id = $5, product_quantity = $6, product_shipping = $7, product_photo = $8 WHERE product_id = $9 RETURNING *",
      [
        userData.product_name,
        slug,
        userData.product_description,
        userData.product_price,
        userData.product_category,
        userData.product_quantity,
        userData.product_shipping,
        photoUrl,
        product_id,
      ]
    );

    res.status(201).json({
      msg: "Product Updated Successfully",
      product: product.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// get all product
export const getAllProduct = async (req, res) => {
  try {
    const product = await client.query(
      "SELECT * FROM product p LEFT JOIN category c ON p.category_id = c.category_id ORDER BY p.created_at DESC LIMIT 12"
    );

    res.status(201).json({
      totalProducts: product.rows.length,
      msg: "All Products Fetched",
      product: product.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// get product
export const getProduct = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await client.query(
      "SELECT * FROM product p LEFT JOIN category c ON p.category_id = c.category_id WHERE product_slug = $1",
      [slug]
    );

    res.status(201).json({
      msg: "Product Fetched Successfully",
      product: product.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
// delete product
export const deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await client.query(
      "DELETE FROM product where product_id=$1",
      [product_id]
    );

    res.status(201).json({
      msg: "Product Deleted Successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// get photo
export const getPhoto = async (req, res) => {
  try {
    const { product_id } = req.params;

    const product = await client.query(
      "SELECT product_photo FROM product WHERE product_id = $1",
      [product_id]
    );

    console.log(product);

    res.status(201).json({
      msg: "Photo Fetched Successfully",
      product: product.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
