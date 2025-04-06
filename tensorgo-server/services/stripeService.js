const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const YOUR_CLIENT_URL = process.env.CLIENT_URL;
// Create a Stripe checkout session
const createCheckoutSession = async (products) => {
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.title, // ✅ Fixed key
      },
      unit_amount: product.price * 100, // Convert to the smallest currency unit (e.g., cents)
    },
    quantity: 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${YOUR_CLIENT_URL}/success`,
      cancel_url: `${YOUR_CLIENT_URL}/cancel`,
      // success_url: "http://localhost:5173/success",
      // cancel_url: "http://localhost:5173/cancel",
    });

    return { id: session.id };
  } catch (error) {
    console.error("Stripe Error:", error);
    throw new Error("Failed to create checkout session");
  }
};

module.exports = {
  createCheckoutSession,
};
