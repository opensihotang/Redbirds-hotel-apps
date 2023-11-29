const { Op } = require("sequelize");
const { User, Lodging, Type, History, Bookmark } = require("../models");
const axios = require("axios")
// import axios from "axios";

class LodgingController {
  static async postLodging(req, res, next) {
    try {
      const { name, facility, roomCapacity, imgUrl, location, price, typeId } = req.body;
      const newLodging = await Lodging.create({
        name,
        facility,
        roomCapacity: +roomCapacity,
        imgUrl,
        authorId: req.user.id,
        location,
        price: +price,
        typeId: +typeId,
      });
      await History.create({
        updatedBy: req.user.username,
        name: newLodging.name,
        description: `new entity with id: ${newLodging.id} created`,
      });
      // console.log(req.user);
      res.status(201).json({
        newLodging,
      });
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async getLodging(req, res, next) {
    try {
      const lodgings = await Lodging.findAll({
        include: [Type, User],
        order: [["id", "ASC"]],
      });
      res.status(200).json({
        lodgings,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getLodgingById(req, res, next) {
    try {
      const { id } = req.params;
      const lodging = await Lodging.findByPk(id, {
        include: [User],
      });
      if (!lodging) {
        throw { name: "Not Found" };
      } else {
        res.status(200).json({
          lodging,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async updateLodging(req, res, next) {
    try {
      const { id } = req.params;
      const { name, facility, roomCapacity, imgUrl, location, price, typeId } =
        req.body;
      // console.log(req.body);
      const [updatedLodging] = await Lodging.update(
        {
          name,
          facility,
          roomCapacity: +roomCapacity,
          imgUrl,
          authorId: req.user.id,
          location,
          price: +price,
          typeId: +typeId,
          status: "Active",
        },
        { where: { id } }
      );

      if (!updatedLodging) {
        throw { name: "Not Found" };
      } else {
        const updatedLodging = await Lodging.findByPk(id);
        await History.create({
          updatedBy: req.user.username,
          name: updatedLodging.name,
          description: `Lodging with id : ${id}, has been updated`,
        });
        res.status(200).json({
          message: `Lodging with id : ${id}, has been updated`,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async updateStatusLodging(req, res, next) {
    try {
      const { id } = req.params;
      const { newstatus } = req.body;
      console.log(id, newstatus, "terbaru braderrrr");
      const oldLodging = await Lodging.findByPk(id);
      const [updatedStatus] = await Lodging.update(
        { status: newstatus },
        { where: { id: id } }
      );
      if (!updatedStatus) {
        throw { name: "Not Found" };
      } else {
        const updatedLodging = await Lodging.findByPk(id);
        await History.create({
          updatedBy: req.user.username,
          name: updatedLodging.name,
          description: `Lodging with id : ${id}, has been updated from ${oldLodging.status} to ${newstatus}`,
        });
        console.log(req.user);
        res.status(200).json({
          message: `Lodging with id : ${id}, has been updated from ${oldLodging.status} to ${newstatus}`,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteLodging(req, res, next) {
    try {
      const { id } = req.params;
      const deletedLodging = await Lodging.destroy({
        where: {
          id: id,
        },
      });
      if (!deletedLodging) {
        throw { name: "Not Found" };
      } else {
        res.status(200).json({
          message: `Lodging with id : ${id}, succes to delete`,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async getHistories(req, res, next) {
    try {
      const histories = await History.findAll({
        order: [["createdAt", "desc"]],
      });
      if (!histories) {
        throw { name: "Not Found" };
      } else {
        res.status(200).json({
          histories,
        });
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getCustomerLodging(req, res, next) {
    try {
      const page = req.query.page || 1;
      const { searchLocation, filterType } = req.query;
      const dataPerPage = 9;

      const offsetValue = (page - 1) * dataPerPage;

      let whereCondition = {
        status: "Active",
      };

      if (searchLocation) {
        whereCondition.location = {
          [Op.iLike]: `%${searchLocation}%`,
        };
      }

      if (filterType) {
        whereCondition.typeId = filterType;
      }

      const { count, rows } = await Lodging.findAndCountAll({
        where: whereCondition,
        limit: dataPerPage,
        offset: offsetValue,
        include: [Type, User],
        order: [["id", "ASC"]],
      });

      res.status(200).json({
        currentPage: page,
        totalPage: Math.ceil(count / dataPerPage),
        data: rows,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postCustomerBookmark(req, res, next) {
    try {
      const { lodgingId } = req.params
      const userId = req.user.id

      const existBookmark = await Bookmark.findOne({
        where : {
          LodgingId : lodgingId,
          AuthorId : userId
        }
      })
      if(existBookmark){
        throw{name: "Data Exist"}
      }

      const newBookmark = await Bookmark.create({
        AuthorId : userId,
        LodgingId : +lodgingId
      })
      if(!newBookmark){
         throw{name : "Not Found"}
        }
      res.status(201).json({
        newBookmark
      })
    } catch (err) {
      next(err)
      console.log(err, "error controller");
    }
  }

  static async getCustomerBookmark(req, res, next){
    try {
      const userId = req.user.id
      const bookmarks = await Bookmark.findAll({
        where : {
          AuthorId : userId
        }, include :{ 
          model : Lodging,
          include: [ Type ] 
        }
      })
      if(!bookmarks){
        throw{name : "Not Found"}
      }
      res.status(200).json({
        bookmarks
      })
    } catch (err) {
      next(err)
      console.log(err);
    }
  }

  static async deleteBookmark(req, res, next){
    try {
      const { lodgingId } = req.params
      const userId = req.user.id
      const deletedBookmark = await Bookmark.destroy({
        where : { 
          AuthorId: userId,
          LodgingId : +lodgingId}
      })
      console.log();
      res.status(200).json({
        deletedBookmark,
        message : "Deleted Success"
      })
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async generateQrCode (req, res, next) {
    try {
      const { qr_code_text } = req.body; 
      const accessToken = 'D8nk5Nl9FUJqEFU6riwbiS53sn0qKmPsPCSWh67rt3H2GtQBBI0aagiUVO3HAJNt';
      // const qrCodeText = 'https://www.qr-code-generator.com/'
      const response = await axios.post(
        `https://api.qr-code-generator.com/v1/create?access-token=${accessToken}`,
        {
          frame_name: "no-frame",
          qr_code_text: qr_code_text,
          image_format: "SVG",
          qr_code_logo: "scan-me-square",
          background_color: "#ffffff",
          foreground_color: "#fa6e79",
        }
      );
      res.send(response.data);
    } catch (err) {
      next(err)
      console.log(err);
    }
  }
}

module.exports = LodgingController;
