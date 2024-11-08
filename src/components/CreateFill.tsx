"use client";

import React, { useState } from "react";
import { FileText } from "lucide-react";

export default function CrearFactura() {
  const [cliente, setCliente] = useState("");  // Nombre del cliente
  const [cantidad, setCantidad] = useState("");  // Cantidad de la factura
  const [loading, setLoading] = useState(false);  // Estado de carga
  const [error, setError] = useState("");  // Estado de error

  const handleCreateInvoice = async () => {
    if (!cliente || !cantidad || isNaN(Number(cantidad)) || parseFloat(cantidad) <= 0) {
      alert("Por favor, ingresa todos los campos correctamente.");
      return;
    }

    setLoading(true); // Activar el estado de carga
    setError(""); // Limpiar errores previos

    const invoiceData = { cliente, cantidad };

    try {
      const response = await fetch(`${process.env.API_URL}/crearFactura`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceData),
      });

      if (!response.ok) {
        throw new Error("Error al crear la factura");
      }

      const data = await response.json();

      // Aquí puedes manejar la respuesta de la API
      if (data.success) {
        alert("Factura creada exitosamente.");
      } else {
        alert("Hubo un error al crear la factura.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setError("Hubo un error al procesar la solicitud. Intenta nuevamente.");
    } finally {
      setLoading(false);  // Desactivar el estado de carga
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6 relative">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-blue-500 text-white rounded-full w-20 h-20 flex justify-center items-center shadow-lg">
            <FileText className="w-8 h-8" />
          </div>
        </div>

        <div className="mt-8 mb-6">
          <h1 className="text-center font-bold text-xl uppercase text-gray-700">
            Crear Factura
          </h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-sm mb-2 text-black">
              Nombre del Cliente
            </label>
            <input
              type="text"
              placeholder="Cliente XYZ"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 text-gray-700 focus:text-gray-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-2 text-black">
              Cantidad
            </label>
            <input
              type="text"
              placeholder="500.00"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 text-gray-700 focus:text-gray-900"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleCreateInvoice}
            className={`mt-6 w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"} text-white rounded-lg px-4 py-3 font-semibold`}
            disabled={loading}
          >
            {loading ? "Cargando..." : "CREAR FACTURA"}
          </button>
        </div>
      </div>
    </div>
  );
}
