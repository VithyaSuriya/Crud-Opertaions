const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validate = require("../middleware/validate");
const {userSchema,loginSchema, idSchema } = require("../validations/userValidation");
const auth=require("../middleware/auth")
const upload=require("../middleware/upload")

router.post("/:id/upload", upload,userController.uploadImage);
router.post("/create", validate(userSchema, "body"), userController.create);
router.post("/login", validate(loginSchema, "body"), userController.login);
router.get("/allusers", auth,userController.findAll);
router.get("/:id",auth, validate(idSchema, "params"), userController.findOne);
router.put("/:id", auth,validate(idSchema, "params"), userController.update);
router.delete("/:id",auth, validate(idSchema, "params"), userController.delete);

module.exports = router;
