const express = require('express') //On importe express
const router = express.Router() //On créé notre router avec la fonction router de express
const userCtrl = require('../controllers/user') //On importe nos controller

router.post('/signup', userCtrl.signup) //On importe notre fonction avec ('URI', nomDuController.nomDeLaRoute)
// /api/auth/signup serait l'URL complète
router.post('/login', userCtrl.login)

module.exports = router //On exporte notre router pour l'importer dans app.js