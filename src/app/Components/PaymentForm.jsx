import React, { useEffect, useState } from 'react';

const PaymentForm = () => {
  return (
    <div className=''>
      <script type="text/javascript"
        src="https://www.simplify.com/commerce/simplify.pay.js"></script>
      <iframe name="my-hosted-form"
        data-sc-key = {process.env.SIMPLIFY_KEY}
        data-name="Jasmine Green Tea"
        data-description="Smooth tea with a rich jasmine bouquet"
        data-reference="99999"
        data-amount="3000"
        data-color="#12B830">
      </iframe>
    </div>
  )
}

export default PaymentForm
