const router = require("express").Router();
const User = require("../models/User");
const user = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require('./verifyToken');



//UPDATE
router.put("/:id", verify, async (req, res) => {
    //Updating the password if there is and crypt it 
    if(req.user.id === req.params.id || req.user.isAdmin) {
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
                ).toString();
        }

        try {
            //find user by id and update it 
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set : req.body,
            },
            { new: true }  // this for after user Update return new user 
            );
            res.status(200).json(updateUser);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can update only your account! ");
    }

    
})

//DELETE

//GET

//GET ALL

//GET USER STATS total users per month 

module.exports = router;