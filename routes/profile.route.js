module.exports = (app) => {
    const profilelist = require("../public/controllers/profile.controller.js")
    app.get('/signUpPage', profilelist.signUpPage);
    app.post('/updateProfile/:profileId', profilelist.updateProfile)
    app.post('/createAccount', profilelist.createAccount);
    app.get('/api/profile', profilelist.findAll);
    // app.get('/showProfile/details/:profileId', profilelist.showDetail);
    app.post('/showProfile/details/addTag/:profileId', profilelist.addTag);
}