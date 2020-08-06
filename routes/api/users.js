const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('./../../models/User');

//  @route Post api/users @desc Register user @access PUBLIC
router.post('/', 
[
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid eamil').isEmail(),
    check('password', 'Password is required and must be atleast 8 characters long').isLength({min: 8})
], 
async (req, res) => {
    // Check for validations and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                errors: errors.array()
            });
    }

    const {name, email, password} = req.body;

    try{
        // See if user Exists
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({errors: [{msg:"User already exists"}]})
        }
    //  Create New User
    // Get User Gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });
    
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    // Return JWT
    const payload = {
        user: {
            id: user.id
        }
    }
    jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 360000}, (err, token) => {
        if(err) throw err;
        res.json({token});
    });
} catch(err){
    console.log(err.message);
    res.status(500).send('Server error');
}

});

module.exports = router;