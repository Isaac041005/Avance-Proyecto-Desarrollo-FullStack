const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: [true, "El nombre de usuario es obligatorio"], unique: true },
  password: { type: String, required: [true, "La contraseña es obligatoria"] }
});

// 📌 Encriptar la contraseña antes de guardar
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
