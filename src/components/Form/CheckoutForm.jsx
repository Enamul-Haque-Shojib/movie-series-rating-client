import React, { useEffect, useState } from 'react';

import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import './CheckoutForm.css'
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { addTransaction, createPayment } from '@/services/TransactionService';
import { useUser } from '@/context/UserContext';
import { useRouter } from 'next/navigation';


const CheckoutForm = ({mediaData, price}) => {

const {user} = useUser();
const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState('');
    
    const [processing, setProcessing] = useState(false)

  

    const {id, buy_price, rent_price} = mediaData;
  

    
    useEffect(() => {
        const fetchPayment = async()=>{
            const res = await createPayment({id})
            setClientSecret(res?.data?.clientSecret)
            console.log(res.data.clientSecret);
        }
        fetchPayment();
    },[createPayment, id])


    const handleSubmit = async (event) => {
      setProcessing(true)
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        return;
      }
  
      const card = elements.getElement(CardElement);
  
      if (card == null) {
        setProcessing(false)
        return;
      }
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card,
      });
  
      if (error) {
        setProcessing(false)
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }

      // confirm payment

    const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                name: 'Unknown User',
                email: 'unknown@example.com',
                address: {
                    line1: '123 Default St',
                    city: 'Default City',
                    state: 'Default State',
                    postal_code: '000000',
                    country: 'IN',  // Change based on user's actual country
                }
            },
        },
    });

     
  const mediaPrice = price=='0' ? '0' : price=='buy' ? buy_price : rent_price
  const mediaType = price=='0' ? '' : price=='buy' ? "BUY" : "RENT"
      if (paymentIntent.status === 'succeeded') {
        try {
          // Save data in db
          const res = await addTransaction({
            userId: user.id,
            mediaId: mediaData.id,
            price: mediaPrice,
            type: mediaType,
            transactionId: paymentIntent?.id,
          });
          console.log(res)
          
      
          toast.success('Payment Successful!')
          
          router.push(`/dashboard`)
        } catch (error) {
          console.log(error)
        } finally {
          setProcessing(false)
          
        }
      }
      
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        
        <div className='flex justify-around mt-2 gap-2'>
        <Button className='btn bg-green-500 p-5 rounded-lg text-xl cursor-pointer'
        
          disabled={!stripe || !clientSecret || processing || price==="0"}
          type='submit'
         
        >
          
          {
            processing ? <Loader className="animate-spin text-gray-400 w-20 h-10" />:
          `Pay ${price=='0' ? '0' : price=='buy' ? buy_price : rent_price}$`}
          </Button>
        
      </div>
      </form>
    );
};

export default CheckoutForm;