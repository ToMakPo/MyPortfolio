const mongoose = require("mongoose")

const certificationsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Provide a name."
    },
    organization: {
        type: String,
        trim: true,
        required: "Provide a organization."
    },
    credentialId: {
        type: String,
        trim: true
    },
    credentialUrl: {
        type: String,
        trim: true
    },
    issueDate: {
        type: Date,
        required: "Provide a start date."
    },
    expirationDate: {
        type: Date
    },
    description: [{
        type: mongoose.Schema.Types.Mixed
    }],
    imagePath: {
        type: String,
        trim: true
    }
})

const Certifications = mongoose.model("certifications", certificationsSchema, "certifications")

module.exports = Certifications
