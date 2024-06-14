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
    const apiUrl = `https://main.treble.ai/session/${sessionId}/update`; // Construir la URL de la API
  // Preparar los datos de la petición
  const apiData = {
    user_session_keys: [
      {
        key: "tipo_plan",
        value: "pospago"
      },
      {
        key: "valor",
        value: "$29.990"
      }
    ]
  };

  // Headers de autenticación
  const headers = {
    'Authorization': 'Bearer ak_Y66T0p94jjd790p4I1TKY9IdszOKr_X8Kw', // Reemplaza YOUR_ACCESS_TOKEN con tu token de autenticación real
    'Content-Type': 'application/json'
  };

  console.log('Iniciando peticion Axios POST a la API:', apiUrl);
  console.log('Datos de la petición:', apiData);
  console.log('Headers de la petición:', headers);

  // Realizar la petición a la API de Treble
  axios.post(apiUrl, apiData, {headers})
    .then(response => {
      console.log('Response Treble data:', response.data);
        console.log('Response Treble status:', response.status);
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



// Ruta para el webhook de Treble
app.post('/treble-webhook', (req, res) => {
    const sessionId = res.session_id; // Asegúrate de que sessionId esté definido correctamente
    const apiUrl = `https://main.treble.ai/session/${sessionId}/update`; // Construir la URL de la API
  
    // Preparar los datos de la petición
    const apiData = {
        user_session_keys: [
            {
                key: "tipo_plan",
                value: "pospago"
            },
            {
                key: "valor",
                value: "$29.990"
            }
        ]
    };

    // Headers de autenticación
    const headers = {
        'Authorization': 'ak_Y66T0p94jjd790p4I1TKY9IdszOKr_X8Kw', // Reemplaza YOUR_ACCESS_TOKEN con tu token de autenticación real
        'Content-Type': 'application/json'
    };

    console.log('Iniciando peticion Axios POST a la API en 3 segundos:', apiUrl);
    console.log('Datos de la petición:', apiData);
    console.log('Headers de la petición:', headers);

    // Agregar tiempo de espera de 3 segundos
    setTimeout(() => {
        // Realizar la petición a la API de Treble
        axios.post(apiUrl, apiData, {headers})
            .then(response => {
                console.log('Response Treble data:', response.data);
                console.log('Response Treble status:', response.status);
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
    }, 2000); // 2 segundos
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
