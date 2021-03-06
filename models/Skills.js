const mongoose = require("mongoose")

const skillsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Provide a name."
    },
    category: {
        type: String,
        trim: true,
        required: "Provide a category."
    },
    proficiency: {
        type: Number,
        required: "Provide a proficiency level."
    },
    pinned: {
        type: Boolean,
        default: false
    },
    details: [{
        type: mongoose.Schema.Types.Mixed,
    }],
})

const Skills = mongoose.model("skills", skillsSchema, "skills")

module.exports = Skills
