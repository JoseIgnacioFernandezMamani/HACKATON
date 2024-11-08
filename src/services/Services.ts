import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL;

export const procesarPago = async (datosPago: any) => {
  try {
    const response = await axios.post(`${API_URL}/ventas/pagar`, datosPago);
    return response.data;
  } catch (error) {
    console.error("Error al procesar el pago:", error);
    throw error;
  }
};

// Procesar notificación de pago
export const procesarNotificacionPago = async (
  codigoSeguimiento: string,
  datosNotificacion: any
) => {
  try {
    const response = await axios.post(
      `${API_URL}/notificacion/pago/${codigoSeguimiento}`,
      datosNotificacion
    );
    return response.data;
  } catch (error) {
    console.error("Error en la notificación de pago:", error);
    throw error;
  }
};

// Procesar notificación de factura
export const procesarNotificacionFactura = async (
  codigoSeguimiento: string,
  datosNotificacion: any
) => {
  try {
    const response = await axios.post(
      `${API_URL}/notificacion/factura/${codigoSeguimiento}`,
      datosNotificacion
    );
    return response.data;
  } catch (error) {
    console.error("Error en la notificación de factura:", error);
    throw error;
  }
};
