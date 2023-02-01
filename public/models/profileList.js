const mongoose = require('mongoose')

const ProfileSchema = mongoose.Schema(
    {
        // userID: Number,
        email: String,
        details: {
            name: String,
            phoneNumber: String,
            foodAllergy: String,
            medicineAllergy: String,
        }
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('UserProfile', ProfileSchema)

