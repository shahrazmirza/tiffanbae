import SignInForm from "../../Components/SignInForm";
import Link from "next/link";
import Navbar from '../../Components/Navbar'
import { Container } from '@radix-ui/themes'
import { FaFacebook } from "react-icons/fa6";
import Image from 'next/image';
import Whatsapp from '../../Components/Whatsapp';

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  console.log({ searchParams });

  return (
    <div className="bg-black text-white">
      <Navbar />
      <Whatsapp />
      <div className="flex items-center h-screen">
        <Container>
          <SignInForm callbackUrl={searchParams.callbackUrl} />
        </Container>
      </div>
    </div>
  );
};

export default SigninPage;
