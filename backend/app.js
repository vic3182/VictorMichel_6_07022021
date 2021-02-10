const express = require('express') //On importe express
const bodyParser = require('body-parser') //On importe bodyParser
const mongoose = require('mongoose') //On importe mongoose
const mongoSanitize = require('express-mongo-sanitize') //On importe sanitize
const helmet = require("helmet") //On importe helmet
const sauceRoutes = require('./routes/sauce') //On importe notre router
const userRoutes = require('./routes/user') //On importe notre router pour nos user
const apiLimiter = require("./middleware/api-limiter") //On importe notre apiLimiter 
const path = require('path') //Donne accés au chemin de notre système de fichier 

//On se connecte à notre BDD
mongoose.connect(`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@${process.env.CLUSTER_DB}.5e9cf.mongodb.net/${process.env.DATA_BASE_NAME}?retryWrites=true&w=majority`,
     {
          useNewUrlParser: true,
          useUnifiedTopology: true
     }
)
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express() //On appel notre méthode express

app.use((req, res, next) => { //On ajoute des headers à notre objet response
     res.setHeader('Access-Control-Allow-Origin', '*') //Permet d'accéder à notre API depuis n'importe quelle origine (*)
     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')//Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API 
     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')//Permet d'envoyer des requêtes avec les méthodes mentionnées
     next()
})

app.use(bodyParser.json({ limit: "1kb" })) //Transforme le corps de la requête en objet JS et on limite leurs taille
app.use(mongoSanitize()) //Cherche dans les req et supprime toutes les clés commençant par $ ou contenant ".". S'appellera à chaque fois qu'un JSON est trouvé (recursive)
app.use(helmet()) //Sécurise les en-têtes HTTP (package de 11 middlewares)

//middleware qui répond aux requêtes envoyé à /images
app.use('/images', express.static(path.join(__dirname, 'images'))) //On utilise la fonction static() de express, "__dirname" = le nom du dossier dans lequel on va se trouver
//Indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base, __dirname ) à chaque fois qu'elle reçoit une requête vers la route /images

app.use('/api/sauces', apiLimiter, sauceRoutes) //On indique le chemin de nos requêtes
app.use('/api/auth', apiLimiter, userRoutes) //On enregistre nos routes 

module.exports = app //On exporte notre constante