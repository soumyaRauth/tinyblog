import { createNewPost } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const queryClient = useQueryClient();
  //-use mutation implementation
  const createAPostMutation = useMutation({
    mutationFn: (post: { title: string; body: string }) => createNewPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["searchedPosts"] });
      queryClient.refetchQueries({ queryKey: ["searchedPosts"] });
      console.log("successfully created and about to invalidate query");
    },
    onError: () => console.log("Error found"),
  });

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !body) {
      alert("No title or body");
    }
    createAPostMutation.mutate({ title, body });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>

      {/* Form */}
      <form onSubmit={handleSubmitPost} className="space-y-4">
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
  );
};

export default CreatePost;
