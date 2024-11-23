"use client";
import { useForm } from "react-hook-form";
import { postSchema, postType } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import API from "@/utils/api";

import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreatePost() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<postType>({
    resolver: zodResolver(postSchema),
  });

  const onSubmit = async (data: postType) => {
    console.log(data);

    try {
      const res = await API.post("/post/post", data);
      console.log("response", res?.data);

      router.push("/dashboard");
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="fixed inset-0 font-serif bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-500 w-3/4 sm:w-2/4 lg:w-1/3">
        <h1 className="text-center text-xl font-medium border-b border-purple-800 pb-2 mb-5">
          Create Post
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div>
            <Label>Title</Label>
            <Input
              {...register("title")}
              className="w-full"
              placeholder="Title"
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div>
            <Label>Content</Label>
            <Textarea
              {...register("content")}
              className="w-full"
              placeholder="Content"
            />
            {errors.content && <p>{errors.content.message}</p>}
          </div>

          <div className="flex justify-between">
            <Button variant="outline" className="bg-gray-700 text-white">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button
              variant="outline"
              type="submit"
              className="bg-purple-900 text-white"
            >
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
