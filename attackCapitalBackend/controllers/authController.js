import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { signupSchema } from "../utils/validators.js";

export const signup = async (req, res) => {
  try {
    const validatedUser = signupSchema.parse(req.body);
    const passwordHash = await bcrypt.hash(validatedUser.password, 10);
    const user = new User({ email: validatedUser.email, passwordHash });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.errors || "Invalid data" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password, "here is the data");
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.cookie("token", token, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ token, user: { id: user.id, email: user.email } });
};
