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
//const SECRET_KEY = "sk_sbox_txpyg4zdo4pvb42jiag4dp4qcye";
const SECRET_KEY = "sk_sbox_4cuw6anwffm43b54podal7jlbq#";
const PROCESSING_CHANNEL = "pc_5tjuchtzimgujdnzgwnaf5lqwu";

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
	processing_channel_id: PROCESSING_CHANNEL,
        currency: "EUR",
        reference: "ORD-123AB",
        description: "Payment for Iphone Casing",
        billing_descriptor: {
          name: "Jia Tsang",
          city: "Euro",
        },
        customer: {
          email: "jia.tsang@example.com",
          name: "Jia Tsang",
        },
		/*
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
		*/
        billing: {
          address: {
			  /*
            address_line1: "123 High St.",
            address_line2: "Flat 456",
            city: "London",
            zip: "SW1A 1AA",
            country: "GB",
			*/
			"country": "NL"
          },
		  /*
          phone: {
            number: "1234567890",
            country_code: "+44",
          },
		  */
        },
        risk: {
          enabled: true,
        },
		
		enabled_payment_methods: ["card","ideal","googlepay"],
		
		"3ds": {
			"enabled": true,
			//"attempt_n3d": false,
			//"challenge_indicator": "no_preference",
			//"exemption": "low_value",
			//"allow_upgrade": true
			},
        success_url: "https://jcthum1991.github.io/CheckoutCaseStudy/?status=succeeded",
        failure_url: "https://jcthum1991.github.io/CheckoutCaseStudy/?status=failed",
        metadata: {},
        items: [
          {
            name: "Iphone Casing",
            quantity: 1,
            unit_price: 1635,
          },
          {
            name: "Iphone Casing 1",
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


app.post("/getPaymentDetails", async (req, res) => {
	
	const { paymentId } = req.body;
	
	console.log("paymentId ",paymentId);
	
	if (!paymentId) {
		return res.status(400).json({ error: "Missing paymentId in request body" });
	}

	try {
		const request = await fetch(
		`https://api.sandbox.checkout.com/payments/${paymentId}`,
		{
		  method: "GET",
		  headers: {
			Authorization: `Bearer ${SECRET_KEY}`,
			"Content-Type": "application/json",
		  },
		}
	  );
	  const data = await request.json();
	  const TransStatus = data.approved;
	  console.log("data ",data.approved);
	  console.log("data ",data);
	  
	  if (TransStatus === true) {
      // ✅ Return only "approved" message
      return res.status(200).json({ status: "approved" });
    } else {
      // ❌ Return declined or general failure
      return res.status(200).json({ status: "declined" });
    }
	  
	  //res.status(request.ok ? 200 : request.status).json(data);
	  
	  //res.status(request.status).send(data);
	  
	} catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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
