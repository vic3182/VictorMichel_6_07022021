const jwt = require('jsonwebtoken') //On importe jsonwebtoken

//On créé notre middleware à exporter
module.exports = (req, res, next) => {
     try {
          const token = req.headers.authorization.split(' ')[1] //On récupère le token dans le header de la requête
          const decodedToken = jwt.verify(token, process.env.JWT_RAND_SECRET) //On décode le token avec verify de jsonwebtoken (ceQueJeVeuxVérifier, 'laClefSecrète')
          const userId = decodedToken.userId //On extrait ce qu'on a decoder, deviens objet js classique 
          if (req.body.userId && req.body.userId !== userId) { //On vérifie si un user Id  contient bien l'user id du token 
               throw 'User ID non valable !' //Si non
          } else { //Si oui
               next()
          }
     } catch (error) { //Renvoi une erreur si problème d'authentification
          res.status(401).json({ error: error | 'Requête non authentifiée !' }) //Erreur Unauthorized
     }
}