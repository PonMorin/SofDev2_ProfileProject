const express = require('express')
const cookieParser = require('cookie-parser')
const sessions = require('express-session')

const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dbConfig = require('./config/mongodb.config.js')
const Profile = require('./public/models/profileList.js')
const Subject = require('./public/models/subjectModel.js')

const cors = require('cors')
const app = express()

app.use(express.static("public"));

app.set('views', './views');
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: {maxAge: oneDay},
    resave: false
}))

app.use(cookieParser())

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

var session
//route to other page
app.get('/', (req,res) => {
    session = req.session
    if(session.email){
        res.render('index',{
            user: session
        })
    }
    else{
        res.render('login')
    }
})

app.post('/login', async(req,res) => {
    try{
        const check = await Profile.findOne({email: req.body.email})
        if(check.password === req.body.password){
            session = req.session
            session.email = req.body.email
            res.render('index',{
                user: session
            })
        }
        else{
            res.send('wrong password')
        }
    }
    catch{
        res.send('wrong details ')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

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

app.get('/editProfile', async(req, res) => {
    session = req.session
    const userEmail = session.email
    if (session.email) {
        const getData = await Profile.findOne({email: userEmail})
        res.render("editProfile", {
            data: getData
        });
    } else {
        console.log('Failed to retrieve the Course List: ');
    }
})

app.get('/gradeSim', async(req, res) => {
    session = req.session
    const userEmail = session.email
    const selectYear = "Year1"
    const selectTerm = "Term1"
    if (session.email) {
        const getData = await Profile.findOne({email: userEmail})
        const getSubject = await Subject.findOne({department: getData.details.department})
        res.render("gradesimulation", {
            user: getData,
            subject: getSubject,
            selectyear: selectYear,
            selectterm: selectTerm
        });
    } else {
        console.log('Failed to retrieve the Course List: ');
    }
})

app.post('/gradeSim/gradesimulation', async(req, res) => {
    session = req.session
    const userEmail = session.email
    const selectYear = req.body.year
    const selectTerm = req.body.term
    if (session.email) {
        const getData = await Profile.findOne({email: userEmail})
        const getSubject = await Subject.findOne({department: getData.details.department})
        res.render("gradesimulation", {
            user: getData,
            subject: getSubject,
            selectyear: selectYear,
            selectterm: selectTerm
        });
    } else {
        console.log('Failed to retrieve the Course List: ');
    }
})


app.get('*', (req, res) => {
    res.render("404")
})

// function initSubject(){
//     let data = [
//         {
//             department: "Computer Engineering",
//             subjectYear1:{
//                 subjectTerm1: {
//                     subjectName: ["ฟิสิกส์"],
//                     credit: [3]
//                 },
//                 subjectTerm2: {
//                     subjectName: ["ทฤษฎีวงจรไฟฟ้า"],
//                     credit: [3]
//                 }
//             },
//             subjectYear2:{
//                 subjectTerm1: {
//                     subjectName: ["โครงสร้างของระบบคอมพิวเตอร์ "],
//                     credit: [3]
//                 },
//                 subjectTerm2: {
//                     subjectName: ["การพัฒนาระบบซอฟต์แวร์ 2"],
//                     credit: [2]
//                 }
//             },
//             subjectYear3:{
//                 subjectTerm1: {
//                     subjectName: ["Network", "AI"],
//                     credit: [3, 2]
//                 },
//                 subjectTerm2: {
//                     subjectName: ["ฝึกงาน"],
//                     credit: [4]
//                 }
//             },
//             subjectYear4:{
//                 subjectTerm1: {
//                     subjectName: ["Security"],
//                     credit: [2]
//                 },
//                 subjectTerm2: {
//                     subjectName: ["Project"],
//                     credit: [3]
//                 }
//             },
//         }
//     ]

//     for(let i = 0; i < data.length; i++){
//         const s = new Sunject(data[i]);
//         s.save()
//     }
//     console.log("สร้าง Subject สำเร็จแล้ว")
// }