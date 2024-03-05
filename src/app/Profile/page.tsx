import { getServerSession } from "next-auth";
import Image from "next/image";
import Navbar from "../Components/Navbar";
import Scroll_to_top from "../Components/Scroll_to_top";
import Whatsapp from "../Components/Whatsapp";
import { authOptions } from "../../utils/authOptions";


const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <div className='mh-screen'>
      <Navbar />
      <Scroll_to_top />
      <Whatsapp />
      <div className='flex justify-center items-center h-96'>
        <div className='absolute inset-0 overflow-hidden h-96'>
          <Image
            src='/assets/hero5.jpg'
            alt='Hero Image'
            layout='fill'
            objectFit='cover'
          />
        </div>
        <div>
          <p className='font-heading1 text-6xl font-bold capitalize tracking-wider text-white leading-loose animate__animated animate__zoomIn animate__delay-1s z-10'>Profile</p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-20">
        <div className="grid grid-cols-4 gap-5 text-nowrap md:gap-5 justify-center px-10">
          <p>First Name:</p> <p className="col-span-3 px-4">{user?.firstName}</p>
          <p>Last Name:</p> <p className="col-span-3 px-4">{user?.lastName}</p>
          <p>Phone:</p> <p className="col-span-3 px-4">{user?.phone}</p>
          <p>Email:</p> <p className="col-span-3 px-4">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
