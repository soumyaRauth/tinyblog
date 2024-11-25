import { useMutation } from "@tanstack/react-query";
import { createNewPost } from "../api";

export const useCreatePost = () => {
  return useMutation({
    mutationFn: (post: { title: string; body: string }) => createNewPost(post),
  });
};
