const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  async createUser(data) {
    try {
      const existing = await User.findOne({ email: data.email });
      if (existing) {
        return {
          success: false,
          message: "User already exists",
        };
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;

      const user = new User(data);
      await user.save();

      return { success: true, data: user };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async loginUser(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          success: false,
          message: "Invalid credentials",
        };
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return {
        success: true,
        data: { user, token },
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getAllUsers() {
    try {
      const users = await User.find();
      return {
        success: true,
        data: users,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findById(id);
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }
      return {
        success: true,
        data: user,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async updateById(id, data) {
    try {
      if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
      }

      const user = await User.findByIdAndUpdate(id, data, { new: true });
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }
      return {
        success: true,
        data: user,
      };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }

  async deleteById(id) {
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return {
          success: false,
          message: "User not found",
        };
      }
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
}

module.exports = new UserService();
