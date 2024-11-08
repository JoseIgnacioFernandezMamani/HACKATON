import React, { useState } from 'react';
import { procesarPago } from '../services/Services';

const Checkout = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await procesarPago({ amount, currency });
      setStatus('success');
      console.log('Respuesta del pago:', response.data);
    } catch (error) {
      setStatus('error');
      console.error('Error al procesar el pago:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Monto:
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} required />
        </label>
      </div>
      <div>
        <label>
          Moneda:
          <input type="text" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
        </label>
      </div>
      <button type="submit">Pagar</button>

      {status === 'loading' && <p>Cargando...</p>}
      {status === 'success' && <p>Pago procesado con éxito.</p>}
      {status === 'error' && <p>Error al procesar el pago.</p>}
    </form>
  );
};

export default Checkout;
