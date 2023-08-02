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
router.delete("/:id", verify, async (req, res) => {
    
    if(req.user.id === req.params.id || req.user.isAdmin) {
        try {
            //find user by id and delete it 
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted...");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can delete only your account! ");
    }

    
})

//GET
router.get("/find/:id", async (req, res) => {
        try {
            
            const user = await User.findById(req.params.id);
        const { password, ...info } = user._doc; // should not showing the password when get user
            res.status(200).json(info);
        } catch (err) {
            res.status(500).json(err);
        }

})
//GET ALL
router.get("/", verify, async (req, res) => {
    const query = req.query.new;  //For fetching  users By limit (?new=true)
    if(req.user.isAdmin) {
        try {
            const users = query ? await User.find().sort({_id: -1}).limit(10) :   // the 2 lasts users else all users
            await User.find();
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed to see all users! ");
    }

    
})
//GET USER STATS total users per month 
router.get("/stats", async (req, res) => {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1); // that gives me the last year

    

        try {
            const data = await User.aggregate([ //cluster out the records in the form of a collection which can be then employed for providing operations like total number (sum), mean, minimum and maximum
            {
                $project: {
                month: { $month: "$createdAt" }, //if you want it per year just replace month with year 
                },
            },
            {
                $group: {
                _id: "$month",
                total: { $sum: 1 },
                },
            },
            ]);
            res.status(200).json(data)
        } catch (err) {
            res.status(500).json(err);
        }
});

module.exports = router;