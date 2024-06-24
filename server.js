const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Definir la ruta raíz
app.post('/send-nip', (req, res) => {
    const data = req.body;
    console.log('Datos recibidos del webhook nip:', data); 
    
    let number = data.cellphone;
    number = "57" + number;

    console.log('Number: ', number);

    let operator = data.actual_response; 
    let operatorCode = operator.charAt(0);

    console.log('Operator: ', operator);
    console.log('operatorCode: ', operatorCode);

    const apiUrl = `https://whatsappportabilidad.middlewom.co:443/requestnipcode/api/v1/requestnipcode/?user_key=588ff92551a096734491602cdda23a10`; // Construir la URL de la API
    
    // Preparar los datos de la petición
    const apiData = {    
        "init": {
            "isRedirect": "JSON",
            "query": "REQUEST_NIP_CODE"
        },
        "body": {
            "origin": "what_port",
            "serviceNumber": number,
            "donorCode": operatorCode,
            "requestType": "1"
        }
    };

    console.log('Iniciando peticion NIP a Treble:', apiUrl);
    console.log('Datos de la petición NIP:', apiData);
    
    // Realizar la petición a la API de Treble para actualizar chat
    axios.post(apiUrl, apiData)
        .then(response => {
            console.log('Response NIP:', response.data);
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
