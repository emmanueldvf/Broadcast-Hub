import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://soisqaeztkbzkyavnbyz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaXNxYWV6dGtiemt5YXZuYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjcwNzUsImV4cCI6MjA5NTY0MzA3NX0.L2mBVBh_xdIHKffx3SdYE_RRNB_Acv3opZJc-gBUsTo"
);

async function checkUser() {

  const { data: { user }, error } =
    await supabase.auth.getUser();

  if (error || !user) {
    window.location.href = "login.html";
    return;
  }

  const { data, error: profileError } =
    await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

  if (profileError) {
    console.log(profileError);
    return;
  }

  /* 🚫 NOT ADMIN */
  if (data.role !== "admin") {

    window.location.href = "index.html";
    return;
  }
}

checkUser();

/* 👥 LOAD USERS */
async function loadUsers() {

  const { data, error } = await supabase
    .from("profiles")   // your table name
    .select("*");

  const container = document.getElementById("usersContainer");

  if (!container) return;

  if (error) {
    container.innerHTML = "Error loading users";
    console.log(error);
    return;
  }

  container.innerHTML = "";

  data.forEach(user => {

    const fullName =
      (user.first_name || "") + " " + (user.last_name || "");

    container.innerHTML += `
      <div class="user-card">

        <h3>${fullName}</h3>

        <p>🎂 Age: ${user.age}</p>

        <p>🛡 Admin: ${user.is_admin}</p>

        <p>Status: ${user.is_blocked ? "Blocked" : "Active"}</p>

      </div>
    `;
  });
}

loadUsers();