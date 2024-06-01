"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import CartContext from "../Context/CartContext";
import Image from "next/image";
import { CaretDownIcon } from "@radix-ui/react-icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { MyButton } from "./MyButton";

const SigninButtonToggle = () => {
  const { data: session } = useSession();

  const { cart } = useContext(CartContext);

  const totalQuantity = cart?.cartItems?.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="flex">
      {session && session.user ? (
        <>
          <div className="flex flex-col justify-center items-center -mr-3">
            <Link href="/Cart">
              <p className="px-2 text-orange-400 text-xs z-20 ml-1 mb-4">
                {totalQuantity || 0}
              </p>
            </Link>

            <Link href="/Cart" className="text-xl absolute text-white">
              <Image src="/assets/Cart.png" alt="" width="20" height="20" />
            </Link>
          </div>

          <Dropdown
            showArrow
            radius="sm"
            classNames={{
              base: "before:bg-default-200", // change arrow background
              content: "p-0 border-small border-divider bg-background",
            }}
          >
            <DropdownTrigger>
              <MyButton disableRipple className="text-xs ml-1">
                G'Day
                <p className="font-medium text-xs -mr-2 text-orange-400">
                  {`${session.user.firstName}`}!
                </p>
                <CaretDownIcon />
              </MyButton>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Custom item styles"
              disabledKeys={["profile"]}
              className="p-0"
              itemClasses={{
                base: [
                  "rounded-md",
                  "text-default-500",
                  "transition-opacity",
                  "data-[hover=true]:text-foreground",
                  "data-[hover=true]:bg-default-100",
                  "dark:data-[hover=true]:bg-default-50",
                  "data-[selectable=true]:focus:bg-default-50",
                  "data-[pressed=true]:opacity-70",
                  "data-[focus-visible=true]:ring-default-500",
                ],
              }}
            >
              <DropdownSection aria-label="Profile & Actions" showDivider>
                <DropdownItem
                  isReadOnly
                  key="profile"
                  className="h-14 opacity-100"
                >
                  <User
                    name={`${session.user.firstName} ${session.user.lastName}`}
                    description={`${session.user.email}`}
                    classNames={{
                      name: "text-default-600",
                      description: "text-default-500",
                    }}
                    // avatarProps={{
                    //   size: "sm",
                    //   src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                    // }}
                  />
                </DropdownItem>
                <DropdownItem href="/">Home</DropdownItem>
                <DropdownItem href="/Profile">Profile</DropdownItem>
              </DropdownSection>

              <DropdownSection aria-label="Help & Feedback">
                <DropdownItem href="/Contact">Help & Feedback</DropdownItem>
                <DropdownItem onClick={() => signOut()}>Log Out</DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </>
      ) : (
        <>
          <button
            onClick={() => signIn()}
            className="px-6 text-2xl text-white h-10"
          >
            <FaUserCircle />
          </button>
        </>
      )}
    </div>
  );
};

export default SigninButtonToggle;
