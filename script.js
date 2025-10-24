// ✅ GOOGLE SHEETS BACKEND URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbwWF_3xlbZlOkepPITM7Rn0xUqN5Ga_xkzKcE2d90OPqdXazngTpVWOg-kaZQj-ocC-MA/exec';

/* ---------- COUNTDOWN ---------- */
// Target wedding date — change the date/time if needed
const weddingDate = new Date("December 12, 2025 10:00:00").getTime();

const countdown = setInterval(() => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  // Stop the timer if countdown is done
  if (distance <= 0) {
    clearInterval(countdown);
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  // Time calculations
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update DOM
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

  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const attending = formData.get("attending");
  const message = formData.get("message");

  try {
    const response = await fetch(scriptURL, { method: "POST", body: formData });
    if (response.ok) {
      msgEl.style.color = "#2e7d32";
      msgEl.textContent = "🎉 Your RSVP has been received successfully!";
      form.reset();

      // ✅ Show the submitted details
      document.getElementById("submittedDetails").style.display = "block";
      document.getElementById("detailName").textContent = name;
      document.getElementById("detailEmail").textContent = email;
      document.getElementById("detailAttending").textContent = attending;
      document.getElementById("detailMessage").textContent = message;
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