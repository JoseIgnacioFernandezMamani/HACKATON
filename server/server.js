const express = require('express');
const app = express();

// Cargar las variables de entorno
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
};

// Ejemplo de uso en una ruta
app.get('/api/config', (req, res) => {
    res.json({
        dbConfig,
        servicioFacturacion: process.env.SERVICIO_FACTURACION,
        servicioPagos: process.env.SERVICIO_PAGOS,
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
