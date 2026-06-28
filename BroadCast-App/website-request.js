
import { createClient }
from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

/* 🔗 SUPABASE */

const supabaseUrl =
"https://soisqaeztkbzkyavnbyz.supabase.co";

const supabaseKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaXNxYWV6dGtiemt5YXZuYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjcwNzUsImV4cCI6MjA5NTY0MzA3NX0.L2mBVBh_xdIHKffx3SdYE_RRNB_Acv3opZJc-gBUsTo";

const supabase =
createClient(supabaseUrl, supabaseKey);

/* 📄 FORM */

const form =
document.getElementById("websiteForm");

/* 🚀 SUBMIT WEBSITE REQUEST */

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  /* 📥 INPUT VALUES */

  const website_name =
    document.getElementById("website_name").value;

  const owner_email =
    document.getElementById("owner_email").value;

  const description =
    document.getElementById("description").value;

  /* 💾 SAVE TO SUPABASE */

  const { data, error } =
    await supabase
      .from("website_requests")
      .insert([
        {
          website_name,
          owner_email,
          description
        }
      ]);

  /* ❌ ERROR */

  if (error) {

    console.log(error);

    alert("Failed to submit request");

    return;
  }

  /* ✅ SUCCESS */

  alert("Website request submitted successfully");

  console.log(data);

  form.reset();
});

