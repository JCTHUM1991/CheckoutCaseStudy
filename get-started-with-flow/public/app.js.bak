/* global CheckoutWebComponents */
(async () => {
  // Insert your public key here
  const PUBLIC_KEY = "pk_sbox_kms5vhdb66lgxsgzlgv4dgy3ziy";

  const response = await fetch("https://checkoutcasestudy.onrender.com/create-payment-sessions", { method: "POST" }); // Order
  const paymentSession = await response.json();

 console.log("Create Payment with paymentSession: ", paymentSession);
  if (!response.ok) {
    console.error("Error creating payment session", paymentSession);
    return;
  }

  const checkout = await CheckoutWebComponents({
    publicKey: PUBLIC_KEY,
    environment: "sandbox",
    locale: "en-GB",
    paymentSession,
	componentOptions: {
    card: {
      data: {
        cardholderName: 'Jia Tsang',
      },
    },
  },
	//translations,
    onReady: () => {
      console.log("onReady");
    },
    onPaymentCompleted: (_component, paymentResponse) => {
      console.log("Create Payment with PaymentId: ", paymentResponse.id);
	  console.log("Create Payment with paymentResponseStatus: ", paymentResponse.status);
	  console.log("AA Create Payment with paymentResponse: ", paymentResponse);
	  
	  const paymentStatus = paymentResponse.status;
	  const paymentId = paymentResponse.id;
	  
		if (paymentStatus === "Approved") {
		console.log("Create Payment with paymentStatus: IN SUCCESS");
		triggerToast("successToast");
		}

		if (paymentStatus === "Declined") {
		  triggerToast("failedToast");
		}

		if (paymentId) {
		  console.log("Create Payment with PaymentId1: ", paymentId);
		  
		}
    },
    onChange: (component) => {
      console.log(
        `onChange() -> isValid: "${component.isValid()}" for "${
          component.type
        }"`,
      );
    },
    onError: (component, error) => {
      console.log("onError", error, "Component", component.type);
    },
  });

  const flowComponent = checkout.create("flow");
  


 flowComponent.mount(document.getElementById("flow-container"));
  
  const idealComponent = checkout.create("ideal");
  if (await idealComponent.isAvailable()) {
  idealComponent.mount('#ideal-container');
}
})();

function triggerToast(id) {
  var element = document.getElementById(id);
  element.classList.add("show");

  setTimeout(function () {
    element.classList.remove("show");
  }, 5000);
}
/*
const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get("status");
const paymentId = urlParams.get("cko-payment-id");

console.log("Current URL: ", window.location.href);
console.log("Query string: ", window.location.search);

console.log("Create Payment with urlParams: ", urlParams);
console.log("Create Payment with paymentStatus: ", paymentStatus);
console.log("Create Payment with paymentId: ", paymentId);


if (paymentStatus === "Approved") {
	console.log("Create Payment with paymentStatus: IN SUCCESS");
  triggerToast("successToast");
}

if (paymentStatus === "Declined") {
  triggerToast("failedToast");
}

if (paymentId) {
  console.log("Create Payment with PaymentId1: ", paymentId);
  console.log("Create Payment with Payload1: ", urlParams);
}
*/