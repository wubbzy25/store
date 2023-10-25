import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/button';
import Currency from '@/components/ui/currency';
import useCart from '@/hooks/use-cart';
import { toast } from 'react-hot-toast';

const CheckoutSummary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };
  
  
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
  
  const onCheckout = async () => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        address,
        phoneNumber,
        paymentMethod,
      });
      console.log(response);
  
      // Procesar la respuesta de la API (puedes mostrar un mensaje de confirmación, redireccionar, etc.)
    } catch (error) {
      // Manejar errores en la solicitud
      console.error('Error al procesar el formulario de pago:', error);
    }
  };
  
  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Resumen del pedido</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Total del pedido</div>
          <Currency value={totalPrice} />
        </div>
        <div>
          <h2 className="text-lg font-medium text-gray-900">Información de Pago</h2>
          <div className="mt-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Dirección de Envío
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Número de Teléfono
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={handlePaymentMethodChange}
                  className="text-blue-500 form-radio"
                />
                Tarjeta de Crédito
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={handlePaymentMethodChange}
                  className="text-blue-500 form-radio"
                />
                PayPal
              </label>
            </div>
          </div>
        </div>
      </div>
      <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Pagar
      </Button>
    </div>
  );
};

export default CheckoutSummary;
