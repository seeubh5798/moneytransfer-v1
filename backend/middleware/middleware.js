const {JWT_SECRET} = require('./../config');
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
        const authHeader = req.headers.authorization; 
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            console.log(authHeader.startsWith('Bearer '))
            return res.status(403).json({message : "token error"});
        }

        const token = authHeader.split(" ")[1];

        try{
            const decodedToken = jwt.verify(token , JWT_SECRET);
            console.log(decodedToken);
            req.userId = decodedToken.userId;
            next();
        }
        catch(err){
            return res.status(403).json({message : "sahi json bhej"});
        }

}

module.exports =  authMiddleware