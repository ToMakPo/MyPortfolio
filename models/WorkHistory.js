const mongoose = require("mongoose")
const References = require('./References')
const Certifications = require('./Certifications')

const workHistorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: "Provide a title."
    },
    company: {
        type: String,
        trim: true,
        required: "Provide a company."
    },
    employmentType: {
        type: String,
        required: "Provide an employment type."
    },
    location: {
        type: String,
        trim: true
    },
    startDate: {
        type: Date,
        required: "Provide a start date."
    },
    endDate: {
        type: Date
    },
    description: [{
        type: mongoose.Schema.Types.Mixed
    }],
    imagePath: {
        type: String,
        trim: true
    },
    references: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "References"
    }],
    certifications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certifications"
    }]
})

const WorkHistory = mongoose.model("workHistory", workHistorySchema, "workHistory")

module.exports = WorkHistory
