// import React, { useState } from 'react';
// import { Input, Select, SelectItem } from '@nextui-org/react';

// const PaymentForm = () => {
//   const [token, setToken] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     // Disable submit button
//     document.getElementById('process-payment-btn').disabled = true;

//     try {
//       const response = await fetch('https://www.simplify.com/commerce/v1/tokens', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           publicKey: process.env.SIMPLIFY_KEY, // Replace with your public key
//           card: {
//             number: document.getElementById('cc-number').value,
//             cvc: document.getElementById('cc-cvc').value,
//             expMonth: document.getElementById('cc-exp-month').value,
//             expYear: document.getElementById('cc-exp-year').value,
//           },
//         }),
//       });

//       const data = await response.json();

//       if (data.error) {
//         setError(data.error.message);
//       } else {
//         setToken(data.id);
//       }
//     } catch (error) {
//       console.error('Error creating token:', error);
//       setError('An error occurred. Please try again later.');
//     } finally {
//       // Re-enable submit button
//       document.getElementById('process-payment-btn').disabled = false;
//     }
//   };

//   return (
//     <div>
//       <p className='text-lg font-bold border-t text-center pt-6 pb-3'>Credit / Debit card</p>
//       <form id="simplify-payment-form" onSubmit={handleSubmit}>
//         <div>
//           <Input
//             id="cc-number"
//             type="text"
//             maxLength="20"
//             autoComplete="off"
//             value=""
//             autoFocus
//             label="Card number"
//             className="rounded border-neutral-400 my-5"
//           />
//         </div>
//         <div className='flex gap-6 pb-10'>
//           <Select
//             id="cc-exp-month"
//             label="Expiry MM"
//             value=""
//             className="w-80 md:w-96 h-12 rounded border-neutral-400"
//           >
//             <SelectItem value="01">01</SelectItem>
//           <SelectItem value="02">02</SelectItem>
//           <SelectItem value="03">03</SelectItem>
//           <SelectItem value="04">04</SelectItem>
//           <SelectItem value="05">05</SelectItem>
//           <SelectItem value="06">06</SelectItem>
//           <SelectItem value="07">07</SelectItem>
//           <SelectItem value="08">08</SelectItem>
//           <SelectItem value="09">09</SelectItem>
//           <SelectItem value="10">10</SelectItem>
//           <SelectItem value="11">11</SelectItem>
//           <SelectItem value="12">12</SelectItem>
//           </Select>
//           <Select id="cc-exp-year"
//           label="Expiry YYYY" value=""
//           className="w-80 md:w-96 h-12 rounded border-neutral-400"
//         >
//           <SelectItem value="13">2024</SelectItem>
//           <SelectItem value="14">2025</SelectItem>
//           <SelectItem value="15">2026</SelectItem>
//           <SelectItem value="16">2027</SelectItem>
//           <SelectItem value="17">2028</SelectItem>
//           <SelectItem value="18">2029</SelectItem>
//           <SelectItem value="19">2030</SelectItem>
//           <SelectItem value="20">2031</SelectItem>
//           <SelectItem value="21">2032</SelectItem>
//           <SelectItem value="22">2033</SelectItem>
//         </Select>
//         <Input id="cc-cvc" type="text" maxlength="4" autocomplete="off" value=""
//           label="CVC"
//           className="w-80 md:w-96 rounded border-neutral-400"
//         />
//         </div>
//         <button
//           type="submit"
//           id="process-payment-btn"
//           className='px-4 py-3 inline-block text-lg w-full text-center font-medium text-white bg-orange-600 shadow-sm border border-orange-600 rounded-md'
//         >
//           Confirm & pay
//         </button>
//         {error && <div className="error">{error}</div>}
//         {token && <input type="hidden" name="simplifyToken" value={token} />}
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;


import { CardElement } from '@stripe/react-stripe-js';

// ...

const PaymentForm = () => {
  return (
    <div>
      <p className='text-lg font-bold text-center pt-6 pb-3'>Credit / Debit card</p>
      <CardElement
        className='mt-5 mb-10 text-black rounded border border-1 p-3 text-base'
        options={{
          style: {
            base: {
              color: '#1C2024',
              '::placeholder': {
                color: '#1C2024',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
    </div>
    
  );
};

export default PaymentForm;