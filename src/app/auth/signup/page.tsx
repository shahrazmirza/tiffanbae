import { Link } from "@nextui-org/react";
import SignUpForm from "../../Components/SignUpForm";
import Navbar from "../../Components/Navbar";
import Whatsapp from "../../Components/Whatsapp";
import { Container } from "@radix-ui/themes";

const SignupPage = () => {
  return (
    <div className="bg-black">
      <Navbar />
      <Whatsapp />
      <Container>
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex justify-center md:place-self-end pt-16 pb-5">
            <p className="text-white">Already a member? </p>
            <Link href="/auth/signin" className="ml-1 underline text-blue-600">
              Sign in
            </Link>
          </div>
          <p className="text-4xl font-medium text-white mb-5">Create Account</p>
          <SignUpForm />
        </div>
      </Container>
    </div>
  );
};

export default SignupPage;
