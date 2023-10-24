import React, { useState } from 'react';
import axios from 'axios';

const CheckoutForm = () => {
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleCheckout = async () => {
    // Enviar los datos del formulario a una API Route de Next.js
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
        address,    
        phoneNumber,
        paymentMethod,
      });

      // Procesar la respuesta de la API (puedes mostrar un mensaje de confirmación, redireccionar, etc.)
    } catch (error) {
      // Manejar errores en la solicitud
      console.error('Error al procesar el formulario de pago:', error);
    }
  };

  return (
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
      <button
        onClick={handleCheckout}
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
      >
        Realizar Pago
      </button>
    </div>
  );
};

export default CheckoutForm;
