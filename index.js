const express = require('express');
const cors = require('cors');
const routerApi = require('./routes'); //no se coloca index en la ruta porque la busqueda es automatica

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); //permite recibir información tipo json que nos envían por post

const whitelist = ['http://localhost:8080', 'https://myapp.com']; //especifico que dominios tienen acceso a la app
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){ //consulta si origin está incluido en whitelist
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req, res) => { //definimos la ruta
  res.send('Hola, mi server en express');
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
})

routerApi(app); //para llamar a routerApi y utilizar las rutas

app.use(logErrors); //tiene que ir siempre después del routing
app.use(boomErrorHandler);
app.use(errorHandler); //se ejecuta de forma secuencial, por eso el orden importa

app.listen(port, () => {
console.log('Mi port '+ port);
}); //definimos puerto
