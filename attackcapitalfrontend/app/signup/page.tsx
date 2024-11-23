"use client";
import { useForm } from "react-hook-form";
import { authSchema, authType } from "@/utils/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/utils/api";

export default function SignUp() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<authType>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: authType) => {
    console.log(data);

    try {
      const res = await API.post("/auth/signup", data);
      console.log("response", res);
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <div className="fixed inset-0 font-serif bg-black bg-opacity-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-500 w-3/4 sm:w-2/4 lg:w-1/3">
        <h1 className="text-center text-xl font-medium border-b border-purple-800 pb-2 mb-5">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-2"
        >
          <div>
            <Label>Email</Label>
            <Input
              {...register("email")}
              className="w-full"
              placeholder="Email"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              {...register("password")}
              className="w-full"
              placeholder="Password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>

          <div className="flex flex-col items-center gap-y-2 mt-1">
            <Button
              variant="outline"
              type="submit"
              className="bg-purple-900 text-white w-full"
            >
              Sign Up
            </Button>
            <div>
              Already have an account ?{" "}
              <Link href="/login" className="text-blue-600 underline">
                Log In
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}