const {User, Lodging, Type} = require("../models")

class TypeController{
    static async postType(req, res, next){
        const {name} = req.body
        try {
            const newType = await Type.create({name})
            res.status(201).json({
                newType
            })
        } catch (err) {
            next(err)
        }
    }

    static async getTypes(req, res, next){
        try {
            const types = await Type.findAll()
            res.status(200).json({
                types
            })
        } catch (err) {
            next(err)
        }
    }

    static async deleteType(req, res, next){
        try {
            const {id} = req.params
            const deletedType = await Type.destroy({
                where : {
                    id : +id
                }
            })
            if (!deletedType){
                throw {name : "Not Found"}
            } else {
                res.status(200).json({
                    message :  `Type with id : ${id}, succes to delete`
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TypeController