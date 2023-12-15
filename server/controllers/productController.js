import client from "../database.js";
import slugify from "slugify";
import dotenv from "dotenv";
import cloudinary from "cloudinary";
import braintree from "braintree";

// dotenv configure

dotenv.config();

// Payment Gateway Initial

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

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

    const { product_id } = req.params;

    const slug = slugify(userData.product_name, { lower: true });

    const timeStamp = Date.now();
    const uniqueIdentifier = `${slug}_${timeStamp}`;

    // uploading image to cloudinary

    let photoUrl;

    if (userData.product_photo !== undefined) {
      const uploadPhoto = await cloudinary.uploader.upload(
        userData.product_photo.path,
        {
          public_id: `products/${uniqueIdentifier}`,
          folder: "products",
        }
      );

      photoUrl = uploadPhoto.secure_url;
    } else {
      photoUrl = req.fields.photo;
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

// filter

export const filterProduct = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let query = "SELECT * FROM product WHERE";

    const queryParams = [];

    if (checked.length > 0) {
      query += " category_id = ANY($1) AND";
      queryParams.push(checked);
    }

    if (radio.length === 2) {
      query += " product_price BETWEEN $2 AND $3";
      queryParams.push(radio[0], radio[1]);
    }

    const { rows } = await client.query(query, queryParams);

    res.status(201).json({
      msg: "Filter Fetched Successfully",
      product: rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// count

export const countProduct = async (req, res) => {
  try {
    const product = await client.query("SELECT COUNT(*) FROM product");
    const total = res.status(201).json({
      msg: " Product count Fetched Succesfully",
      product: parseInt(product.rows[0].count),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// page

export const listProduct = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? parseInt(req.params.page) : 1;
    const offset = (page - 1) * perPage;

    const product = await client.query(
      "SELECT * FROM product ORDER BY created_at DESC LIMIT $1 AND OFFSET $2",
      [perPage, offset]
    );

    res.status(201).json({
      msg: " Product page Fetched Succesfully",
      product: product.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// search

export const searchProduct = async (req, res) => {
  try {
    const { keyword } = req.params;

    const product = await client.query(
      "SELECT * FROM product WHERE product_name ILIKE $1 OR product_description ILIKE $1",
      [`%${keyword}%`]
    );

    res.status(201).json({
      msg: " Serached Product Fetched Succesfully",
      product: product.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// similar

export const relatedProduct = async (req, res) => {
  try {
    const { product_id, category_id } = req.params;

    const product = await client.query(
      "SELECT * FROM product WHERE category_id = $1 AND product_id != $2",
      [category_id, product_id]
    );

    res.status(201).json({
      msg: " Similar Product Fetched Succesfully",
      product: product.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// category wise

export const categoryProduct = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await client.query(
      "SELECT category_id FROM category WHERE slug = $1",
      [slug]
    );

    const category_id = category.rows[0]?.category_id;

    const product = await client.query(
      "SELECT * FROM product WHERE category_id =$1",
      [category_id]
    );
    console.log({ product: product });

    res.status(201).json({
      msg: "Category Wise Product Fetched Succesfully",
      product: product.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Payment Contollers

// token

export const orderToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err,response){
      if(err){
        res.status(500).send(err)
      }else{
        res.send(response)
      }
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// payment

export const orderPayment = async (req, res) => {
  try {
    const { cart, nonce } = req.body;

    console.log({ cart: cart });
    console.log({ nonce: nonce });
    console.log({ user: req.user });


    let total = 0;
    cart.cart.map((i) => (total += i.product_price));

    gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (err, result) {
        try {
          if (result) {


            const orderQuery = {
              text:
                "INSERT INTO orders (ordered_products, payment, buyer) VALUES ($1, $2, $3)",
              values: [cart?.cart.map(item => item.product_id), result , req.user?.userId],
            };

            await client.query(orderQuery);
            res.json({ ok: true });
          } else {
            res.status(500).send(err);
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ msg: "Internal Server Error" });
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

