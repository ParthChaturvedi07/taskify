"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server"

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  // Basic validation
  if (!name || !email || !subject || !message) {
    return {
      success: false,
      message: "Please fill in all fields.",
    };
  }

  // Length validation
  if (name.length > 100) {
    return {
      success: false,
      message: "Name is too long.",
    };
  }

  if (email.length > 320) {
    return {
      success: false,
      message: "Email is too long.",
    };
  }

  if (message.length > 5000) {
    return {
      success: false,
      message: "Message is too long.",
    };
  }

  const supabase = createSupabaseServerClient();

  const { error } = await supabase
    .from("contact_messages")
    .insert({
      name,
      email,
      subject,
      message,
    });

  if (error) {
    console.error("Supabase error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }

  return {
    success: true,
    message: "Message sent successfully!",
  };
}