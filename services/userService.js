const User = require("../models/userModel");

class UserService {
  async createUser(data) {
    const user = new User(data);
    return await user.save();
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async updateById(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteById(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserService();
