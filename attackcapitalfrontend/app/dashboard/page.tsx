"use client";
import { useEffect, useState } from "react";
import API from "@/utils/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: {
    _id: string;
    email: string;
  };
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts only on the client-side
  useEffect(() => {
    const getPosts = async () => {
      try {
        // Ensure this runs only on the client-side
        if (typeof window !== "undefined") {
          const user: any = localStorage.getItem("user");

          if (user) {
            const parsedUser = JSON.parse(user);
            setUser(parsedUser);
            const res = await API.get(`/post/posts?author=${parsedUser.id}`);
            setPosts(res?.data || []);
          }
        }
      } catch (error) {
        setError("Error fetching posts");
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []); // Empty dependency array means this effect runs only once after the first render

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="font-serif p-5">
      <div className="text-black items-center gap-x-5  border-b-2 border-purple-900  w-full  flex justify-around my-4 p-4">
        <div className="flex items-center gap-x-2">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback></AvatarFallback>
          </Avatar>
          <div>{user?.email}</div>
        </div>
        <div className=" font-bold text-3xl ">Your Posts</div>
        <Button>
          <Link href="/createPost">Create Post</Link>
        </Button>
      </div>

      <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts?.map((post: Post) => (
          <li
            key={post.authorId._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex flex-col space-y-2">
              <h2 className="text-xl font-semibold text-gray-800">
                {post.title}
              </h2>
              <p className="text-gray-600">{post.content}</p>
              <div className="text-sm text-gray-500">
                Author: {post.authorId.email}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
