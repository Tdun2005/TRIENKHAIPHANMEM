const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Kiểm tra email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email đã tồn tại" });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "giaovien",
    });

    res.status(201).json({ message: "Đăng ký thành công", user });
  } catch (err) {
    res.status(500).json({ error: "Đăng ký thất bại", details: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Tài khoản không tồn tại" });

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Sai mật khẩu" });

    // Tạo token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    res.json({ message: "Đăng nhập thành công", token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: "Đăng nhập thất bại", details: err.message });
  }
};
