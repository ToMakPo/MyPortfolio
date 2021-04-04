const mongoose = require("mongoose")

const educationSchema = new mongoose.Schema({
    school: {
        type: String,
        trim: true,
        required: "Provide a school."
    },
    degree: {
        type: String,
        trim: true,
        required: "Provide a degree."
    },
    fieldOfStudy: {
        type: String,
        trim: true
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

const Education = mongoose.model("education", educationSchema)

module.exports = Education
