const express = require("express");
const userController = require("../controllers/userController");
const typeController = require("../controllers/typeController");
const lodgingController = require("../controllers/lodgingControler");
const authentication = require("../middleware/authentication");
const deleteAuthorize = require("../middleware/authorization");
const axios = require("axios")
const router = express.Router()

// Register and login Admin/staff
router.post("/register", userController.postUser)
router.post("/login", userController.handleLogin)
router.post("/google-login", userController.handleGoogleLogin)

// Register and login Costumer
router.post("/customers/register", userController.postCustomer)
router.post("/login", userController.handleLogin)
router.post("/customers/googlelogin", userController.handleCustomerGoogleLogin)

router.get("/customers/lodgings", lodgingController.getCustomerLodging)
router.get("/customers/lodgings/:id", lodgingController.getLodgingById)
router.get("/customers/types", typeController.getTypes)

router.post('/generate-qr', lodgingController.generateQrCode);

router.use(authentication) 
router.get("/users/:id", userController.getUserById)
router.post("/lodgings", lodgingController.postLodging)
router.get("/lodgings", lodgingController.getLodging)
router.patch("/lodgings/:id", deleteAuthorize, lodgingController.updateStatusLodging)
router.put("/lodgings/:id", deleteAuthorize, lodgingController.updateLodging)
router.delete("/lodgings/:id", deleteAuthorize, lodgingController.deleteLodging)
router.get("/histories", lodgingController.getHistories)

router.post("/bookmarks/:lodgingId", lodgingController.postCustomerBookmark)
router.get("/bookmarks", lodgingController.getCustomerBookmark)
router.delete("/bookmarks/:lodgingId", lodgingController.deleteBookmark)


router.post("/types", typeController.postType)
router.get("/types", typeController.getTypes)
router.delete("/types/:id", typeController.deleteType)

module.exports = router