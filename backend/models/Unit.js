const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema({
  title: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
});

module.exports = mongoose.model("Unit", UnitSchema);
