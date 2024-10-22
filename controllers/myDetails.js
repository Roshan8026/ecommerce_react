import My_Details from '../models/My_Details.js';
import User from '../models/User.js';  // Assuming User is the model name

// Create a new My_Details record
export const createMyDetails = async (req, res) => {
  try {
    const {
      user_Id,
      recharge,
      balance,
      total_income,
      total_recharge,
      total_asset,
      total_withdraw,
      todays_income,
      team_income,
    } = req.body;

    // Check if the user exists before creating a details entry
    const user = await User.findByPk(user_Id);

    if (!user) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const myDetails = await My_Details.create({
      user_Id,
      recharge,
      balance,
      total_income,
      total_recharge,
      total_asset,
      total_withdraw,
      todays_income,
      team_income,
    });

    res.status(201).json({ message: 'Details created successfully', myDetails });
  } catch (error) {
    res.status(500).json({ message: 'Error creating details', error });
  }
};

// Get all My_Details records
export const getAllMyDetails = async (req, res) => {
  try {
    const details = await My_Details.findAll({
      include: [{ model: User, as: 'user' }],
    });

    res.status(200).json(details);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching details', error });
  }
};

