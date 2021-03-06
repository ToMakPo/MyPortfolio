const mongoose = require("mongoose")
const References = require('./References')
const Certifications = require('./Certifications')

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
    // certifications: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Certifications"
    // }]
})

const Education = mongoose.model("education", educationSchema, "education")

module.exports = Education
