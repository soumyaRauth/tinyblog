import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/Components/ui/card";
import { PostTypeProps } from "../lib/types";
import Link from "next/link";

type PostListProps = {
  posts: PostTypeProps[];
};

export const PostList = ({ posts }: PostListProps) => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6">{post.body}</p>
              <p className="mb-6">{post.author.name}</p>
              <div className="text-right">
                <Link
                  href={`/posts/${post.id}`}
                  className="text-blue-500 hover:text-blue-700 font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
