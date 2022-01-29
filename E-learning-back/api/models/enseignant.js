const mongoose = require("mongoose");

const enseignantSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userType: {
    type: mongoose.Schema.Types.String,
    default: "teacher",
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  matter: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },

  seances: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Seance",
    required: false,
  },
});

module.exports = mongoose.model("Enseignant", enseignantSchema);
