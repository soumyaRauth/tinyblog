import { BackButton } from "@/Components/BackButton/BackButton";
import { AuthorProps, PostTypeProps } from "@/Components/lib/types";
import { fetchPostsByAuthorId } from "@/lib/api";
import { WithServerSideProps } from "@/lib/utils";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";

export default function AuthorDashboard({
  authorPosts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <BackButton href={".."} color="text-green-500" />

      {/* Author Profile */}
      <div className="flex items-center mb-6">
        {/* Default Profile Picture */}
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 12c2.485 0 4.5-2.015 4.5-4.5S14.485 3 12 3 7.5 5.015 7.5 7.5 9.515 12 12 12zm0 2.25c-3.258 0-6 2.364-6 5.25 0 .414.336.75.75.75h10.5a.75.75 0 00.75-.75c0-2.886-2.742-5.25-6-5.25z"
            />
          </svg>
        </div>
        {/* Author Name */}
        <div className="ml-4">
          <h2 className="text-2xl font-bold">{authorPosts.author.name}</h2>
          <p className="text-gray-600">Author</p>
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">
        {authorPosts.author.name}'s Dashboard
      </h1>

      {/* Add New Post Section */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Posts</h2>
        <Link
          href={"/posts/create"}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add New Post
        </Link>
        {/* <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add New Post
        </button> */}
      </div>

      {/* Posts List */}
      <div className="grid grid-cols-1 gap-6">
        {authorPosts.posts.map((post: PostTypeProps) => (
          <>
            {/* Post Card 1 */}
            <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.body}</p>

              {/* Actions */}
              <div className="mt-4 flex space-x-4">
                <button className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                  <PencilSquareIcon className="w-5 h-5" />
                </button>
                <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = WithServerSideProps(
  fetchPostsByAuthorId,
  "authorPosts"
);
