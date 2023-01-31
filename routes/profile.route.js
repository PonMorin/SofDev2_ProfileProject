module.exports = (app) => {
    const profilelist = require("../public/controllers/profile.controller.js")

    app.get('/', profilelist.index);
    app.get('/api/profile', profilelist.findAll)
    app.get('/api/profile/:profileId', profilelist.findById)
}