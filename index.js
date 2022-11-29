const express = require('express');
const mongoose = require('mongoose');
const EventEmitter = require('events');
// const https = require('https');
require('dotenv').config();

const {MongoLink} = require('./Sheared/exports_file');

mongoose.connect(MongoLink, {useNewUrlParser: true, useUnifiedTopology:true,useCreateIndex: true,})
    .then(() => console.log("Connected to MongoDB"))
    .catch(() => console.log("Could not connect to MongoDB"));

const app = express();
const event = new EventEmitter();
event.setMaxListeners(0);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use((req, res, next ) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization,token ") 
    if(req.method === "OPTIONS")
    {
        res.header("Access-Control-Allow-Methods","PUT, POST, GET, PATCH, DELETE")
        return res.status(200).json({})
    }
    next()
})


  app.get('/test', function (req, res) {
    return res.send("serverRunning")
 });

app.use("/News",require('./Routes/News'))
app.use("/Videos",require('./Routes/Videos'))
app.use("/Image",require('./Routes/ImageShow'))
app.use("/Doctor",require('./Routes/Doctor'))
app.use("/Login",require('./Routes/Login'))
app.use("/appt",require('./Routes/Appointment'))
app.use("/page-visit",require('./Routes/Trace.route'))


// const httpsServer = https.createServer({
//     key: fs.readFileSync('../../../entira_ssl/935ebe6c4e73af62.pem'),
//     cert: fs.readFileSync('../../../entira_ssl/935ebe6c4e73af62.crt'),
//     ca: fs.readFileSync('../../../entira_ssl/gd_bundle-g2-g1.crt'),
//   }, app);


const port = process.env.PORT || 5005;
app.listen( port, () => console.log('Express server started at port : ' + port) );

// httpsServer.listen(port, () => {
//     console.log('HTTPS Server running on port 5005');
// });


