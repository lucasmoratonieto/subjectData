import express from 'express';
import cors from 'cors';
import subjectsRoutes from './routes/subjects.js';
import userName from './routes/userName.js';
import userRoutes from './routes/users.js';
import { verifyToken } from './middlewares/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Configurar CORS primero
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());

// Rutas
app.use('/login', userRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/userName', userName);


// Ruta de validación del token (¡con el slash!)
app.get('/api/validate-token', verifyToken, (req, res) => {
  // console.log("Token validado para el usuario:", req.userId);
  // console.log("Token recibido:", req.headers.authorization);
  res.json({ valid: true, userId: req.userId });
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando ✅');
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});