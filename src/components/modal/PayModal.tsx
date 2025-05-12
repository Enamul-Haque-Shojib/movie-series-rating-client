/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import {
  
  DialogContent,
  DialogDescription,
  
  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from 'next/image';
import { AspectRatio } from "@/components/ui/aspect-ratio"
import CheckoutForm from "@/components/Form/CheckoutForm"


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PAYMENT_PUBLISH_KEY as string);

const PayModal = ({mediaData} : any) => {
   
    const {title, image} = mediaData;
    const [price, setPrice] = useState("0");
    
    return (
        <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
        <AspectRatio ratio={16 / 9} className="bg-muted">
      <Image
        src={image}
        alt="Photo by Drew Beamer"
        fill
        className="h-full w-full rounded-md object-cover"
      />
    </AspectRatio>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Please buy or rent the media to watch  
          </DialogDescription>
        </DialogHeader>

       <RadioGroup
  value={price}
  onValueChange={(value) => setPrice(value)}
>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value='buy' id="r1" />
    <Label htmlFor="r1">Buy</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value='rent' id="r2" />
    <Label htmlFor="r2">Rent</Label>
  </div>
</RadioGroup>
        
        <Elements stripe={stripePromise}>
        <CheckoutForm mediaData={mediaData} price={price}/>
        </Elements>
      
      </DialogContent>
    );
};

export default PayModal;