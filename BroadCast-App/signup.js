
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabase = createClient(
  "https://soisqaeztkbzkyavnbyz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaXNxYWV6dGtiemt5YXZuYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjcwNzUsImV4cCI6MjA5NTY0MzA3NX0.L2mBVBh_xdIHKffx3SdYE_RRNB_Acv3opZJc-gBUsTo"
);

const form = document.getElementById("signupForm");

let loading = false;

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  if (loading) return;

  loading = true;

  const firstName =
    document.getElementById("firstName").value;

  const lastName =
    document.getElementById("lastName").value;

  const email =
    document.getElementById("email").value;

  const age =
    document.getElementById("age").value;

  const password =
    document.getElementById("password").value;

  // CREATE AUTH USER
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password
    });

  if (error) {

    alert("Signup failed: " + error.message);

    loading = false;

    return;
  }

  const user = data.user;

  // CHECK IF PROFILE ALREADY EXISTS
  const { data: existingProfile } =
    await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

  // ONLY INSERT IF PROFILE DOESN'T EXIST
  if (!existingProfile) {

    const { error: profileError } =
      await supabase
        .from("profiles")
        .insert([
          {
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            age: age
          }
        ]);

    if (profileError) {

      alert(
        "Profile save failed: " +
        profileError.message
      );

      loading = false;

      return;
    }
  }

  alert(
    "Signup successful! Please login."
  );

  window.location.href =
    "login.html";

});

