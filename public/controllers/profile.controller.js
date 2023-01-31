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