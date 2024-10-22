import Order from '../models/Order.js';
import Products from '../models/Products.js';
import User from '../models/User.js';

export const createOrder = async (req, res) => {
  try {
    const { user_Id, product_Id, completed_validity, previous_balance, after_balance } = req.body;

    // Ensure the product and user exist before creating an order
    const user = await User.findByPk(user_Id);
    const product = await Products.findByPk(product_Id);

    if (!user || !product) {
      return res.status(400).json({ message: 'Invalid user or product ID' });
    }

    const order = await Order.create({
      user_Id,
      product_Id,
      completed_validity,
      previous_balance,
      after_balance,
    });

    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

// Get all Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, as: 'user' },  // Adjust association name if necessary
        { model: Products, as: 'product' },
      ],
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
