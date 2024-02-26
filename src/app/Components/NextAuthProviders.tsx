import { Button } from "@nextui-org/react";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa6";

const NextAuthProviders = () => {
  const googleSignIn = async () => {
    const result = await signIn("google", {
      callbackUrl: "http://localhost:3000/api/auth/callback/google",
    });
    console.log({ result });
  };
  return (
    <div className="pt-10">
      <Button 
        onClick={googleSignIn}
        className='flex items-center justify-center px-10 w-96 text-medium font-medium leading-none border-blue-600 border-solid border rounded-full text-white hover:bg-blue-900 h-12 bg-blue-600'
      >
        <div className='flex items-center'>
          <div className='text-2xl'><FaFacebook /></div>
          <div className='pl-5'>Continue with Facebook</div>
      </div>
      </Button>
      
      {/* <Button 
        onClick={googleSignIn}
        className='flex items-center justify-center px-10 my-5 w-96 text-medium font-medium leading-none border-neutral-400 border-solid border rounded-full text-gray-700 hover:bg-gray-200 h-12 bg-white'
      >
        <div className='flex items-center'>
          <Image
            src='/assets/google.png'
            width={20}
            height={20}
            className='pr-0'
          />
          <div className='pl-5'>Continue with Google</div>
        </div>
      </Button> */}
    </div>
  );
};

export default NextAuthProviders;