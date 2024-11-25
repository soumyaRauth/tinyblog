import { BackButton } from "@/Components/BackButton/BackButton";
import Header from "@/Components/Header/Header";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewPost } from "@/lib/api";
import { useCreatePost } from "@/lib/hooks/useCreatePosts";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();

  const createPost = useCreatePost();

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !body) {
      alert("No title or body");
    }

    //-Actual mutation
    createPost.mutate(
      { title, body },
      {
        onSettled: () => {
          createPost.reset;
        },
      }
    );
  };

  return (
    <>
      <Header title="Tiny Blog" caseName="title" />
      <div className="container mx-auto p-6">
        <BackButton href={".."} color="text-purple-500" />
        <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
        {createPost.isIdle && <h1>idle....</h1>}
        {createPost.isPending && <h1>pending....</h1>}
        {createPost.isSuccess && <h1>Success!!</h1>}
        {/* Form */}
        <form onSubmit={handleCreatePost} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Body</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter post content"
              className="border p-2 rounded w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            //   disabled={isLoading}
          >
            {/* {isLoading ? "Creating..." : "Create Post"} */}
            {"Create Post"}
          </button>
        </form>

        {/* Feedback */}
        {/* {isError && <p className="text-red-500 mt-2">Error: {error.message}</p>}
          {isSuccess && <p className="text-green-500 mt-2">Post created successfully!</p>} */}
      </div>
    </>
  );
};

export default CreatePost;
