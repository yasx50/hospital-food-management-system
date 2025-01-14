import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Create a schema for Admin
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please use a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
  },
  name: {
    type: String,
    trim: true,
    default: "Admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the admin
AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords during login
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  const isMatch = await bcrypt.compare(enteredPassword, this.password);
  console.log(`Password match: ${isMatch}`); // Debugging log
  return isMatch;
};

const admin = mongoose.model("Admin", AdminSchema);
export { admin };
