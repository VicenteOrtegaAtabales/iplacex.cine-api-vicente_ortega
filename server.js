import express, { urlencoded } from 'express';
import cors from 'cors';
import client from './src/common/db.js';
import routesActor from './src/actor/routes.js';
import routesPelicula from './src/pelicula/routes.js'


const PORTS =  process.env.PORT|| 3000
const app = express()

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => { return res.status(200).send('Bienvenido al cine Iplacex')})

app.use('/api', routesActor)
app.use('/api', routesPelicula)

app.listen(PORT, () => { console.log(`Servidor corriendo en el puerto ${PORT}`) })
