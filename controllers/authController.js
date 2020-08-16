const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');

module.exports = {
    //  @route GET /api/auth @desc Get-Auth-User @access PRIVATE
    getAuthUser: async(req, res) => {
        try {
            const user = await User
                .findById(req.user.id)
                .select('-password');
            res.json(user);
        } catch (err) {
            console.log(err.message);
            res
                .status(500)
                .send('Server Error');
        }
    },

    //  @route Post /api/auth @desc login-User & get Token @access PUBLIC
    loginUser: ([
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please include a valid required').exists()
    ], async(req, res) => {
        // Check for validations and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({
                    errors: errors.array()
                });
        }
        const {email, password} = req.body;   
        try {
            // See if user Exists
            let user = await User.findOne({email});
            if (!user) {
                return res
                    .status(400)
                    .json({
                        errors: [
                            {
                                msg: "Invalid Credentials"
                            }
                        ]
                    })
            }
            // Checking password match
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({
                        errors: [
                            {
                                msg: "Invalid Credentials"
                            }
                        ]
                    })
            }
            // Return JWT
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: 360000
            }, (err, token) => {
                if (err) 
                    throw err;
                res.json({token});
            });
        } catch (err) {
            console.log(err.message);
            res
                .status(500)
                .send('Server error');
        }
    })
}