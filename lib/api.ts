import { AuthorProps, PostTypeProps } from "@/Components/lib/types";
import { z } from "zod";

/**
 * Retrieves the API URL from environment variables.
 * Throws an error if not found.
 */
const API_URL =
  process.env.API_URL ??
  (() => {
    throw new Error("API URL NOT FOUND");
  })();

/**
 * Zod schema for validating a author under each post.
 */
const AuthorSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
});
/**
 * Zod schema for validating a single post.
 */
const PostSchema = z.object({
  id: z.number(),
  author: AuthorSchema,
  userId: z.number(),
  title: z.string(),
  description: z.string().optional(),
  body: z.string(),
});

/**
 * Zod schema for validating an array of posts.
 */
const PostArraySchema = z.array(PostSchema);

/**
 * Fetches all posts from the API, attaches author data to each post, and validates the data.
 *
 * @returns {Promise<z.infer<typeof PostArraySchema>>} - An array of validated posts with author data.
 * @throws {Error} - If the API request fails or the data doesn't match the schema.
 */
export const fetchPosts = async (): Promise<
  z.infer<typeof PostArraySchema>
> => {
  // Fetch all posts from the API
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("Could not fetch posts from API endpoint");
  }

  // Parse response as an array of PostTypeProps
  const postData: PostTypeProps[] = await response.json();

  // Fetch author data for each post in parallel and attach it
  const postWithAuthor: PostTypeProps[] = await Promise.all(
    postData.map(async (data: PostTypeProps) => {
      const withAuthorData: AuthorProps = await fetAuthorById(data);
      return { ...data, author: withAuthorData }; // Combine post and author data
    })
  );

  // Validate the combined data using Zod schema
  const validatedData = PostArraySchema.parse(postWithAuthor);

  return validatedData;
};

/**
 * Fetches a specific post by ID, attaches author data, and returns the enriched post.
 *
 * @param {string} id - The ID of the post to fetch.
 * @returns {Promise<PostTypeProps>} - A validated post object with author data.
 * @throws {Error} - If the ID is missing or the API request fails.
 */
export const fetchPostsById = async (id?: string): Promise<PostTypeProps> => {
  if (!id) {
    throw new Error("Post ID is required");
  }

  try {
    // Fetch post data by ID
    const postResponse = await fetch(`${API_URL}/posts/${id}`);

    if (!postResponse.ok) {
      throw new Error("Could not fetch posts from API endpoint");
    }

    const data: PostTypeProps = await postResponse.json();

    // Fetch and attach author data to the post
    const authorData = await fetAuthorById(data);
    data["author"] = authorData;

    return data;
  } catch (error) {
    throw new Error(`Error fetching either post or author data: ${error}`);
  }
};

/**
 * Fetches the author data for a given post.
 *
 * @param {PostTypeProps} data - The post data, which includes the userId.
 * @returns {Promise<AuthorProps>} - The author data object.
 * @throws {Error} - If the API request for the author fails.
 */
const fetAuthorById = async (data: PostTypeProps): Promise<AuthorProps> => {
  const authorResponse = await fetch(`${API_URL}/users/${data.userId}`);
  if (!authorResponse.ok) {
    throw new Error("Could not fetch author from API endpoint");
  }

  const authorJson = await authorResponse.json();
  return authorJson;
};
