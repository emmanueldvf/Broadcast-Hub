console.log("admin.js loaded");

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* SUPABASE */
const supabase = createClient(
  "https://soisqaeztkbzkyavnbyz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaXNxYWV6dGtiemt5YXZuYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjcwNzUsImV4cCI6MjA5NTY0MzA3NX0.L2mBVBh_xdIHKffx3SdYE_RRNB_Acv3opZJc-gBUsTo"
);

/* ADMIN CHECK */
async function checkAdmin() {
  console.log("Checking admin...");

  // Small delay to allow session restoration
  await new Promise(resolve => setTimeout(resolve, 500));

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  console.log("USER =", user);
  console.log("USER ERROR =", userError);

  if (userError) {
    console.log("User fetch failed");
    window.location.href = "admin-login.html";
    return false;
  }

  if (!user) {
    console.log("No user session found");
    window.location.href = "admin-login.html";
    return false;
  }

  // ONLY FETCH ROLE
  const { data, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  console.log("PROFILE DATA =", data);
  console.log("PROFILE ERROR =", error);

  if (error) {
    console.log("Profile query failed");
    window.location.href = "admin-login.html";
    return false;
  }

  if (!data) {
    console.log("No profile found");
    window.location.href = "admin-login.html";
    return false;
  }

  console.log("ROLE =", data.role);

  if (data.role !== "admin") {
    console.log("User is not admin");
    window.location.href = "admin-login.html";
    return false;
  }

  console.log("Admin verified");
  return true;
}

/* REGISTERED USERS PAGE */
function goToUsers() {
  window.location.href = "users.html";
}
window.goToUsers = goToUsers;

/* LOGOUT */
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "admin-login.html";
}
window.logout = logout;

/* FETCH REQUESTS */
async function loadRequests() {
  const { data, error } = await supabase
    .from("request")
    .select("*");

  const container = document.getElementById("requestsContainer");

  if (!container) {
    console.log("Container not found");
    return;
  }

  if (error) {
    console.log("Request error =", error);
    container.innerHTML = "Error loading requests";
    return;
  }

  if (!data || data.length === 0) {
    container.innerHTML = "No requests yet";
    return;
  }

  container.innerHTML = "";

  data.forEach((r) => {
    const card = document.createElement("div");

    card.style.background = "#1e293b";
    card.style.color = "white";
    card.style.padding = "15px";
    card.style.margin = "10px 0";
    card.style.borderRadius = "12px";

    card.innerHTML = `
      <h3>${r.company}</h3>
      <p>📡 ${r.type}</p>
      <p>⚠ ${r.problem}</p>
      <p>📍 ${r.location}</p>
      <p>📞 ${r.phone}</p>
    `;

    container.appendChild(card);
  });
}

/* START */
(async () => {
  const allowed = await checkAdmin();

  if (allowed) {
    loadRequests();
  }
})();

