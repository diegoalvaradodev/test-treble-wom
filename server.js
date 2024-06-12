const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Definir la ruta raíz
app.get('/test', (req, res) => {
    res.send('Hello World! Webhook Server is Running...');
});

// Ruta para el webhook
app.post('/webhook', (req, res) => {
    console.log('Webhook received:', req.body);
    res.status(200).send('Webhook received');
});

//Ruta para el webhook de treble
app.post('/treble-webhook', (req, res) => {
  // Procesa la petición desde Treble
  const data = req.body;
  console.log(data);

  // Envía una respuesta a Treble
  res.json({
    status: 'success',
    message: 'Petición recibida correctamente'
  });
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
