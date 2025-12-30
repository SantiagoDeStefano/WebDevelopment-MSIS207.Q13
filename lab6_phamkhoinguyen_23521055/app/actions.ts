"use server";

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") ?? "");
  // write to DB here
}
