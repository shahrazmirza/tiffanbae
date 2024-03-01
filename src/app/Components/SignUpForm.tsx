"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../lib/actions/authActions";
import { toast } from "react-toastify";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(45, "First name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    lastName: z
      .string()
      .min(2, "Last name must be atleast 2 characters")
      .max(45, "Last name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special character allowed!"),
    email: z
      .string()
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter a valid phone number!"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters ")
      .max(50, "Password must be less than 50 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password doesn't match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const toggleVisiblePass = () => setIsVisiblePass((prev) => !prev);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    const { confirmPassword, ...user } = data;
    try {
      const result = await registerUser(user);
      toast.success("The User Registered Successfully.");
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className="flex flex-col gap-6 w-80 md:w-96"
    >
      <div className="flex gap-6 w-80 md:w-96">
        <Input
          errorMessage={errors.firstName?.message}
          isInvalid={!!errors.firstName}
          {...register("firstName")}
          label="First Name"
          className="w-80 md:w-96 h-12 rounded border-neutral-400"
        />
        <Input
          errorMessage={errors.lastName?.message}
          isInvalid={!!errors.lastName}
          {...register("lastName")}
          label="Last Name"
          className="w-80 md:w-96 h-12 rounded border-neutral-400"
        />
      </div>
      <Input
        errorMessage={errors.email?.message}
        isInvalid={!!errors.email}
        {...register("email")}
        label="Email"
        className="w-80 md:w-96 h-12 rounded border-neutral-400"
      />{" "}
      <Input
        errorMessage={errors.phone?.message}
        isInvalid={!!errors.phone}
        {...register("phone")}
        label="Phone"
        className="w-80 md:w-96 h-12 rounded border-neutral-400"
      />{" "}
      <Input
        errorMessage={errors.password?.message}
        isInvalid={!!errors.password}
        {...register("password")}
        label="Password"
        type={isVisiblePass ? "text" : "password"}
        className="w-80 md:w-96 h-12 rounded border-neutral-400"
        endContent={
          isVisiblePass ? (
            <EyeSlashIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisiblePass}
            />
          ) : (
            <EyeIcon
              className="w-4 cursor-pointer"
              onClick={toggleVisiblePass}
            />
          )
        }
      />
      <Input
        errorMessage={errors.confirmPassword?.message}
        isInvalid={!!errors.confirmPassword}
        {...register("confirmPassword")}
        label="Confirm Password"
        type={isVisiblePass ? "text" : "password"}
        className="w-80 md:w-96 h-12 rounded border-neutral-400"
      />
      <div className="flex justify-center">
        <Button className="flex items-center justify-center px-10  w-80 md:w-96 text-medium font-medium leading-none border-gray-700 border-solid border rounded-full text-white hover:text-gray-700 h-12 hover:bg-white bg-gray-700" type="submit">
        Submit
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;