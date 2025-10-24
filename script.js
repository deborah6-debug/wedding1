// ✅ GOOGLE SHEETS BACKEND URL (Your correct link)
const scriptURL = 'https://script.google.com/macros/s/AKfycbxhnf_5tE4sq52QKqSlg7b-tuHzlvEGgMKnj9U8BfqzbHtnWO1XNirxXaugic9qlolr5g/exec';

/* ---------- COUNTDOWN ---------- */
const weddingDate = new Date("December 12, 2025 10:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    clearInterval(countdown);
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days.toString().padStart(2, "0");
  document.getElementById("hours").textContent = hours.toString().padStart(2, "0");
  document.getElementById("minutes").textContent = minutes.toString().padStart(2, "0");
  document.getElementById("seconds").textContent = seconds.toString().padStart(2, "0");
}, 1000);

/* ---------- FORM HANDLING ---------- */
const form = document.getElementById("rsvpForm");
const msgEl = document.getElementById("formMsg");
const submitBtn = document.getElementById("submitBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const attending = form.attending?.value || "";
  const plusOne = form.plusOne?.value || "";
  const reminder = document.getElementById("reminder").checked ? "Yes" : "No";

  if (!firstName || !lastName || !email || !attending || !plusOne) {
    msgEl.style.color = "#c62828";
    msgEl.textContent = "Please fill all the required fields.";
    submitBtn.disabled = false;
    submitBtn.textContent = "Send RSVP";
    return;
  }

  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("attending", attending);
  formData.append("plusOne", plusOne);
  formData.append("reminder", reminder);

  try {
    const response = await fetch(scriptURL, { method: "POST", body: formData });
    if (response.ok) {
      msgEl.style.color = "#2e7d32";
      msgEl.innerHTML = `🎉 Thank you, <strong>${firstName}</strong>! Your RSVP has been received successfully.`;
      form.reset();
    } else {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.error("Error!", error.message);
    msgEl.style.color = "#c62828";
    msgEl.textContent = "❌ Failed to send. Please try again later.";
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send RSVP";
  }
});
