const express = require('express') //On importe express
const router = express.Router() //nous créons un routeur Express
const auth = require('../middleware/auth') //On importe notre middleware auth
const multer = require('../middleware/multer-config') //On importe notre middleware multer
const sauceCtrl = require('../controllers/sauce') //On importes nos controllers

//On importe notre fonction avec ('URI', nomDuController.nomDeLaRoute)
router.get('/', auth, sauceCtrl.getAllSauce) //Route pour récupérer tous les objets
// /api/sauces serait l'URL complète
router.post('/', auth, multer, sauceCtrl.createSauce) //On raccourci le chemin de la requête à "/"
//auth permet de protéger et de vérififier le token pour chaques routes
router.get('/:id', auth, sauceCtrl.getOneSauce) //On raccourci le chemin de la requête à "/" + le params nécessaire (id dans notre cas)
router.put('/:id', auth, multer, sauceCtrl.modifySauce) // ":" en face du segment dynamique de la route pour la rendre accessible en tant que paramètre (id)
router.post('/:id/like', auth, multer, sauceCtrl.likeSauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce) 

module.exports = router //On exporte notre router pour l'importer dans app.js