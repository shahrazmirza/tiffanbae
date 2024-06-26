"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
// import { passwordStrength } from "check-password-strength";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
// import PasswordStrength from "./PasswordStrength";
import { resetPassword } from "../../lib/actions/authActions";
import { toast } from "react-toastify";

interface Props {
  jwtUserId: string;
}

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters!")
      .max(52, "Password must be less than 52 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match!",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

const ResetPasswordForm = ({ jwtUserId }: Props) => {
  const [visiblePass, setVisiblePass] = useState(false);
  const [passStrength, setPassStrength] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  // useEffect(() => {
  //   setPassStrength(passwordStrength(watch().password).id);
  // }, [watch().password]);

  const resetPass: SubmitHandler<InputType> = async (data) => {
    try {
      const result = await resetPassword(jwtUserId, data.password);
      if (result === "success")
        toast.success("Your password has been reset successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };
  return (
    <div className="bg-black text-white flex flex-col justify-center items-center text-center h-screen">
      <form onSubmit={handleSubmit(resetPass)}>
        <div className="text-xl font-medium text-white mb-5">
          Reset Your Password
        </div>
        <Input
          type={visiblePass ? "text" : "password"}
          label="Password"
          {...register("password")}
          errorMessage={errors.password?.message}
          className="w-80 md:w-96 h-12 rounded border-neutral-400 my-5"
          endContent={
            <button
              type="button"
              onClick={() => setVisiblePass((prev) => !prev)}
            >
              {visiblePass ? (
                <EyeSlashIcon className="w-4" />
              ) : (
                <EyeIcon className="w-4" />
              )}
            </button>
          }
        />
        {/* <PasswordStrength passStrength={passStrength} /> */}
        <Input
          type={visiblePass ? "text" : "password"}
          label="Confirm Password"
          {...register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
          className="w-80 md:w-96 h-12 rounded border-neutral-400 my-5"
        />
        <div className="flex justify-center">
          <Button
            isLoading={isSubmitting}
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center px-10 w-80 md:w-96 text-medium font-medium leading-none border-gray-700 border-solid border rounded-full text-white hover:text-gray-700 h-12 hover:bg-white bg-gray-700"
          >
            {isSubmitting ? "Please Wait..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
