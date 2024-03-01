'use client'
import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon, Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import SigninButtonToggle from './SigninButtonToggle';


function Togglemenu() {
  const [items, setItems] = useState([]);

  // useEffect(() => {
  //     console.log('', data);

  //     if (data && data.length > 0) {
  //         setItems(data);
  //     } else {
  //         console.error('');
  //     }
  // }, []);
  
  const [showDiv, setShowDiv] = useState(false);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  return (
    <div className='z-20 w-screen'>
      <div className='flex justify-between items-center px-5 py-3 h-16'>
        <div>
          <Link href='/' className='font-heading2 text-2xl font-bold tracking-wider text-white'>
            TIFFAN BAE
          </Link>
        </div>
        
        <div className='flex'>
          <SigninButtonToggle />

          <button className='text-white bg-none' onClick={toggleDiv}>
          {showDiv ? <Cross1Icon /> : <HamburgerMenuIcon />}
          </button>
        </div>
        
      </div>
        {showDiv && 
      <div>
        <NavigationMenu.Root>
          <NavigationMenu.List className=" list-none">
            <div className='flex flex-col justify-center items-center -py-16 gap-y-20 h-screen w-screen bg-black text-white'>
              <NavigationMenu.Item>
                <NavigationMenu.Link
                  className="text-xl font-medium hover:text-gray-500" 
                  href="/">
                  HOME
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link
                  className="text-xl font-medium hover:text-gray-500" 
                  href="/Menu">
                  MENU
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link
                  className="text-xl font-medium hover:text-gray-500" 
                  href="/Contact">
                  CONTACT
                </NavigationMenu.Link>
              </NavigationMenu.Item>
            </div>
            

          </NavigationMenu.List>
        </NavigationMenu.Root>
        
      </div>
      }
    </div>
  );
}

const ListItem = React.forwardRef(({ className, children, title, ...props }, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <a
        className={classNames(
          'block p-3 pl-5',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        <div className="font-medium">{title}</div>
        <p>{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
));

export default Togglemenu;
