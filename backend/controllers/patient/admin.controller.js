import { admin as Admin } from "../../models/admin.schema.js"; // Adjust path based on your structure
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Controller to register a new admin
const registerAdmin = async (req, res) => {
  const { email, password, name } = req.body; // Destructure the admin details from the request body

  try {
    // Check if the email already exists in the database
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // Create a new admin
    const newAdmin = new Admin({
      email,
      password,
      name: name || "Admin", // Default name if not provided
    });

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    newAdmin.password = await bcrypt.hash(newAdmin.password, salt);

    // Save the admin to the database
    const savedAdmin = await newAdmin.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: savedAdmin._id, email: savedAdmin.email },
      "your_secret_key", // Replace with your secret key
      { expiresIn: "1h" }
    );

    // Send token as a cookie to the frontend
    res.cookie("authToken", token, {
      httpOnly: true, // Prevent client-side access to the cookie
      secure: process.env.NODE_ENV === "production", // Ensure the cookie is sent only over HTTPS in production
      maxAge: 3600000, // 1 hour
    });

    // Return success response
    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: savedAdmin._id,
        email: savedAdmin.email,
        name: savedAdmin.name,
        createdAt: savedAdmin.createdAt,
      },
      token, // Send the token in the response as well
    });
  } catch (error) {
    // Handle any server errors
    console.error(error);
    res.status(500).json({ message: "An error occurred while registering the admin" });
  }
};

// Controller to log in an existing admin
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    // Use the matchPassword method to check if the password matches
    const isPasswordValid = await admin.matchPassword(password); // Use the method from the schema
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      "your_secret_key", // Replace with your secret key
      { expiresIn: "1h" }
    );

    // Send token as a cookie to the frontend
    res.cookie("authToken", token, {
      httpOnly: true, // Prevent client-side access to the cookie
      secure: process.env.NODE_ENV === "production", // Ensure the cookie is sent only over HTTPS in production
      maxAge: 3600000, // 1 hour
    });

    // Respond with success
    res.status(200).json({
      message: "Login successful",
      token, // Return the token in the response as well
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during login" });
  }
};
export {
  registerAdmin,
  loginAdmin
};
