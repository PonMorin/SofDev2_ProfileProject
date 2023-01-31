const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dbConfig = require('./config/mongodb.config.js')
const Profile = require('./public/models/profileList.js')

const cors = require('cors')
const app = express()

app.use(express.static("public"));

app.set('views', './views');
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

//connect to database
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url).then(() => {
    console.log("Connect DataBase")
}).catch(err => {
    console.log("Cannot Connect to MongoDB")
    process.exit()
})

//connect to server
app.use(cors())
require('./routes/profile.route.js')(app);

const server = app.listen(3000, ()=>{
    let port = server.address().port
    console.log('Run at http://localhost:%s', port)
})

//route to other page
app.get('/showProfile', (req, res) => {
    Profile.find((err, docs) => {
        if (!err) {
            res.render("showProfile", {
                data: docs
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
})

// app.get('/:productId', function(req, res, next) {
//     var email = req.params.email;
//     var user = data.filter(u => u.email == email );
//     return res.json({ message: 'Users Show', data: user });
// });
