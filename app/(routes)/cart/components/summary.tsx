import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { toast } from 'react-hot-toast';

const CheckoutSummary = () => {
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  
  
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const formRef = useRef(null);
  
  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };
  
  
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
  
  const onCheckout = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        productIds: items.map((item) => item.id),
        address,
        phoneNumber,
        paymentMethod,
      });

       if(response.status === 200) {
        toast.success('Pago completado');
         removeAll();
          formRef.current.reset(); // Restablecer el formulario
        setAddress(''); // Limpiar el estado
        setPhoneNumber(''); // Limpiar el estado
        setPaymentMethod('credit-card');
       }
  
      // Procesar la respuesta de la API (puedes mostrar un mensaje de confirmación, redireccionar, etc.)
    } catch (error) {
      // Manejar errores en la solicitud
      console.error('Error al procesar el formulario de pago:', error);
    }
  };
  
  return (
  <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
}
  );
};

export default CheckoutSummary;
