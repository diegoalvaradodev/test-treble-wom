const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');

// Middleware
app.use(bodyParser.json());

// Configurar el puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Definir la ruta raíz
app.get('/test', (req, res) => {
    res.send('Webhook Server is Running...');
    const data = req.body;
    console.log('Datos recibidos del webhook:', data);
});

// Definir la ruta raíz
app.post('/send-nip', (req, res) => {
    const data = req.body;
    console.log('Datos recibidos del webhook nip:', data); 
    
    let number = data.cellphone;
    number = "57" + number;

    console.log('Number: ',number);

    let operator = data.actual_response; 
    let operatorCode = operator.charAt(0);

    console.log('Operator: ', operator);
    console.log('operatorCode: ',operatorCode);


    //const apiUrl = `https://whatsappportabilidad.middlewom.co:443/requestnipcode/api/v1/requestnipcode/?user_key=588ff92551a096734491602cdda23a10`; // Construir la URL de la API
      // Preparar los datos de la petición
    //  const apiData = {    
    // "init": {
    //     "isRedirect": "JSON",
    //     "query": "REQUEST_NIP_CODE"
    // },
    // "body":{
    //     "origin": "what_port",
    //     "serviceNumber": "573214452338",
    //     "donorCode": "1",
    //     "requestType": "1"
    // }
    //;
    
    //onsole.log('Iniciando peticion NIP a Treble:', apiUrl);
    //onsole.log('Datos de la petición NIP:', apiData);
    
    //Realizar la petición a la API de Treble para actualizar chat
    // axios.post(apiUrl, apiData)
    //   .then(response => {
    //     console.log('Response NIP:', response);
    // })
    // .catch(error => {
    //     console.error('Error making POST request:', error);
    //     // Envía una respuesta a Treble con el error
    //     res.status(500).json({
    //         status: 'error',
    //         message: 'Error processing webhook',
    //         error: error.message
    //     });
    // });
    
        res.json({
            status: 'success',
            message: 'Petición recibida correctamente y POST request realizada',
             user_session_keys: [
                {
                  key: 'estado_portabilidad',
                  value: 'exitosa'
                }
              ]
        });
});


// Ruta para el webhook de Treble
app.post('/treble-webhook', (req, res) => {
  // Procesa la petición desde Treble
  const data = req.body;
  console.log('Datos recibidos del webhook:', data);

  // Envía una respuesta a Treble
  res.json({
        status: 'success',
        message: 'Petición recibida correctamente y POST request realizada'
    });
    
  const sessionId = data.session_id; // Obtener el ID de la sesión
  if (!sessionId) {
    console.error('session_id no encontrado en la petición');
    return res.status(400).json({
      status: 'error',
      message: 'session_id no encontrado en la petición'
    });
  }

  const apiUrl = `https://main.treble.ai/session/${sessionId}/update`; // Construir la URL de la API
  // Preparar los datos de la petición
  const apiData = {
    user_session_keys: [
      {
        key: "tipo_solicitud",
        value: "portabilidad"
      }
    ]
  };

  // Headers de autenticación
  const headers = {
    'Authorization': 'ak_Y66T0p94jjd790p4I1TKY9IdszOKr_X8Kw', // Reemplaza YOUR_ACCESS_TOKEN con tu token de autenticación real
    'Content-Type': 'application/json'
  };

  console.log('Iniciando peticion POST a Treble:', apiUrl);
  console.log('Datos de la petición:', apiData);
  console.log('Headers de la petición:', headers);

// Realizar la petición a la API de Treble para actualizar chat
    axios.post(apiUrl, apiData, {headers})
      .then(response => {
        console.log('Response Treble:', response);
          console.log('Response Treble data:', response.data);
        console.log('Response Treble status:', response.status);
          
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
