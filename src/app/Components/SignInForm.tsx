'use client'
import React, { useState } from 'react'
import { FaFacebook } from "react-icons/fa6";
import Link from 'next/link';
import { Button, Input } from '@nextui-org/react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
import { z } from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../../lib/actions/authActions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import NextAuthProviders from './NextAuthProviders';
import { signIn } from "next-auth/react";

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

type InputType = z.infer<typeof FormSchema>;

const SignInForm = (props: Props) => {
  const router = useRouter();
  const [visiblePass, setVisiblePass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("Welcome To Tiffan Bae");
    router.push(props.callbackUrl ? props.callbackUrl : "/Menu");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center items-center text-center pt-10 bg-black"
    >
      <p className='text-4xl font-medium mb-5 text-white'>G'day</p>
      <div className='flex'>
        <p className='text-white'>Sign in to Tiffan Bae or </p>
        <Link href='/auth/signup' className='ml-1 underline text-blue-600'>create an account</Link>
      </div>
      
      <Input 
        label="Email" 
        {...register("email")} 
        errorMessage={errors.email?.message}
        className="w-80 md:w-96 rounded border-neutral-400 my-5" 
      />
      <Input
        label="Password"
        {...register("password")}
        type={visiblePass ? "text" : "password"}
        errorMessage={errors.password?.message}
        className='w-80 md:w-96 rounded border-neutral-400 text-black'
        endContent={
          <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
            {visiblePass ? <EyeSlashIcon className="w-4" /> : <EyeIcon className="w-4" />}
          </button>
        }
      />
        <div className="flex items-center justify-center gap-2">
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            isLoading={isSubmitting}
            className='flex items-center justify-center px-10 my-5 w-80 md:w-96 text-medium font-medium leading-none border-gray-700 border-solid border rounded-full text-white hover:text-gray-700 h-12 hover:bg-white bg-gray-700'
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </div>
      <Link 
        href={"/auth/forgotPassword"}
        className="flex justify-center"
        >Forgot Your Password?
      </Link>
      
      <NextAuthProviders />
      
    </form>
  );
};

export default SignInForm;

//   return (
    
//     <div className='bg-black'>
//         <div className='flex flex-col justify-center items-center text-center pt-10'>
//           <p className='text-4xl font-medium mb-5 text-white'>G'day</p>
//           <div className='flex'>
//             <p className='text-white'>Sign in to Tiffan Bae or </p>
//             <Link href='/auth/signup' className='ml-1 underline text-blue-600'>create an account</Link>
//           </div>
//           <Input
//             label="Email"
//             // {...register("email")}
//             // errorMessage={errors.email?.message}
//             className="w-80 md:w-96 rounded border-neutral-400 my-5"
//           />

//           <Input
//             label="Password"
//             {...register("password")}
//             type={visiblePass ? "text" : "password"}
//             errorMessage={errors.password?.message}
//             className='w-80 md:w-96 rounded border-neutral-400 text-black'
//             endContent={
//               <button type="button" onClick={() => setVisiblePass((prev) => !prev)}>
//                 {visiblePass ? <EyeSlashIcon className="w-4" /> : <EyeIcon className="w-4" />}
//               </button>
//             }
//           />

//           <Button 
//             type="submit"
//             className='flex items-center justify-center px-10 my-5 w-96 text-medium font-medium leading-none border-gray-700 border-solid border rounded-full text-white hover:text-gray-700 h-12 hover:bg-white bg-gray-700'
//             >
//             Submit
//           </Button>

//           {/* <p className='text-white'>or</p>
//           <button 
//             className='flex items-center justify-center px-10 my-5 w-80 text-medium font-medium leading-none border-blue-600 border-solid border rounded-full text-white hover:bg-blue-900 h-12 bg-blue-600'
//             >
//             <div className='flex items-center'>
//               <div className='text-2xl'><FaFacebook /></div>
//               <div className='pl-5'>Continue with Facebook</div>
//             </div>
//           </button>
//           <button 
//             className='flex items-center justify-center px-10 my-5 w-80 text-medium font-medium leading-none border-neutral-400 border-solid border rounded-full text-gray-700 hover:bg-gray-200 h-12 bg-white'
//             >
//             <div className='flex items-center'>
//               <Image
//                 src='/assets/google.png'
//                 width={20}
//                 height={20}
//                 className='pr-0'
//               />
//               <div className='pl-5'>Continue with Google</div>
//             </div>
//           </button> */}
          
//         </div>
//     </div>
//   )
// }

// export default SignInForm