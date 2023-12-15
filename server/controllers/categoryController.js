import client from "../database.js";
import slugify from "slugify";

// create category

export const createCategory = async (req, res) => {
  console.log(req.body);
  try {
    const userData = {
      category_name: req.body.name,
    };

    if (!userData) {
      return res.status(401).json({ msg: "Name is required" });
    }

    const categoryExsits = await client.query(
      "SELECT * FROM category WHERE category_name = $1",
      [userData.category_name]
    );

    if (categoryExsits.rows.length > 0) {
      return res.status(200).json({ msg: "Category ALready Exsits" });
    }

    const slug = slugify(userData.category_name, { lower: true });

    const category = await client.query(
      "INSERT INTO category (category_name, slug) VALUES ($1, $2) RETURNING *",
      [userData.category_name, slug]
    );

    res.status(201).json({
      msg: "Category Created Successfully",
      category: category.rows[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// update category

export const updateCategory = async (req, res) => {
  console.log(req.body)
  try {
    const userData = {
      category_name: req.body.name,
    };




    const { id } = req.params;



    const slug = slugify(userData.category_name, { lower: true });

    const category = await client.query(
      "UPDATE category SET category_name = $1, slug=$2 WHERE category_id = $3 RETURNING *",
      [userData.category_name, slug, id]
    );

    res.status(201).json({msg: "Category updated Succesfully", category : category.rows[0]})


  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// read all category

export const getAllCategory = async (req, res) => {
  try {
    const category = await client.query(
      "SELECT * FROM category"
    )
    res.status(201).json({msg: "Catgories fetched SUccessfully", category: category.rows})

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// read single category

export const getCategory = async (req, res) => {
  try {

    const {slug} = req.params;

    const category = await client.query(
      "SELECT * FROM category WHERE slug = $1",[slug]
    )
    res.status(201).json({msg: "Category Item fetched SUccessfully", category: category.rows[0]})

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

// delete category

export const deleteCategory = async (req, res) => {
  try {
    const {id} = req.params

    await client.query (
      "DELETE FROM category WHERE category_id = $1",[id]
    )

    res.status(200).json({msg:"Category Deleted Succesfully!"})

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
