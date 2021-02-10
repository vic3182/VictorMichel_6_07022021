const mongoose = require('mongoose') //On importe mongoose

//On utilise la fonction schema de mongoose
const sauceSchema = mongoose.Schema({ //Objet qui va dicter les différents champs dont notre schema aura besoin 
     userId: { type: String, required: true }, //On créée un objet pour configurer notre clef
     name: { type: String, required: true }, //type, required, default sont des configuration
     manufacturer: { type: String, required: true },
     description: { type: String, required: true },
     mainPepper: { type: String, required: true },
     heat: { type: Number, required: true },
     imageUrl: { type: String, required: true },
     likes: { type: Number, default: 0 },
     dislikes: { type: Number, default: 0 },
     usersLiked: { type: Array, default: [] },
     usersDisliked: { type: Array, default: [] }
})//Ceci est un schéma de donnée qui contient les champs souhaités pour chaque Sauce

//On exporte notre module
module.exports = mongoose.model('Sauce', sauceSchema)//Notre model mongoose avec notre schéma Sauce ('nomDuModel', nomDuSchéma)

