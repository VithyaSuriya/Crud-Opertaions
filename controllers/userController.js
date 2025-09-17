const userService = require("../services/userService");

class UserController {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json({
        message: "User Created",
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        message: "Bad request",
        error: err.message,
      });
    }
  }

  async findAll(req, res) {
    const users = await userService.getAllUsers();
    res.json(users);
  }

  async findOne(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user)
        return res.status(404).json({
          message: "User not found",
        });

      res.json(user);
    } catch (err) {
      res.status(400).json({
        message: "Bad request",
        error: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const user = await userService.updateById(req.params.id,req.body);
      if (!user)
        return res.status(404).json({
          message: "User not found",
          error: err.message,
        });

      res.json({
        message: "User updated",
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        message: "Bad request",
      });
    }
  }
  async delete(req, res) {
    try {
      const user = await userService.deleteById(req.params.id);
      if (!user)
        return res.status(404).json({
          message: "User not found",
          error: err.message,
        });
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(400).json({
        message: "Bad request",
        error: err.message,
      });
    }
  }
}

module.exports = new UserController();
