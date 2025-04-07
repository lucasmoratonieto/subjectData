import express from 'express';
import cors from 'cors';
import subjectsRoutes from './routes/subjects.js';
import userRoutes from './routes/users.js'
import bcrypt from 'bcrypt';
import './config/db.js'; // Carga la configuración de la DB
import pool from './config/db.js';
import Users from './models/Users.js';


const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/subjects', subjectsRoutes);

app.use('/login', userRoutes);


// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando ✅');
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
