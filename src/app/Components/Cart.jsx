"use client";
import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/CartContext";
import Link from "next/link";
import { Section } from "@radix-ui/themes";
import { BsTrash3 } from "react-icons/bs";
import { RadioGroup, Radio, Input, Textarea } from "@nextui-org/react";
import Select from "react-select";
import data from "../Data/DeliveryLocations.json";
import { toast } from "react-toastify";
import axios from "axios";

const Cart = () => {
  const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);

  const increaseQty = (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty > Number(cartItem)) return;

    addItemToCart(item);
  };

  const decreaseQty = (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };

    if (newQty <= 0) return;

    addItemToCart(item);
  };

  const totalAmount = Number(
    cart?.cartItems?.reduce((acc, item) => acc + item.quantity * item.price, 0)
  );

  const [selectedMethod, setSelectedMethod] = useState("");

  const [allowedSuburbs, setAllowedSuburbs] = useState([]);

  useEffect(() => {
    console.log("", data);

    if (data && data.length > 0) {
      setAllowedSuburbs(data);
    } else {
      console.error("");
    }
  }, []);

  const [selectedSuburb, setSelectedSuburb] = useState(null);

  const handleSuburbChange = (option) => {
    setSelectedSuburb(option);
  };

  const handleCheckout = async () => {
    if (!selectedMethod) {
      return toast.error("Please select a method");
    } else if (selectedMethod.toLowerCase() === "delivery" && !selectedSuburb) {
      return toast.error("Please choose your delivery suburb");
    } else {
      try {
        const response = await axios.post("api/checkout_sessions", {
          cartItem: cart.cartItems,
          selectedMethod: selectedMethod,
        });
        console.log(response);
        window.location = response.data.sessionURL;
      } catch (error) {
        console.error("Error creating checkout session:", error);
      }
    }
  };

  return (
    <div>
      <section className="py-5 sm:py-7 bg-gray-200">
        <div className="container max-w-screen-xl mx-auto px-5">
          <h2 className="text-3xl font-semibold">
            {cart?.cartItems?.length || 0} Item(s) in Cart
          </h2>
        </div>
      </section>
      <Section>
        {cart?.cartItems?.length > 0 && (
          <section>
            <div className="container max-w-screen-xl mx-auto px-5">
              <div className="flex flex-col md:flex-row gap-10">
                <main className="md:w-4/6">
                  <article className="border border-gray-200 bg-white shadow-sm rounded p-5">
                    {cart?.cartItems?.map((cartItem) => (
                      <div>
                        <div className="flex flex-wrap lg:flex-row gap-5 place-items-center">
                          <div className="w-full lg:w-2/5 xl:w-2/4">
                            <div className="flex leading-5">
                              {/* <figure className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                              <img src={cartItem.image} alt={cartItem.name} />
                            </figure> */}
                              <div className="capitalize">
                                <p>{cartItem.name}</p>
                              </div>
                            </div>
                            <p className="ml-3 text-sm italic text-neutral-600 pt-1">
                              {cartItem.size}
                            </p>
                          </div>
                          <div className="w-24">
                            <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                              <button
                                data-action="decrement"
                                className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                                onClick={() => decreaseQty(cartItem)}
                              >
                                <span className="m-auto text-2xl font-thin">
                                  −
                                </span>
                              </button>
                              <input
                                type=""
                                className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900 custom-input-number"
                                name="custom-input-number"
                                value={cartItem.quantity}
                                readOnly
                              ></input>
                              <button
                                data-action="increment"
                                className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                                onClick={() => increaseQty(cartItem)}
                              >
                                <span className="m-auto text-2xl font-thin">
                                  +
                                </span>
                              </button>
                            </div>
                          </div>
                          <div>
                            <div className="leading-5 flex align-items">
                              <small className="text-gray-600">
                                {" "}
                                ${cartItem.price.toFixed(2)} / per item{" "}
                              </small>
                            </div>
                          </div>
                          <div className="flex-auto">
                            <div className="float-right">
                              <a
                                className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                                onClick={() =>
                                  deleteItemFromCart({
                                    name: cartItem?.name,
                                    size: cartItem?.size,
                                  })
                                }
                              >
                                <BsTrash3 />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </article>
                </main>
                <aside className="md:w-2/6">
                  <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-5">
                    <ul className="mb-5">
                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>Total Units:</span>
                        <span className="text-orange-600">
                          {cart?.cartItems?.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                          )}{" "}
                          (Units)
                        </span>
                      </li>

                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>Total Units Price:</span>
                        <span>${totalAmount.toFixed(2)}</span>
                      </li>

                      {selectedMethod === "delivery" && (
                        <li className="flex justify-between text-gray-600  mb-1">
                          <span>Delivery Fee:</span>
                          <span className="text-gray-600">$10.00</span>
                        </li>
                      )}
                      {selectedMethod === "delivery" ? (
                        <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                          <span>Total Price:</span>
                          <span>${(totalAmount + 10).toFixed(2)}</span>
                        </li>
                      ) : (
                        <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                          <span>Total Price:</span>
                          <span>${totalAmount.toFixed(2)}</span>
                        </li>
                      )}
                    </ul>

                    <RadioGroup label="Select a method" className="py-5">
                      <Radio
                        value="pickup"
                        onChange={() => setSelectedMethod("pickup")}
                      >
                        Pickup
                      </Radio>
                      <Radio
                        value="delivery"
                        onChange={() => setSelectedMethod("delivery")}
                      >
                        Delivery
                      </Radio>
                    </RadioGroup>

                    {selectedMethod === "pickup" && (
                      <Textarea
                        isDisabled
                        label="Pickup Address:"
                        labelPlacement="outside"
                        placeholder="Enter your description"
                        defaultValue="56 Valencia Blvd Doreen VIC 3754"
                        className="max-w-xs py-5"
                      />
                    )}

                    {selectedMethod === "delivery" && (
                      <div className="mb-4">
                        <label
                          htmlFor="deliverySuburb"
                          className="text-gray-6005"
                        >
                          Choose your delivery suburb:
                        </label>
                        <Select
                          id="deliverySuburb"
                          options={allowedSuburbs.map((suburb) => ({
                            value: suburb.id,
                            label: suburb.name,
                          }))}
                          onChange={handleSuburbChange}
                          isClearable
                          className="py-5 z-20"
                        />
                      </div>
                    )}

                    <button
                      onClick={handleCheckout}
                      id="process-payment-btn"
                      className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-white bg-orange-600 shadow-sm border border-orange-600 rounded-md"
                    >
                      Checkout
                    </button>

                    <Link
                      href="/Menu"
                      className="px-4 py-3 mt-3 inline-block text-lg w-full text-center font-medium text-orange-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                    >
                      Back to shop
                    </Link>
                  </article>
                </aside>
              </div>
            </div>
          </section>
        )}
      </Section>
    </div>
  );
};

export default Cart;

// 'use client'
// import React, { useContext, useEffect, useState } from 'react';
// import CartContext from '../Context/CartContext';
// import Link from 'next/link';
// import { Section } from '@radix-ui/themes';
// import { BsTrash3 } from 'react-icons/bs';
// import { RadioGroup, Radio, Input, Textarea } from "@nextui-org/react";
// import Select from 'react-select';
// import data from '../Data/DeliveryLocations.json';
// import { toast } from 'react-toastify';
// import axios from "axios";

// const Cart = () => {
//   const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);

//   const increaseQty = (cartItem) => {
//     const newQty = cartItem?.quantity + 1;
//     const item = { ...cartItem, quantity: newQty };

//     if (newQty > Number(cartItem)) return;

//     addItemToCart(item);
//   };

//   const decreaseQty = (cartItem) => {
//     const newQty = cartItem?.quantity - 1;
//     const item = { ...cartItem, quantity: newQty };

//     if (newQty <= 0) return;

//     addItemToCart(item);
//   };

//   const totalAmount = Number(
//     cart?.cartItems?.reduce(
//       (acc, item) => acc + item.quantity * item.price,
//       0
//     ),
//   );

//   const [selectedMethod, setSelectedMethod] = useState("");

//   const [allowedSuburbs, setAllowedSuburbs] = useState([]);

//   const [deliveryAddress, setDeliveryAddress] = useState("");

//   useEffect(() => {
//     console.log('', data);

//     if (data && data.length > 0) {
//       setAllowedSuburbs(data);
//     } else {
//       console.error('');
//     }
//   }, []);

//   const [selectedSuburb, setSelectedSuburb] = useState(null);

//   const handleSuburbChange = (option) => {
//     setSelectedSuburb(option);
//   };

//   const handleDeliveryAddressChange = (event) => {
//     setDeliveryAddress(event.target.value);
//   };

//   const handleCheckout = async () => {
//     if (!selectedMethod) {
//       return toast.error("Please select a method");
//     } else if (
//       selectedMethod.toLowerCase() === "delivery" &&
//       !selectedSuburb
//     ) {
//       return toast.error("Please choose your delivery suburb");
//     } else if (
//       selectedMethod.toLowerCase() === "delivery" &&
//       selectedSuburb &&
//       !deliveryAddress
//     ) {
//       return toast.error("Please enter your delivery address");
//     } else {

//       try {
//         const response = await axios.post(
//           'api/checkout_sessions',
//           { cartItem: cart.cartItems, selectedMethod: selectedMethod }
//         );
//         console.log(response);
//         window.location = response.data.sessionURL;
//       } catch (error) {
//         console.error("Error creating checkout session:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <section className="py-5 sm:py-7 bg-gray-200">
//         <div className="container max-w-screen-xl mx-auto px-5">
//           <h2 className="text-3xl font-semibold">
//             {cart?.cartItems?.length || 0} Item(s) in Cart
//           </h2>
//         </div>
//       </section>
//     <Section>
//       {cart?.cartItems?.length > 0 && (
//         <section>
//           <div className="container max-w-screen-xl mx-auto px-5">
//             <div className="flex flex-col md:flex-row gap-10">
//               <main className="md:w-4/6">
//                 <article className="border border-gray-200 bg-white shadow-sm rounded p-5">
//                   {cart?.cartItems?.map((cartItem) => (
//                     <div>
//                       <div className="flex flex-wrap lg:flex-row gap-5 place-items-center">
//                         <div className="w-full lg:w-2/5 xl:w-2/4">
//                           <div className="flex leading-5">
//                             {/* <figure className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
//                               <img src={cartItem.image} alt={cartItem.name} />
//                             </figure> */}
//                             <div className="capitalize">
//                               <p>{cartItem.name}</p>
//                             </div>
//                           </div>
//                           <p className='ml-3 text-sm italic text-neutral-600 pt-1'>{cartItem.size}</p>
//                         </div>
//                         <div className="w-24">
//                           <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
//                             <button
//                               data-action="decrement"
//                               className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
//                               onClick={() => decreaseQty(cartItem)}
//                             >
//                               <span className="m-auto text-2xl font-thin">
//                                 −
//                               </span>
//                             </button>
//                             <input
//                               type=""
//                               className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900 custom-input-number"
//                               name="custom-input-number"
//                               value={cartItem.quantity}
//                               readOnly
//                             ></input>
//                             <button
//                               data-action="increment"
//                               className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
//                               onClick={() => increaseQty(cartItem)}
//                             >
//                               <span className="m-auto text-2xl font-thin">
//                                 +
//                               </span>
//                             </button>
//                           </div>
//                         </div>
//                         <div>
//                           <div className="leading-5 flex align-items">
//                             <small className="text-gray-600">
//                               {" "}
//                               ${cartItem.price.toFixed(2)} / per item{" "}
//                             </small>
//                           </div>
//                         </div>
//                         <div className="flex-auto">
//                           <div className="float-right">
//                             <a
//                               className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
//                               onClick={() =>
//                                 deleteItemFromCart({ name: cartItem?.name, size: cartItem?.size })
//                               }
//                             >
//                               <BsTrash3 />
//                             </a>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </article>
//               </main>
//               <aside className="md:w-2/6">
//                 <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-5">
//                   <ul className="mb-5">
//                     <li className="flex justify-between text-gray-600  mb-1">
//                       <span>Total Units:</span>
//                       <span className="text-orange-600">
//                         {cart?.cartItems?.reduce(
//                           (acc, item) => acc + item.quantity,
//                           0
//                         )}{" "}
//                         (Units)
//                       </span>
//                     </li>

//                     <li className="flex justify-between text-gray-600  mb-1">
//                     <span>Total Units Price:</span>
//                       <span>${totalAmount.toFixed(2)}</span>
//                     </li>

//                     {selectedMethod === "delivery" && (
//                       <li className="flex justify-between text-gray-600  mb-1">
//                       <span>Delivery Fee:</span>
//                       <span className="text-gray-600">
//                       $10.00
//                       </span>
//                       </li>
//                     )}
//                     {selectedMethod === "delivery" ? (
//                       <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
//                         <span>Total Price:</span>
//                         <span>${(totalAmount + 10).toFixed(2)}</span>
//                       </li>
//                     ) : (
//                       <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
//                         <span>Total Price:</span>
//                         <span>${(totalAmount).toFixed(2)}</span>
//                       </li>
//                     )}
//                   </ul>

//                   <RadioGroup
//                     label="Select a method"
//                     className='py-5'
//                   >
//                     <Radio value="pickup" onChange={() => setSelectedMethod("pickup")}>Pickup</Radio>
//                     <Radio value="delivery" onChange={() => setSelectedMethod("delivery")}>Delivery</Radio>
//                   </RadioGroup>

//                   {selectedMethod === "pickup" && (
//                     <Textarea
//                       isDisabled
//                       label="Pickup Address:"
//                       labelPlacement="outside"
//                       placeholder="Enter your description"
//                       defaultValue="56 Valencia Blvd Doreen VIC 3754"
//                       className="max-w-xs py-5"
//                     />
//                   )}

//                   {selectedMethod === "delivery" && (
//                     <div className="mb-4">
//                       <label htmlFor="deliverySuburb" className="text-gray-6005">
//                         Choose your delivery suburb:
//                       </label>
//                       <Select
//                         id="deliverySuburb"
//                         options={allowedSuburbs.map((suburb) => ({ value: suburb.id, label: suburb.name }))}
//                         onChange={handleSuburbChange}
//                         isClearable
//                         className='py-5 z-20'
//                       />

//                       {selectedSuburb && (
//                         <Input
//                           id="deliveryAddress"
//                           type="text"
//                           label="Enter your delivery address"
//                           value={deliveryAddress}
//                           onChange={handleDeliveryAddressChange}
//                           className="pb-5"
//                         />
//                       )}
//                     </div>
//                   )}

//                   <button
//                     onClick={handleCheckout}
//                     id="process-payment-btn"
//                     className='px-4 py-3 inline-block text-lg w-full text-center font-medium text-white bg-orange-600 shadow-sm border border-orange-600 rounded-md'
//                   >
//                     Checkout
//                   </button>

//                   <Link
//                     href="/Menu"
//                     className="px-4 py-3 mt-3 inline-block text-lg w-full text-center font-medium text-orange-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
//                   >
//                     Back to shop
//                   </Link>
//                 </article>
//               </aside>
//             </div>
//           </div>
//         </section>
//       )}
//     </Section>
//     </div>
//   )
// }

// export default Cart;
