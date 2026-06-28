
import { createClient }
from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl =
  "https://soisqaeztkbzkyavnbyz.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvaXNxYWV6dGtiemt5YXZuYnl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwNjcwNzUsImV4cCI6MjA5NTY0MzA3NX0.L2mBVBh_xdIHKffx3SdYE_RRNB_Acv3opZJc-gBUsTo";

const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );

const form =
  document.getElementById("serviceForm");

form.addEventListener(
  "submit",
  async function(e) {

    e.preventDefault();

    const company =
      document.getElementById("company").value;

    const type =
      document.getElementById("type").value;

    const problem =
      document.getElementById("problem").value;

    const location =
      document.getElementById("location").value;

    const phone =
      document.getElementById("phone").value;

    const { error } =
      await supabase
        .from("request")
        .insert([
          {
            company,
            type,
            problem,
            location,
            phone
          }
        ]);

    if (error) {

      alert("Failed To Send Request");

    } else {

      window.location.href =
        "success.html";

    }

});