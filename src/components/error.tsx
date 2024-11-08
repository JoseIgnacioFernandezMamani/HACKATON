"use client";

import React from "react";

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-center text-red-600 font-bold text-2xl">
        Error en el procesamiento del pago. Intenta de nuevo.
      </h1>
    </div>
  );
}
