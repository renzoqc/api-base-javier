function logErrors (err, req, res, next) { //esta función captura los errores y los muestra en consola
  console.log('logErrors')
  console.error(err.message);
  next(err); //con (err) se convierte en un middleware de tipo error, caso contrario sería uno normal
}

function errorHandler(err, req, res, next) { //acaba con toda la petición y lo envía en formto json al cliente
  console.log('errorHandler')
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) { //acaba con toda la petición y lo envía en formto json al cliente
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler }
