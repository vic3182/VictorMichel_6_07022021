const http = require('http') //On importe le package http de Node
require('dotenv').config() //On importe dotenv
const app = require('./app') //On importe notre app express

const normalizePort = val => { //renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
     const port = parseInt(val, 10)

     if (isNaN(port)) {
          return val
     }
     if (port >= 0) {
          return port
     }
     return false
}
const port = normalizePort(process.env.PORT || '3000')
app.set('port', port) //On indique quel port l'app utilise

const errorHandler = error => { //recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
     if (error.syscall !== 'listen') { //error.syscall = appel système qui a échoué
          throw error
     }
     const address = server.address() //renvoie l'adresse liée contenant le nom de famille et le port du serveur
     const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port //On vérifie le type 
     switch (error.code) {
          case 'EACCES':
               console.error(bind + ' requires elevated privileges.')
               process.exit(1)
               break
          case 'EADDRINUSE':
               console.error(bind + ' is already in use.')
               process.exit(1)
               break
          default:
               throw error
     }
}

const server = http.createServer(app) //Créé notre serveur en utilisant notre app

server.on('error', errorHandler) //Renvoi errorHandler en cas d'erreur
server.on('listening', () => { //un écouteur d'évènements, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
     const address = server.address() //renvoie l'adresse liée contenant le nom de famille et le port du serveur
     const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port //On vérifie le type 
     console.log('Listening on ' + bind)
})

server.listen(port) //On écoute notre port
