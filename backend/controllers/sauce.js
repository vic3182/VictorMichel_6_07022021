const Sauce = require('../models/Sauce') //On importe notre models Sauce
const fs = require('fs') //On importe fs (file system) de node

//On exporte notre fonction qui gère une route et on lui donne un nom
exports.createSauce = (req, res, next) => { //middleware createSauce
     const sauceObject = JSON.parse(req.body.sauce) // On extrait l'objet json de sauce, req.body deviens sauceObject
     delete sauceObject._id //On supprime l'_id envoyé par le frontend
     const sauce = new Sauce({ //On créé une nouvelle instance de notre modele Sauce
          ...sauceObject, //L'opérateur spread "..." fait une copie de tous les éléments de req.body (sauceObject)
          //On modifie l'URL de l'image de manière dynamique 
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //Le protocol (http/https)://Le nom de l'hote du serveur/images/le nom du fichier
     })
     sauce.save() //La fonction save() enregistre notre Sauce dans la bdd
     .then(() => res.status(201).json({ message: 'Objet enregistré !' })) //On renvoie une réponse 
     .catch(error => res.status(400).json({ error })); //Erreur Bad Request
}

exports.modifySauce = (req, res, next) => {
     const sauceObject = req.file ? //Opérateur ternaire
          { // si req.file existe
               ...JSON.parse(req.body.sauce), // On extrait l'objet json de sauce, req.body deviens sauceObject
               imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` //On modifie l'URL de l'image de manière dynamique 
          } : { ...req.body } //Si non on fait une copie de req.body
     //updateOne() met à jour la Sauce qui correspond à l'objet que nous passons comme premier argument
     Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) //Nous utilisons le paramètre id passé dans la demande et le remplaçons par la Sauce passé comme second argument
     .then(() => res.status(200).json({ message: 'Objet modifié !' })) //Retour de notre promesse
     .catch(error => res.status(400).json({ error })); //Erreur Bad Request
}

exports.likeSauce = (req, res, next) => {
     const sauceObject = req.body //Renvoi ojbet avec userId et like
     const userId = sauceObject.userId //Renvoi ID user
     const like = sauceObject.like //Renvoi like: -1/0/1

     Sauce.findOne({ _id: req.params.id }) //On va cherche l'id de l'item
     .then((sauce) => { //On récupère le json sauce
          //Condition pour like/dislike
          if (like == 1) {
               sauce.usersLiked.push(userId) //On ajoute à notre tableau
               sauce.likes++ //Incrémente nos likes
          } else if (like == -1) {
               sauce.usersDisliked.push(userId)
               sauce.dislikes++
          } else if (like == 0 && sauce.usersLiked.includes(userId)) { //On vérifie sir l'id user est présent
               sauce.likes--
               let pos = sauce.usersLiked.indexOf(userId) //On récupère l'index du userId ciblé
               sauce.usersLiked.splice(pos, 1) //On supprime l'ancien userId
          } else if (like == 0 && sauce.usersDisliked.includes(userId)) {
               sauce.dislikes--
               let pos = sauce.usersDisliked.indexOf(userId)
               sauce.usersDisliked.splice(pos, 1)
          }
          Sauce.updateOne({ _id: req.params.id }, { usersLiked: sauce.usersLiked, usersDisliked: sauce.usersDisliked, dislikes: sauce.dislikes, likes: sauce.likes, _id: req.params.id }) //On update notre sauce
          .then(() => res.status(200).json({ message: 'Objet modifié !' })) //Retour de notre promesse
          .catch(error => res.status(400).json({ error })); //Erreur Bad Request
     })
     .catch(error => res.status(400).json({ error })); //Erreur Bad Request
}

exports.deleteSauce = (req, res, next) => {
     Sauce.findOne({ _id: req.params.id }) //On va chercher l'item contenant l'id
     .then(sauce => {
          const filename = sauce.imageUrl.split('/images/')[1]; //On récupère le nom du fichier à supprimer
          //la fonction unlink de fs permet de supprimer un fichier
          fs.unlink(`images/${filename}`, () => { // le dossier visé (images/)/le nom du fichier, le callback à executer
               Sauce.deleteOne({ _id: req.params.id }) //deleteOne() supprime la Sauce qui correspond à l'objet que nous passons comme argument
               .then(() => res.status(200).json({ message: 'Objet supprimé !' })) //Retour de notre promesse
               .catch(error => res.status(400).json({ error })) //Erreur Bad Request
          })
     })
     .catch(error => res.status(500).json({ error: 'erreur 500 sauce' })) //Erreur Internal Server Error
}

exports.getOneSauce = (req, res, next) => {
     Sauce.findOne({ _id: req.params.id }) //findOne() trouve la Sauce unique ayant le même _id que le paramètre de la requête
     .then((sauce) => { res.status(200).json(sauce) }) //Cette Sauce est ensuite retourné dans une Promise et envoyé au front-end
     .catch((error) => { res.status(404).json({ error: error }) }) //Erreur Not found
}

exports.getAllSauce = (req, res, next) => {
     Sauce.find() //find() renvoi un tableau de toutes nos Sauces dans notre bdd
     .then((sauces) => { res.status(200).json(sauces) }) //Renvoi notre tableau (nos sauces)
     .catch((error) => { res.status(400).json({ error: error }) }) //Erreur Bad Request
}
