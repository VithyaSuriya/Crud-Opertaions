const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.post("/create", userController.create);
router.get("/allusers", userController.findAll);
router.get("/:id", userController.findOne);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
