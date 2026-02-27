const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    bloodGroup: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
      required: [true, "Phone number is required"],
      // Validates: 10-15 digits, optionally starting with +
      match: [/^\+?([0-9]{10,15})$/, "Please fill a valid phone number"],
      unique: true, // Optional: Ensures no duplicate numbers
    },

    address: {
      type: String,
      required: [true, "address is required"],
      trim: true,
    },

    medicalHistory: {
      type: String,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Automatically hide soft deleted patients
// patientSchema.pre(/^find/, function (next) {
//   this.find({ isDeleted: false });
//   // next();
// });

const PatientCollection = mongoose.model("Patient", patientSchema);

module.exports = PatientCollection;
