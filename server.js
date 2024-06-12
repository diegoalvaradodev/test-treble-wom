const express = require('express');
const app = express();

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

app.listen(process.env.PORT || 3000, () => {
  console.log('Servidor escuchando en el puerto 3000');
});
