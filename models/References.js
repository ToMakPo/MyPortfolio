const mongoose = require("mongoose")

const referencesSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: "Provide a name for the person."
    },
    title: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    emailAddress: {
        type: String,
        trim: true
    },
    otherFormsOfContact: [{
        contactType: {
            type: String,
            trim: true,
            required: "Provide the type of contact."
        },
        info: {
            type: String,
            trim: true,
            required: "Provide the contact information."
        },
        icon: {
            type: Object
        }
    }] 
})

const References = mongoose.model("references", referencesSchema)

module.exports = References
