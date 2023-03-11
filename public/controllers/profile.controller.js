const profilelist = require('../models/profileList.js')
const subjectlist = require('../models/subjectModel.js')
const bcrypt = require('bcrypt')

exports.homePage = (req, res) =>{
    res.render('index')
}

exports.signUpPage = (req, res) => {
    res.render('signUp', {msg: ""})
}


exports.createAccount = (req, res) => {
    profilelist.findOne({email: req.body.email}).then(data=>{
        const getPassword = req.body.password
        if(data){
            res.render("signUp", {msg: "User Have Already"})
        }
        else if(req.body.password != req.body.confirmPassword){
            res.render("signUp", {msg: "Password not match"})
        }
        else if(req.body.name == "" || req.body.roles == "" || req.body.department == ""){
            res.render("signUp", {msg: "Please Complete Field"})
        }
        else if(getPassword.length < 6){
            res.render("signUp", {msg: "password must be more than 6"})
        }
        else{
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
    
            const newUser = new profilelist(data)
            newUser.save()
            // profilelist.insertMany([data])
            res.redirect("/")
        }
    }).catch(err => {
        return res.status(500).json({
            msg: "เกิดข้อผิดพลาด เนื่องจาก : " + err.message
        })
    })
    
}

exports.updateProfile = (req, res) =>{
    if(req.body.checkFood == "on" || req.body.checkPhone == "on" || req.body.checkMedicine == "on"){
        req.body.checkFood = "private"
        req.body.checkPhone = "private"
        req.body.checkMedicine = "private"
    }
    else{
        req.body.checkFood = "public"
        req.body.checkPhone = "public"
        req.body.checkMedicine = "public"
    }
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
        privacy:[req.body.checkPhone, req.body.checkFood, req.body.checkMedicine]
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
