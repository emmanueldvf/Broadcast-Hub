import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* 🔗 SUPABASE */
const supabase = createClient(
  "https://soisqaeztkbzkyavnbyz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaXNxYWV6dGtiemt5YXZuYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjcwNzUsImV4cCI6MjA5NTY0MzA3NX0.L2mBVBh_xdIHKffx3SdYE_RRNB_Acv3opZJc-gBUsTo"
);

const form = document.getElementById("adminLoginForm");

if (!form) {
  console.log("Form not found");
} else {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    const user = data.user;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.log(profileError);
      alert("Profile error");
      return;
    }

    if (!profile || profile.role !== "admin") {
      alert("Access denied");
      await supabase.auth.signOut();
      return;
    }

    alert("Admin login successful");
    window.location.href = "admin.html";
  });
}