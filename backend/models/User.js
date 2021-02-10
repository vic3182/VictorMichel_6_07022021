const mongoose = require('mongoose') //On importe mongoose
const uniqueValidator = require('mongoose-unique-validator') //On importe mongoose-unique-validator

//On utilise la fonction schema de mongoose
const userSchema = mongoose.Schema({ //Objet qui va dicter les différents champs dont notre schema aura besoin 
     email: { type: String, required: true, unique: true }, //type, required, unique sont des configuration
     password: { type: String, required: true }
})//Ceci est un schéma de donnée qui contient les champs souhaités pour chaque User

userSchema.plugin(uniqueValidator) //On applique notre plugin à notre schema avant d'en faire un model
//nomDuSchemaUtilisé.plugin(nomDuPluginUtilisé)

//On exporte notre module
module.exports = mongoose.model('User', userSchema) //Notre model mongoose avec notre schéma User ('nomDuModel', nomDuSchéma)
