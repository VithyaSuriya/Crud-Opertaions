const userService = require("../services/userService");

class UserController {
  async create(req, res) {
    const result = await userService.createUser(req.body);

    if (!result.success) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: result.message,
      });
    }

    return res.status(201).json({
      statusCode: 201,
      success: true,
      message: "User created",
      data: result.data,
    });
  }

  async login(req, res) {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);

    if (!result.success) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: result.message,
      });
    }

    return res.json({
      statusCode: 200,
      success: true,
      message: "Login successful",
      token: result.data.token,
    });
  }

  async findAll(req, res) {
    const result = await userService.getAllUsers();

    if (!result.success) {
      return res.status(500).json({
        statusCode: 500,
        success: false,
        message: result.message,
      });
    }

    return res.json({
      statusCode: 200,
      success: true,
      message: "User fetched successfully",
      data: result.data,
    });
  }

  async findOne(req, res) {
    const result = await userService.getUserById(req.params.id);

    if (!result.success) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: result.message,
      });
    }

    return res.json({
      statusCode: 200,
      success: true,
      message: "User fetched successfully",
      data: result.data,
    });
  }

  async update(req, res) {
    const result = await userService.updateById(req.params.id, req.body);

    if (!result.success) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: result.message,
      });
    }

    return res.json({
      statusCode: 200,
      success: true,
      message: "User updated",
      data: result.data,
    });
  }

  async delete(req, res) {
    const result = await userService.deleteById(req.params.id);

    if (!result.success) {
      return res.status(404).json({
        statusCode: 404,
        success: false,
        message: result.message,
      });
    }

    return res.json({
      success: true,
      message: "User deleted",
    });
  }
  async uploadImage(req, res) {
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });

    const result = await userService.uploadUserImage(
      req.params.id,
      req.file.filename
    );
    if (!result.success)
      return res.status(404).json({ success: false, message: result.message });

    return res.json({
      success: true,
      message: "Image uploaded successfully",
      data: result.data,
    });
  }
}

module.exports = new UserController();
