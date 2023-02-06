const profilelist = require('../models/profileList.js')

// exports.index = (req, res) => {
//     session = req.session;
//     if(session.email){
//         res.render('index')
//     }
//     else{
//         res.render('login')
//     }
// }

exports.homePage = (req, res) =>{
    res.render('index')
}

exports.signUpPage = (req, res) => {
    res.render('signUp')
}

exports.createAccount = async(req, res) => {
    const data = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        roles: req.body.roles,
        details: {
            department: req.body.department
        }
    }

    await  profilelist.insertMany([data])
    res.redirect("/")
}

exports.login = async(req, res) => {
    try{
        const check = await profilelist.findOne({email: req.body.email})
        if(check.password === req.body.password){
            res.render('index')
        }
        else{
            res.send('wrong password')
        }
    }
    catch{
        res.send('wrong details ')
    }
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

exports.showDetail = (req, res) => {
    profilelist.findById(req.params.profileId).then(data=>{
        if(!data){
            return res.status(404).json({
                msg: "ไม่พบ Record รหัส : " + req.params.profilelist
            })
        }
        res.render('profileDetails', {profileDetails: data})
        // res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "เกิดข้อผิดพลาด เนื่องจาก : " + err.message
        })
    })
}

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
