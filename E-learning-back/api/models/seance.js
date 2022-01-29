const mongoose = require("mongoose");

const seanceSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String },
  enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enseignant",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  type: { type: String },
  dateDebut: { type: Date },
  dateFin: { type: Date },
});

module.exports = mongoose.model("Seance", seanceSchema);
