"use client";

import React, { useState } from 'react';
import { CreditCard, Lock } from 'lucide-react';

export default function PaymentForm() {
  const [paymentType, setPaymentType] = useState('credit');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [securityCode, setSecurityCode] = useState('');

  const handlePayment = async () => {
    // Validación de los datos
    if (!cardName || !cardNumber || !expiryMonth || !expiryYear || !securityCode) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const paymentData = {
      paymentType,
      cardName,
      cardNumber,
      expiryMonth,
      expiryYear,
      securityCode
    };
    try {
      // Llamada a la API para procesar el pago
    const response = await fetch(`${process.env.API_URL}/processPayment`, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
    });

    if (!response.ok) {
      throw new Error('Error en el procesamiento del pago');
    }

    const data = await response.json();

    if (data.success) {
        alert("Pago realizado exitosamente");
    } else {
        alert("Hubo un error al procesar el pago. Intenta nuevamente.");
    }

    } catch (error) {
      console.error('Error de conexión:', error);
      alert("Hubo un error de conexión. Intenta nuevamente.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-indigo-500 text-white rounded-full w-20 h-20 flex justify-center items-center shadow-lg">
            <CreditCard className="w-8 h-8" />
          </div>
        </div>

        <div className="mt-8 mb-6">
          <h1 className="text-center font-bold text-xl uppercase text-gray-800"> 
            Información de pago segura
          </h1>
        </div>

        <div className="mb-6 flex space-x-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="w-5 h-5 text-indigo-500 border-2 border-gray-300 rounded-full focus:ring-indigo-800"
              name="paymentType"
              checked={paymentType === 'credit'}
              onChange={() => setPaymentType('credit')}
            />
            <span className={`ml-3 ${paymentType === 'credit' ? 'text-black font-bold' : 'text-gray-800'}`}>
              Tarjeta de crédito
            </span>
          </label>
          
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              className="w-5 h-5 text-indigo-500 border-2 border-gray-300 rounded-full focus:ring-indigo-800"
              name="paymentType"
              checked={paymentType === 'paypal'}
              onChange={() => setPaymentType('paypal')}
            />
            <span className={`ml-3 ${paymentType === 'paypal' ? 'text-black font-bold' : 'text-gray-800'}`}>
              PayPal
            </span>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-sm mb-2 text-gray-400">
              Nombre en la tarjeta
            </label>
            <input
              type="text"
              placeholder="John Smith"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 text-black" 
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-2 text-gray-400">
              Número de tarjeta
            </label>
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 text-black" 
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-semibold text-sm mb-2 text-gray-400">
                fecha de expiración
              </label>
              <div className="flex space-x-2">
                <select
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 bg-white text-black"
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                      {String(i + 1).padStart(2, '0')} - {new Date(0, i).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
                <select
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 bg-white text-black"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={2024 + i}>
                      {2024 + i}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-1/2">
              <label className="block font-semibold text-sm mb-2 text-gray-400">
                Código de seguridad
              </label>
              <input    
                type="text"
                placeholder="000"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 text-black" 
                maxLength={3}
              />
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 w-full bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg px-4 py-3 font-semibold flex items-center justify-center"
          >
            <Lock className="w=5 h=5 mr=2" />
            PAGAR AHORA
          </button>
        </div>
      </div>
    </div>
  );
}
