const mongoose = require("mongoose")

const projectsSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Provide a name for the project."
    },
    description: {
        type: String,
        trim: true,
        required: "Provide a description of the project."
    },
    details: {
        goal: {
            type: String,
            trim: true
        },
        tasks: {
            type: String,
            trim: true
        },
        skills: [{
            type: Schema.Types.ObjectId,
            ref: "skills"
        }],
    },
    repoUrl: {
        type: String,
        trim: true
    },
    liveLink: {
        type: String,
        trim: true
    },
    demoLink: {
        type: String,
        trim: true
    },
    references: [{
        type: Schema.Types.ObjectId,
        ref: "References"
    }]
})

const Projects = mongoose.model("projects", projectsSchema)

module.exports = Projects
