const mongoose = require("mongoose")

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
    description: {
        type: String,
        trim: true
    },
    imagePath: {
        type: String,
        trim: true
    },
    references: [{
        type: Schema.Types.ObjectId,
        ref: "References"
    }]
})

const WorkHistory = mongoose.model("workHistory", workHistorySchema)

module.exports = WorkHistory
