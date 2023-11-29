const {User, Lodging, Type} = require("../models")
const { signToken } = require("../helpers/jwt");
const { comparePassword } = require("../helpers/bycript");
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController { 
    static async postUser(req, res, next){
        const {username, email, password, phoneNumber, address} = req.body
        console.log(req.body);
        try{
            const newUser = await User.create({
                username, email, password, role : "admin", phoneNumber, address
            })
            res.status(201).json({
                username : newUser.username,
                email : newUser.email,
                role : newUser.role,
                phoneNumber : newUser.phoneNumber,
                address : newUser.address
            })
        } catch (err){
            console.log(err);
            next(err)
        }
    }

    static async handleLogin(req, res, next){
        try {
            const {email, password} = req.body
            console.log(email, password);

            const user = await User.findOne({
                where : { email }
            })
            if(!user){
                throw { name : "Invalid Login" }
            }

            const isValidPassword = comparePassword(password, user.password)
            if(!isValidPassword){
                throw { name : "Invalid Login" }
            }

            //generate JWT
            const accessToken = signToken({
                id : user.id,
                username : user.username
            })
       
            res.status(200).json({
                access_token : accessToken,
                username : user.username,
                role : user.role,
                id : user.id
            })
        } catch (err) {
            next(err)
        }
    }

    static async handleGoogleLogin(req, res, next){
        const { google_token } = req.headers
        try {
            const ticket = await client.verifyIdToken({
                idToken : google_token,
                audience : process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload()

            const [newUser,  created] = await User.findOrCreate({
                where : {
                    email : payload.email
                },
                defaults : {
                    username : payload.name,
                    email : payload.email,
                    password : "apaajadah",
                    role : "staff"
                },
                hooks : false
            })
            const accessToken = signToken({
                id : newUser.id,
                username : newUser.username
            });
            res.status(200).json({
                access_token : accessToken,
                username : newUser.username,
                role : newUser.role,
                id : newUser.id
            })
            
        } catch (err) {
            next(err)
        }
    }

    static async getUserById(req, res, next){
        try {
            const {id} = req.params
            const user = await User.findByPk(id)
            if (!user){
                throw { name : "Not Found"}
            } else {
                    res.status(200).json({
                        user
                    })
            }
        } catch (err){
            next(err)
        }
    }

    static async postCustomer(req, res, next){
        const {username, email, password, phoneNumber, address} = req.body
        console.log(req.body);
        try{
            const newUser = await User.create({
                username, email, password, role : "customer", phoneNumber, address
            })
            res.status(201).json({
                username : newUser.username,
                email : newUser.email,
                role : newUser.role,
                phoneNumber : newUser.phoneNumber,
                address : newUser.address
            })
        } catch (err){
            next(err)
        }
    }
    
    static async handleCustomerGoogleLogin(req, res, next){
        const { google_token } = req.headers
        try {
            const ticket = await client.verifyIdToken({
                idToken : google_token,
                audience : process.env.GOOGLE_CLIENT_ID
            })

            const payload = ticket.getPayload()

            const [newUser,  created] = await User.findOrCreate({
                where : {
                    email : payload.email
                },
                defaults : {
                    username : payload.name,
                    email : payload.email,
                    password : "apaajadah",
                    role : "staff"
                },
                hooks : false
            })
            const accessToken = signToken({
                id : newUser.id,
                username : newUser.username
            });
            res.status(200).json({
                access_token : accessToken,
                username : newUser.username,
                role : newUser.role,
                id : newUser.id
            })
            
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController