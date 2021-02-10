const multer = require('multer') //On importe multer

const MIME_TYPES = { //Dictionnaire servant à générer l'extension du fichier
     'image/jpg': 'jpg',
     'image/jpeg': 'jpg',
     'image/png': 'png'
}

//On créé un objet de configuration pour multer
const storage = multer.diskStorage({ //On utilise la fonction diskStorage de multer
     destination: (req, file, callback) => { //Explique a multer dans quel dossier enregistrer les fichiers
          callback(null, 'images') //null (evite les erreur) + Le nom du dossier
     },
     filename: (req, file, callback) => { //Explique a multer quel nom de fichier utiliser
          //On génere le nouveau nom pour le fichier
          const name = file.originalname.split(' ').join('_') //On récupère le nom d'origine du fichier avec la propriété originalname de file. join remplace les ' ' de split par des '_'
          //On créé l'extension de notre fichier
          const extension = MIME_TYPES[file.mimetype] //L'élement de notre dictionnaire (MIME_TYPES) qui correspond au mimetype du fichier envoyé par le frontend
          //On appel notre callback
          callback(null, name + Date.now() + '.' + extension) //null (evite les erreur) + name + la date + extension
     }
})

module.exports = multer({ storage: storage }).single('image') //On exporte notre middleware multer configuré
//On utilise la méthode multer à laquelle on passe notre objet storage, à laquelle on passe la fonction single pour indiquer qu'il s'agit d'un fichier unique
//On dit à multer qu'il s'agit de fichier images uniquement
