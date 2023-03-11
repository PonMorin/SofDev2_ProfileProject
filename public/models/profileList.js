const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema(
    {
        // userID: Number,
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        roles: String,
        details: {
            department: String,
            nickname: String,
            phoneNumber: String,
            LineID: String,
            grade: Number,
            foodAllergy: String,
            medicineAllergy: String,
        },
        privacy:[String],
        tag: [String],
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('UserProfile', ProfileSchema)

