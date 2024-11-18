import { PostTypeProps } from "@/Components/lib/types";
import { z } from "zod";

const API_URL =
  process.env.API_URL ??
  (() => {
    throw new Error("API URL NOT FOUND ");
  });

const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().optional(),
  body: z.string(),
});

const PostArraySchema = z.array(PostSchema);

export const fetchPosts = async (): Promise<
  z.infer<typeof PostArraySchema>
> => {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("Could not fetch posts from api endpoint");
  }
  const data = await response.json();
  //!special note: This value (data, which is of type PostTypeProps[]) is wrapped in a promise and returned. Any async function automatically returns a Promise
  const validatedData = PostArraySchema.parse(data);
  return validatedData;
};

export const fetchPostsById = async (id?: string): Promise<PostTypeProps> => {
  const response = await fetch(`${API_URL}/posts/${id}`);

  if (!response.ok) {
    throw new Error("Could not fetch posts from api endpoint");
  }
  const data: PostTypeProps = await response.json();
  return data;
};
