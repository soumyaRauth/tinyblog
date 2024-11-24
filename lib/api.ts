import { AuthorProps, PostTypeProps } from "@/Components/lib/types";
import { z } from "zod";

/**
 * Retrieves the API URL from environment variables.
 * Throws an error if not found.
 */
if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error("API URL is not defined. Check your test .env file.");
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Zod schema for validating an author under each post.
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
 * Zod schema for validating a minimal author post object.
 */
const AuthorPostsSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

/**
 * Zod schema for validating posts and their author as a combined object.
 */
const AuthorPostArraySchema = z.object({
  posts: z.array(AuthorPostsSchema),
  author: AuthorSchema,
});

/**
 * Fetches all posts from the API, attaches author data to each post, and validates the data.
 *
 * @returns {Promise<z.infer<typeof PostArraySchema>>} - An array of validated posts with author data.
 * @throws {Error} - If the API request fails or the data doesn't match the schema.
 */
export const fetchPosts = async (): Promise<
  z.infer<typeof PostArraySchema>
> => {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error("Could not fetch posts from API endpoint");
  }

  const postData: PostTypeProps[] = await response.json();

  const postWithAuthor: PostTypeProps[] = await Promise.all(
    postData.map(async (data: PostTypeProps) => {
      if (!data.userId) {
        throw new Error("No author found");
      }
      const withAuthorData: AuthorProps = await fetAuthorById(
        data.userId.toString()
      );
      return { ...data, author: withAuthorData };
    })
  );

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
    const postResponse = await fetch(`${API_URL}/posts/${id}`);

    if (!postResponse.ok) {
      throw new Error("Could not fetch posts from API endpoint");
    }

    const data: PostTypeProps = await postResponse.json();

    const authorData: AuthorProps = await fetAuthorById(data.userId.toString());

    data["author"] = authorData;

    return data;
  } catch (error) {
    throw new Error(`Error fetching either post or author data: ${error}`);
  }
};

/**
 * Fetches the author data for a given post.
 *
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<z.infer<typeof AuthorSchema>>} - The author data object.
 * @throws {Error} - If the API request for the author fails.
 */
export const fetAuthorById = async (
  userId: string
): Promise<z.infer<typeof AuthorSchema>> => {
  const authorResponse = await fetch(`${API_URL}/users/${userId}`);
  if (!authorResponse.ok) {
    throw new Error("Could not fetch author from API endpoint");
  }

  const authorJson: AuthorProps = await authorResponse.json();
  const validateAuthorData = AuthorSchema.parse(authorJson);
  return validateAuthorData;
};

/**
 * Fetches posts by an author ID, along with the author's data.
 *
 * @param {string} id - The author ID.
 * @returns {Promise<z.infer<typeof AuthorPostArraySchema>>} - An object containing posts and author data.
 * @throws {Error} - If the API request fails or data is invalid.
 */
export const fetchPostsByAuthorId = async (
  id?: string
): Promise<z.infer<typeof AuthorPostArraySchema>> => {
  if (!id) {
    throw new Error("Author Id is missing");
  }

  try {
    const authorData: AuthorProps = await fetAuthorById(id);
    const posts = await fetch(`${API_URL}/users/${id}/posts`);
    const data = await posts.json();

    return {
      posts: data,
      author: authorData,
    };
  } catch (error) {
    console.log(error);
    throw new Error(
      "Error occurred during author post fetching. Check console log for detail"
    );
  }
};

/**
 * Fetches a specified number of recent posts, attaches author data, and validates the result.
 *
 * @param {string} howMany - The number of posts to fetch.
 * @returns {Promise<z.infer<typeof PostArraySchema>>} - An array of recent posts with validated data.
 * @throws {Error} - If the API request fails or data is invalid.
 */
export const fetchRecentPosts = async (
  howMany?: string
): Promise<z.infer<typeof PostArraySchema>> => {
  if (!howMany) {
    throw new Error("How many posts should be fetched is not mentioned");
  }

  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error("Posts response unsuccessful!");
    }
    const postData = await response.json();

    const postWithAuthor: PostTypeProps[] = await Promise.all(
      postData.map(async (data: PostTypeProps) => {
        if (!data.userId) {
          throw new Error("No author found");
        }
        const withAuthorData: AuthorProps = await fetAuthorById(
          data.userId.toString()
        );
        return { ...data, author: withAuthorData };
      })
    );

    const validatedData = PostArraySchema.parse(postWithAuthor);
    const recentData = validatedData.slice(0, Number(howMany));

    return recentData;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch recent posts! Check console log");
  }
};

//-Function to fetch dynamic post search filter
//-input type, output type, exception cases, error handling

export const fetchSearchQueryData = async <T>(query: T) => {
  const response = await fetch(`${API_URL}/posts?title_like=${query}`);

  if (!response.ok) {
    throw new Error("Could not fetch posts from API endpoint");
  }

  const postData: PostTypeProps[] = await response.json();

  const postWithAuthor: PostTypeProps[] = await Promise.all(
    postData.map(async (data: PostTypeProps) => {
      if (!data.userId) {
        throw new Error("No author found");
      }
      const withAuthorData: AuthorProps = await fetAuthorById(
        data.userId.toString()
      );
      return { ...data, author: withAuthorData };
    })
  );

  const validatedData = PostArraySchema.parse(postWithAuthor);

  return {
    data: validatedData,
    revalidateAt: 60,
  };
};
