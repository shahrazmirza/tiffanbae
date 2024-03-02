import Link from "next/link";
import { activateUser } from "../../../../lib/actions/authActions";
import { verifyJwt } from "../../../../lib/jwt";

interface Props {
  params: {
    jwt: string;
  };
}

const ActivationPage = async ({ params }: Props) => {
  const result = await activateUser(params.jwt);
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center p-5 bg-black">
      {result === "userNotExist" ? (
        <div>
          <p className="text-red-500 text-xl md: text-2xl">Your account does not exist</p>
          <Link href='/auth/signup' className='underline text-white'>Sign up to create an account at Tiffan Bae</Link>
        </div>
      ) : result === "alreadyActivated" ? (
        <div>
          <p className="text-red-500 text-xl md: text-2xl">Your account is already activated</p>
          <Link href='/auth/signin' className='underline text-white'>Sign in to Tiffan Bae</Link>
        </div>
      ) : result === "success" ? (
        <div>
          <p className="text-green-500 text-xl md: text-2xl">
            Congratulations! Your account is now activated
          </p>
          <Link href='/auth/signin' className='underline text-white'>Sign in to Tiffan Bae</Link>
        </div>
      ) : (
        <p className="text-yellow-500 text-xl md: text-2xl">Oops! Something went wrong!</p>
      )}
    </div>
  );
};

export default ActivationPage;