const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "patient",
            required: true
        },

        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "doctor",
            required: true
        },

        appointmentId: {
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

const MedicalRecordCollection = mongoose.model("MedicalRecord", medicalRecordSchema);
module.exports = MedicalRecordCollection
