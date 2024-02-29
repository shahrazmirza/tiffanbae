'use client'
import React from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import classNames from 'classnames';
import { CaretDownIcon, Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';


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
    <div>
      <div className='flex justify-between h-10 items-center pt-5 pl-5'>
        <div className=''>
          <Link href='/' className='font-heading2 text-5xl font-bold tracking-wider'>
            TIFFAN BAE
          </Link>
        </div>
        <button className='flex text-sky-700 bg-sky-50 justify-center w-12 h-16 pt-6' onClick={toggleDiv}>
        {showDiv ? <Cross1Icon /> : <HamburgerMenuIcon />}
        </button>
      </div>
        {showDiv && 
        <div className='bg-sky-50 px-4 py-2 mt-5 h-screen'>
        <div className=''>
          <NavigationMenu.Root>
            <NavigationMenu.List className=" list-none">
              
              <NavigationMenu.Item>
                <NavigationMenu.Link
                  className="flex px-5 py-2 font-medium leading-none my-1 hover:text-sky-700" 
                  href="/Pricing">
                  Pricing
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <NavigationMenu.Link
                  className="flex px-5 py-2 font-medium leading-none my-1 hover:text-sky-700" 
                  href="/FAQs">
                  FAQs
                </NavigationMenu.Link>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <Link href="/Contact" className="px-5 m-5 w-fit text-sm font-medium leading-none border-sky-700 border-solid border rounded-full text-sky-700 hover:text-white h-10 hover:bg-sky-700 text-white-100 flex items-center justify-center">Get In Touch</Link>
              </NavigationMenu.Item>
              
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
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