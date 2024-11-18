const API_URL =
  process.env.API_URL ??
  (() => {
    throw new Error("API_URL not defined");
  });

export const fetchPosts = async () => {
  console.log("API_URL:");
  console.log(process.env.API_URL);
  try {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
      throw new Error("Response Error");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
