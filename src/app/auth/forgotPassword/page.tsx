"use client";
import { forgotPassword } from "../../../lib/actions/authActions";
import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Navbar from "../../Components/Navbar";
import Whatsapp from "../../Components/Whatsapp";

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email!"),
});

type InputType = z.infer<typeof FormSchema>;

const ForgotPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const submitRequest: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await forgotPassword(data.email);
      if (result) toast.success("Reset password link was sent to your email.");
      reset();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div>
      <Navbar />
      <Whatsapp />
      <div className="bg-black text-white flex flex-col justify-center items-center text-center h-screen">
        <form onSubmit={handleSubmit(submitRequest)}>
          <div className="text-xl font-medium text-white mb-5">
            Enter Your Email
          </div>
          <Input
            label="Email"
            {...register("email")}
            // startContent={<EnvelopeIcon className="w-4" />}
            errorMessage={errors.email?.message}
            className="w-80 md:w-96 h-12 rounded border-neutral-400 my-5"
          />
          <Button
            isLoading={isSubmitting}
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center px-10 my-5 w-80 md:w-96 text-medium font-medium leading-none border-gray-700 border-solid border rounded-full text-white hover:text-gray-700 h-12 hover:bg-white bg-gray-700"
          >
            {isSubmitting ? "Please Wait..." : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
