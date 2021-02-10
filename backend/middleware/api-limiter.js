const rateLimit = require("express-rate-limit") //On importe rate limit

const apiLimiter = rateLimit({ //On limite le nombre de requête à notre API
     windowMs: 15 * 60 * 1000, //Vaut pour 15 minutes
     max: 100 //Limite le nombre d'IP par windowsMs
});

module.exports = apiLimiter //On exporte notre middleware apiLimiter configuré