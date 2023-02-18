const mongoose = require('mongoose')

const SubjectSchema = mongoose.Schema(
    {
            department: String,
            subjectYear1:{
                subjectTerm1: {
                    subjectName: [String],
                    credit: [Number]
                },
                subjectTerm2: {
                    subjectName: [String],
                    credit: [Number]
                }
            },
            subjectYear2:{
                subjectTerm1: {
                    subjectName: [String],
                    credit: [Number]
                },
                subjectTerm2: {
                    subjectName: [String],
                    credit: [Number]
                }
            },
            subjectYear3:{
                subjectTerm1: {
                    subjectName: [String],
                    credit: [Number]
                },
                subjectTerm2: {
                    subjectName: [String],
                    credit: [Number]
                }
            },
            subjectYear4:{
                subjectTerm1: {
                    subjectName: [String],
                    credit: [Number]
                },
                subjectTerm2: {
                    subjectName: [String],
                    credit: [Number]
                }
            },
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model('subjectList', SubjectSchema)

