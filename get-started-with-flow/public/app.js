/* global CheckoutWebComponents */

// Show toast message
function triggerToast(id) {
  const element = document.getElementById(id);
  if (!element) return;

  element.classList.add("show");
  element.style.display = "block";

  setTimeout(() => {
    element.classList.remove("show");
    element.style.display = "none";
  }, 5000);
}

// Parse query params
const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get("status");
const paymentId = urlParams.get("cko-payment-id");

console.log("A Current URL:", window.location.href);
console.log("Query string:", window.location.search);
console.log("paymentStatus:", paymentStatus);
console.log("paymentId:", paymentId);

// ✅ Show toast (but do NOT skip form rendering)
if (paymentStatus === "succeeded") {
  console.log("✅ Payment successful");
  triggerToast("successToast");
} else if (paymentStatus === "failed") {
  console.log("❌ Payment failed");
  triggerToast("failedToast");
}

// 🔄 Always render the payment form (even after success/failure)
(async () => {
  const PUBLIC_KEY = "pk_sbox_kms5vhdb66lgxsgzlgv4dgy3ziy";

  const response = await fetch("https://checkoutcasestudy.onrender.com/create-payment-sessions", {
    method: "POST",
  });

  const paymentSession = await response.json();

  console.log("Fetched paymentSession:", paymentSession);

  if (!response.ok) {
    console.error("Error creating payment session", paymentSession);
    return;
  }

  const checkout = await CheckoutWebComponents({
    publicKey: PUBLIC_KEY,
    environment: "sandbox",
    locale: "en-GB",
    paymentSession,
    onReady: () => {
      console.log("Checkout component ready");
    },
    onPaymentCompleted: (_component, paymentResponse) => {
      console.log("New Payment completed with ID:", paymentResponse.id);
      console.log("New1 Payment response:", paymentResponse);

      // 🔁 Reload with success status (keeps form + shows toast)
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("status", "succeeded");
      currentUrl.searchParams.set("cko-payment-id", paymentResponse.id);
      window.location.href = currentUrl.toString();
    },
    onChange: (component) => {
      console.log(`onChange() -> isValid: "${component.isValid()}" for "${component.type}"`);
    },
    onError: (component, error) => {
      console.error("❌ onError:", error, "Component:", component.type);

      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("status", "failed");
      window.location.href = currentUrl.toString();
    },
  });

  const flowComponent = checkout.create("flow");
  flowComponent.mount(document.getElementById("flow-container"));
})();



/* global CheckoutWebComponents */
/*
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
    onReady: () => {
      console.log("onReady");
    },
    onPaymentCompleted: (_component, paymentResponse) => {
      console.log("Create Payment with PaymentId: ", paymentResponse.id);
	  console.log("Create Payment with paymentResponse: ", paymentResponse);
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
})();

function triggerToast(id) {
  var element = document.getElementById(id);
  element.classList.add("show");

  setTimeout(function () {
    element.classList.remove("show");
  }, 5000);
}

const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get("status");
const paymentId = urlParams.get("cko-payment-id");
console.log("Current URL: ", window.location.href);
console.log("Query string: ", window.location.search);

console.log("Create Payment with urlParams: ", urlParams);
console.log("Create Payment with paymentStatus: ", paymentStatus);
console.log("Create Payment with paymentId: ", paymentId);


if (paymentStatus === "succeeded") {
	console.log("Create Payment with paymentStatus: IN SUCCESS");
  triggerToast("successToast");
}

if (paymentStatus === "failed") {
  triggerToast("failedToast");
}

if (paymentId) {
  console.log("Create Payment with PaymentId1: ", paymentId);
  console.log("Create Payment with Payload1: ", urlParams);
}
*/