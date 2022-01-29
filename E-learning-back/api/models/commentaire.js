const mongoose = require("mongoose");

const commentaireSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  description: { type: String },
  enseignant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enseignant",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
 
  date: { type: Date },
  
});

module.exports = mongoose.model("Commentaire", commentaireSchema);
