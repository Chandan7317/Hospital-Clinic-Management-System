const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    specialization: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number, // in years
      required: true,
      trim: true,
    },

    consultationFee: {
      type: Number,
      required: true,
      trim: true,
    },

    qualification: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      required: true,
      trim: true,
    },

    isAvailable: {
      type: Boolean,
      default: true,
      trim: true,
    },
  },
  { timestamps: true },
);

const DoctorCollection = mongoose.model("doctor", doctorSchema);

module.exports = DoctorCollection;
