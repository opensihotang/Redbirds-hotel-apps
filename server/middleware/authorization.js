const { Lodging } = require("../models")

const deleteAuthorize = async (req, res, next) => {
    try {
        const {id} = req.params
        const role = req.user.role
        const findLodging = await Lodging.findByPk(id)
        if (!findLodging){
            throw {name : "Not Found"}
        }
        if(role === "admin"){
            next()
        } else if(role === "staff" && findLodging.authorId === req.user.id){
            next()
        } else {
            next({ name : "Forbidden" })
        }
    } catch (err) {
        next(err)
    }
    }

module.exports = deleteAuthorize