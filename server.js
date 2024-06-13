const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

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

// Ruta para el webhook de Treble
app.post('/treble-webhook', (req, res) => {
  // Procesa la petición desde Treble
  const data = req.body;
  console.log(data);
  
  const sessionId = data.session_id; // Obtener el ID de la sesión
  const apiUrl = `https://main.treble.ai/session/${sessionId}/update`; // Construir la URL de la API
  // Preparar los datos de la petición
 console.log("El API a ejecutar es: "+apiUrl);
  const apiData = {
    user_session_keys: [
      {
        key: "plan",
        value: "pospago"
      },
      {
        key: "valor",
        value: "$39.990"
      }
    ]
  };

  // Realizar la petición a la API de Treble
  axios.post(apiUrl, apiData)
    .then(response => {
      console.log('Response data:', response.data);

      // Envía una respuesta a Treble
      res.json({
        status: 'success',
        message: 'Petición recibida correctamente y POST request realizada',
        user_session_keys: [
          {
            key: 'tipo_plan',
            value: 'pospago'
          },
          {
            key: 'valor',
            value: '$39.990'
          }
        ]
      });
    })
    .catch(error => {
      console.error('Error making POST request:', error);

      // Envía una respuesta a Treble con el error
      res.status(500).json({
        status: 'error',
        message: 'Error processing webhook',
        error: error.message
      });
    });
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
