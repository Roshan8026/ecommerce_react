// controllers/userController.js

const User    = require('../models/User');
const Product_title    = require('../models/Product_title');
const Products = require('../models/Products');

// first product deactive  ??


exports.addProductTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const Product_titles = await Product_title.create({ title:title, active:0});
    res.json({status: 200, Message: "Product Title created successfully"});
  } catch (error) {
    res.status(500).json({ error: 'addProductTitle Internal server error' });
  }
};

exports.addProducts = async (req,res) => {
  try {
    const {product_title_id, img_url , title , price , validity_period, daily_income , total_revenue, total_return, purchase_limit, invitation_bonus , purchase_bonus, lucky_draw } = req.body;

    // image store in storage 
    const Products = await Products.create({product_title_id:product_title_id, img_url:img_url,title:title,price:price,
      validity_period:validity_period, daily_income:daily_income, total_revenue:total_revenue,
      total_return:total_return, purchase_limit:purchase_limit, invitation_bonus:invitation_bonus,
      purchase_bonus:purchase_bonus , lucky_draw:lucky_draw});

    res.json({status: 200, Message: "Product created successfully"});
  } catch (error) {
    res.status(500).json({ error: 'addProducts Internal server error' });
  }
}

exports.findProducts = async (req,res) => {
  try{
    const { id } = req.params;
    const Products  = await Products.findOne({ where: { id } });
    res.status(201).json({status: 200, Message: "Products find successfully", data: Products});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while creating a post' });
  }
}

exports.getProducts = async (req,res) => {
  try {
    // get products details also ??
    const { id } = req.params;
    const Products = await Product_title.findOne({ where: { id: id } });
    if (!Products) {
      return res.status(404).json({ message: 'Products not found' });
    }
    res.status(201).json({status: 200, Message: "Products find successfully", data: Products});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while updating the post' });
  }
}

exports.allProduct = async (req,res) => {
  try {
    // get products details also using relationship  ?? 
    const Product_title = await Product_title.findAll({ where: { active: 1 } });
    if (!Product_title) {
      return res.status(404).json({ message: 'Product_title not found' });
    }
    res.status(201).json({status: 200, Message: "All Products Fetch successfully", data: Product_title});

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while deleting the post' });
  }
}

exports.createComment = async (req , res) => {
  try {
    const blog_id = req.params.blogId;
    const { comment } = req.body;
    
    if(comment == null){
      res.status(500).json({ error: 'comment is cannot be null' });
    }

    // Create the comment
    const blog_comment = await Comment.create({
      comment,
      blog_id,
      userId: req.userId,
    });

    res.status(201).json(blog_comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the comment.' });
  }
}

exports.listComment = async (req, res ) => {
  try {
    const Comments = await Comment.findAll({ where: { blog_id: req.params.blogId } });
    res.json(Comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error occurred while fetching comments' });
  }
}
