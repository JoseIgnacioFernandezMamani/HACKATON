"use client";

import React, { useState } from "react";
import { CreditCard } from "lucide-react";


export default function CrearPago() {
  const [amount, setAmount] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleCreatePayment = async () => {
    // Validación del monto
    if (!amount || isNaN(Number(amount)) || parseFloat(amount) <= 0) {
      alert("Por favor ingresa un monto válido.");
      return;
    }

    setLoading(true);
    setError(""); 

    const paymentData = { amount: parseFloat(amount) }; // Asegúrate de enviar un número

    try {
      const response = await fetch(`${process.env.API_URL}/crearPago`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la solicitud de pago");
      }

      const data = await response.json();

      if (data.success) {
        alert("Pago creado exitosamente. ID del Pago: " + data.paymentId); // Muestra el ID del pago o información relevante
      } else {
        alert("Hubo un error al crear la solicitud de pago: " + data.message);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setError("Hubo un error al procesar la solicitud de pago. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-green-500 text-white rounded-full w-20 h-20 flex justify-center items-center shadow-lg">
            <CreditCard className="w-8 h-8" />
          </div>
        </div>

        <div className="mt-8 mb-6">
          <h1 className="text-center font-bold text-xl uppercase text-gray-700">
            Crear Solicitud de Pago
          </h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm mb-2 text-black">
              Monto a Pagar
            </label>
            <input
              type="text"
              placeholder="100.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-green-500 text-gray-700 focus:text-gray-900"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleCreatePayment}
            className={`mt-6 w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"} text-white rounded-lg px-4 py-3 font-semibold`}
            disabled={loading}
          >
            {loading ? "Cargando..." : "CREAR PAGO"}
          </button>
        </div>
      </div>
    </div>
  );
}
