const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Buenas');
});

app.listen(port, () => {
    console.log(`El server esta corriendo en el puerto ${port}`);
});

const config = {
    user: 'sa', 
    password: '12345', 
    server: 'VICTOR\\SQLEXPRESS', 
    database: 'ProyectoFinal', 
    options: {
      port: 1433,
      encrypt: false, 
    },
}

sql.connect(config, (err) => {
    if (err) {
      console.error('No jaló la conexion xD', err);
    } else {
      console.log('Conexión a BD exitosa');
    }
  });

app.post('/insertMensaje', async (req, res) => {
    try {
      console.log(req.body)
      const {Nombre, Correo, Mensaje} = req.body;
      const result = await sql.query`INSERT INTO Mensaje VALUES (${Nombre}, ${Correo}, ${Mensaje})`;
      res.json({ message: 'Registro se agrego bien' });
    } catch (error) {
        console.error('Tienes el siguiente error master: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
