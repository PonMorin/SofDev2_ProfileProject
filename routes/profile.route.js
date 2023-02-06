module.exports = (app) => {
    const profilelist = require("../public/controllers/profile.controller.js")

    // app.get('/', profilelist.index);
    app.get('/signUpPage', profilelist.signUpPage);
    // app.get('/homePage', profilelist.homePage);
    // app.post('/login', profilelist.login);
    app.post('/createAccount', profilelist.createAccount);
    app.get('/api/profile', profilelist.findAll);
    app.get('/showProfile/details/:profileId', profilelist.showDetail);
    app.post('/showProfile/details/addTag/:profileId', profilelist.addTag);
}