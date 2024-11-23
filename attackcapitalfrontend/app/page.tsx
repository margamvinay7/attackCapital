"use client";
import API from "@/utils/api";

interface Post {
  _id: string;
  title: string;
  content: string;
  authorId: {
    _id: string;
    email: string;
  };
}

export default async function Home() {
  const posts: Post[] = await getPosts();
  return (
    <div className="font-serif p-5">
      <div className="text-black text-3xl  border-b-2 border-purple-900  w-full font-bold flex justify-center my-4">
        Blog Posts
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

// Fetch data server-side rendering
async function getPosts() {
  try {
    const res = await API.get("/post/posts");
    const posts = res?.data || [];

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}
