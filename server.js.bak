const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

app.use(cors({
  origin: "https://jcthum1991.github.io" // or "*" to allow all (not recommended in production)
}));


app.use(express.static("public"));
app.use(express.json());

// Insert your secret key here
const SECRET_KEY = "sk_sbox_txpyg4zdo4pvb42jiag4dp4qcye";

app.post("/create-payment-sessions", async (_req, res) => {
  // Create a PaymentSession
  const request = await fetch(
    "https://api.sandbox.checkout.com/payment-sessions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 6540,
        currency: "GBP",
        reference: "ORD-123AB",
        description: "Payment for Guitars and Amps",
        billing_descriptor: {
          name: "Jia Tsang",
          city: "London",
        },
        customer: {
          email: "jia.tsang@example.com",
          name: "Jia Tsang",
        },
        shipping: {
          address: {
            address_line1: "123 High St.",
            address_line2: "Flat 456",
            city: "London",
            zip: "SW1A 1AA",
            country: "GB",
          },
          phone: {
            number: "1234567890",
            country_code: "+44",
          },
        },
        billing: {
          address: {
            address_line1: "123 High St.",
            address_line2: "Flat 456",
            city: "London",
            zip: "SW1A 1AA",
            country: "GB",
          },
          phone: {
            number: "1234567890",
            country_code: "+44",
          },
        },
        risk: {
          enabled: true,
        },
		
		enabled_payment_methods: ["card","ideal","googlepay"],
		/*
		"3ds": {
			"enabled": true,
			"attempt_n3d": false,
			"challenge_indicator": "no_preference",
			"exemption": "low_value",
			"allow_upgrade": true
			},*/
        success_url: "https://jcthum1991.github.io/CheckoutCaseStudy/?status=succeeded",
        failure_url: "https://jcthum1991.github.io/CheckoutCaseStudy/?status=failed",
        metadata: {},
        items: [
          {
            name: "Guitar",
            quantity: 1,
            unit_price: 1635,
          },
          {
            name: "Amp",
            quantity: 3,
            unit_price: 1635,
          },
        ],
      }),
    }
  );

  const parsedPayload = await request.json();
  console.log("request ",request);
  console.log("parsedPayload ",parsedPayload);

  res.status(request.status).send(parsedPayload);
});

/*
app.listen(3000, () =>
  console.log("Node server listening on port 3000:  https://checkoutcasestudy.onrender.com")
);
*/

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node server listening on port ${PORT}`);
});