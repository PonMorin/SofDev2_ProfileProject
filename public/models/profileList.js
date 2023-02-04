const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema(
    {
        // userID: Number,
        name: String,
        email: String,
        password: Number,
        roles: String,
        details: {
            nickname: String,
            phoneNumber: String,
            LineID: String,
            grade: Number,
            foodAllergy: String,
            medicineAllergy: String,
        },
        tag: [String]
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('UserProfile', ProfileSchema)

