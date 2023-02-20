const profilelist = require('../models/profileList.js')
const subjectlist = require('../models/subjectModel.js')
const bcrypt = require('bcrypt')

exports.homePage = (req, res) =>{
    res.render('index')
}

exports.signUpPage = (req, res) => {
    res.render('signUp')
}


exports.createAccount = async(req, res) => {
    const passwordHash = bcrypt.hashSync(req.body.password, 10)
    const data = {
        email: req.body.email,
        name: req.body.name,
        password: passwordHash,
        roles: req.body.roles,
        details: {
            department: req.body.department,
        }
    }

    await  profilelist.insertMany([data])
    res.redirect("/")
}

exports.updateProfile = (req, res) =>{
    profilelist.findByIdAndUpdate(req.params.profileId, {$set: {
        name: req.body.name,
        details:{
            department: req.body.department,
            nickname: req.body.nickname,
            phoneNumber: req.body.phoneNumber,
            LineID: req.body.lineID,
            grade: req.body.grade,
            foodAllergy: req.body.foodAllergy,
            medicineAllergy: req.body.medicineAllergy,
        },
    }}, {new: true})
    .then(data =>{
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ Record รหัส : " + req.params.profileId
            })
        }
        else{
            console.log("Update Complete")
            res.redirect("/")
        }
    }).catch(err => {
        return res.status(500).json({
            msg: "ไม่สามารถ Update ข้อมูลได้ เนื่องจาก : " + err.message
        })
    })
}

exports.findAll = (req, res) => {
    profilelist.find().then(data =>{
        res.json(data)
    }).catch(err => {
        res.status(500).send({
            msg: err.msg
        })
    })
}

// exports.showDetail = (req, res) => {
//     profilelist.findById(req.params.profileId).then(data=>{
//         if(!data){
//             return res.status(404).json({
//                 msg: "ไม่พบ Record รหัส : " + req.params.profilelist
//             })
//         }
//         res.render('profileDetails', {profileDetails: data})
//         // res.json(data)
//     }).catch(err => {
//         return res.status(500).json({
//             msg: "เกิดข้อผิดพลาด เนื่องจาก : " + err.message
//         })
//     })
// }

exports.addTag = (req, res) => {
    profilelist.findByIdAndUpdate(req.params.profileId, {$addToSet: {tag:req.body.tag }}, {new: true})
    .then(data =>{
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ Record รหัส : " + req.params.profileId
            })
        }
        else{
            console.log("success")
            res.redirect("/showProfile")
        }
    }).catch(err => {
        return res.status(500).json({
            msg: "ไม่สามารถ Update ข้อมูลได้ เนื่องจาก : " + err.message
        })
    })
}
