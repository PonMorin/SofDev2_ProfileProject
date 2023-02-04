const profilelist = require('../models/profileList.js')

exports.index = (req, res) => {
    res.render('index')
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
