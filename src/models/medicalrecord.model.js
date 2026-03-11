const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "patient",
            required: true
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "doctor",
            required: true
        },

        appointment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "appointment"
        },

        diagnosis: {
            type: String
        },

        prescription: [
            {
                medicine: String,
                dosage: String,
                duration: String
            }
        ],

        reports: [
            {
                fileUrl: String,
                uploadedAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ],

        notes: {
            type: String
        },

        isDeleted: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

// hide deleted records automatically
medicalRecordSchema.pre(/^find/, function (next) {
    this.find({ isDeleted: false });
    //   next();
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);