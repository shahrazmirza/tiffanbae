"use client";

import { useSession, signOut } from "next-auth/react";

function SignOutPage() {
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="bg-black text-white flex flex-col justify-center items-center text-center h-screen">
      {session ? (
        <>
          <div className="text-xl font-medium text-white mb-5">
            Are you sure you want to sign out?
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center px-10 my-5 w-80 text-medium font-medium leading-none border-gray-700 border-solid border rounded-full text-white hover:text-gray-700 h-12 hover:bg-white bg-gray-700"
          >
            Sign out
          </button>
        </>
      ) : (
        <p>You are not signed in.</p>
      )}
    </div>
  );
}

export default SignOutPage;
