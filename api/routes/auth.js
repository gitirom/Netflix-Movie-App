const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER API
router.post("/register", async(req, res) => {
    const NewUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_KEY
            ).toString(),
    });

    try {
        const user = await NewUser.save();
    res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
    
    
} );

//LOGIN API
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email:req.body.email});
        !user && res.status(401).json("Wrong password or username!")

        //compare encrypted password
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && 
            res.status(401).json("Wrong password or username!");

            const accessToken = jwt.sign(  // create a new token 
                {id: user._id, isAdmin: user.isAdmin},
                process.env.SECRET_KEY,
                { expiresIn: "5d" }
            );

        //Stored in local Storage 
        const { password, ...info } = user._doc; // the password not passing here just the other info name email .....


        res.status(201).json({...info, accessToken});

    } catch (err) {
        res.status(500).json();
    }
})





module.exports = router;
