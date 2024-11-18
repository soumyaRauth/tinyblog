import { PostTypeProps } from "@/Components/lib/types";

const API_URL =
  process.env.API_URL ??
  (() => {
    throw new Error("API_URL not defined");
  });

export const fetchPosts = async (): Promise<PostTypeProps[]> => {
  try {
    const response = await fetch(`${API_URL}/posts`);

    if (!response.ok) {
      throw new Error("Response Error");
    }
    const data: PostTypeProps[] = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
