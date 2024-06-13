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

  // Llamar a la API de Treble
const sessionId = data.session_id; // Obtener el ID de la sesión
const apiUrl = https://main.treble.ai/session/${sessionId}/update`; // Construir la URL de la API

// Preparar los datos de la petición
const apiData = { 
  "user_session_keys": [
    {
      "key": "plan",
      "value": "pospago"
    },
    {
      "key": "valor",
      "value": "$39.990"
    }
  ]
};

// Opciones de la petición
const options = {
  method: 'POST', // Método HTTP (POST en este caso)
  url: apiUrl,
  headers: {
    'Content-Type': 'application/json' // Tipo de contenido
  },
  body: JSON.stringify(apiData) // Cuerpo de la petición
};

// Realizar la petición a la API de Treble
request(options, (error, apiResponse) => {
  if (error) {
    console.error('Error al llamar a la API de Treble:', error);
    // Manejar el error de forma adecuada (por ejemplo, registrarlo en un log)
  } else {
    console.log('Respuesta de la API de Treble:', apiResponse.body);
    // Procesar la respuesta de la API de Treble (opcional)
  }
});

    
    
  // Envía una respuesta a Treble
  res.json({
    status: 'success',
    message: 'Petición recibida correctamente',
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
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
