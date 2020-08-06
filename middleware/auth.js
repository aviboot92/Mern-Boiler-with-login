const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Get Token from header
    const token = req.header('x-auth-token');

    // Check if no token is provided
    if(!token){
        return res.status(401).json({msg: 'Missing Token, authorization is required'});
    }

    // Verify the token
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);  
        req.user = decodedToken.user;
        next();
    } catch(err){
        res.status(401).json({msg: 'Token is not valid'});
    }
}