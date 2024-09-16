import instance from '../server.js'; // Import the default export
import crypto from 'crypto';
import Payment from '../models/Payment.js'; // Ensure correct file path and extension

export const getkey = async (req, res) => {
 res.status(200).json({
    key: process.env.RAZORPAY_API_KEY 
  });
}

export const checkout = async (req, res) => {
    const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  console.log('option', options);
  console.log("Razorpay instance:", instance);
  // Remove the return statement to allow order creation
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res) => {
  // console.log('req',req);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  console.log("Order ID:", razorpay_order_id);
  console.log("Payment ID:", razorpay_payment_id);
  console.log("Signature:", razorpay_signature);
  
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "NtwTXA9TR72C1QyFrnmFCJRs")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

// module.exports = { checkout, paymentVerification };
