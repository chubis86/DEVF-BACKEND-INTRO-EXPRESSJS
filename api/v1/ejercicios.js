const express = require('express')
// Router es un objeto que nos permite crear rutas
const router = express.Router()


//Ejercicio1
//Agrega un endpoint '/api/' que responda a una petición de tipo GET con un código de estado 200 y el siguiente json: { 'mensaje':'hola mundo' }
router.get('/api/', (request, response) => {
    response.status(200).send({
        message: 'HOLA MUNDO'
      })  
})


//Ejercicio2
//Agrega un endpoint '/api/suma' que responda a una petición de tipo GET con la suma de dos números que reciba mediante las querys num1 y num2. El servidor debe responder con un código de estado 200 y un json como el siguiente: { 'resultado': 7 }
router.get('/api/suma', (request, response) => {
  //console.log('Query params', request.query)
  const { num1, num2 } = request.query
  const suma=parseInt(num1)+parseInt(num2);
  //console.log(suma);
  if(!num1 || !num2){
    response.status(404).send('No olvides poner las variables num1 y num2');
  }else{
    response.status(200).send({ 'resultado': suma });
  }
  
})


//Ejercicio3
//Agrega un endpoint '/api/usuario/' que responda a una petición de tipo GET con el nombre que sea recibido a través de params. El servidor debe responder con un código de estado 200 y un json como este: { 'usuario': 'Edwin' }
router.get('/api/usuario', (request, response) => {
  const { nombre } = request.query
  //console.log(nombre);
  if(!nombre){
    response.status(404).send('No olvides poner la variable del nombre');
  }else{
    response.status(200).send({ 'usuario': nombre });
  }
  
})


//Ejercicio 4
//Agrega un endpoint '/api/swapi' que responda a una petición de tipo GET con el personaje solicitado de https://swapi.dev/. El cliente debe mandar el número de personaje mediante params. La respuesta del servidor debe lucir algo así { 'personaje': { 'name': 'Luke Skywalker', ..., } }
router.get('/api/swapi/:personaje', (request, response) => {
  const personaje  = request.params.personaje
  //console.log(personaje);
  if(!personaje){
    response.status(404).send('No olvides poner el número del personaje');
  }else{
    let api="https://swapi.dev/api/people/"+personaje;
    fetch(api)
      .then(response => response.json())
      .then(json => response.status(200).send(json));
    
    
  }
  
})



//Ejercicio 5
//Agrega un endpoint '/api/body que responda a una petición de tipo PUT con el body que el cliente envíe al hacer la petición. Ejemplo: cliente envía un body desde postman o insomnia que luce como este: { “nombre”: “Maui”, “ocupacion”: “Sensei” } Entonces, el servidor debe responder con un objeto idéntico al que envía el cliente, junto con un status de respuesta 200.

router.put('/api/body', (request, response) => {
  const { texto } = request.query
  if(!texto){
    response.status(404).send('No olvides poner el objeto en la variable "texto"');
  }else{
    response.status(200).send(texto);
  }
})


//Ejercicio 6
//Vuelve a hacer el ejercicio 2 pero enviando num1 y num2 desde el body, a través de una petición POST que responda con el status 200
router.post('/api/suma', (request, response) => {
  //console.log('Query params', request.query)
  const { num1, num2 } = request.query
  const suma=parseInt(num1)+parseInt(num2);
  console.log(suma);
  if(!num1 || !num2){
    response.status(404).send('No olvides poner las variables num1 y num2');
  }else{
    response.status(200).send({ 'resultado': suma });
  }
  
})


//Ejercicio 7
//Crea un endpoint para una petición de tipo DELETE donde envíes un ID (un número cualquiera) a través de params. Si el param contiene el ID 3, entonces responde con un status 200 y el mensaje “se ha eliminado el objeto con ID 3”, de lo contrario, si envían cualquier otro número como ID, responde con un status 404 y el mensaje “No se encontró el objeto con el ID especificado”.
router.delete('/api/eliminacion/:ID', (request, response) => {
  const ID  = request.params.ID
  
  if(!ID || ID!=3){
    response.status(404).send('No se encontró el objeto con el ID especificado');
  }else{
    response.status(200).send('Se ha eliminado el objeto con ID 3');
  }
  
})


module.exports = router