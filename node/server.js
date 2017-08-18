console.log("node app running")
const express = require('express'); 
const nodemailer = require('nodemailer');
var cors = require('cors');
var https = require('https');
var bodyParser = require('body-parser');
var config = require('./config');
const app = express(); 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
app.use(cors({origin: 'http://slapps.fr:8100'}));
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: config.id,
        pass: config.pwd
    }
});
var options = {
    host: 'redbutton_loopback.slapps.fr',
    port: 3000,
    path: '/api/Templates',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
    rejectUnauthorized: false,
};
app.post('/', (req, res) => {
    //TODO user id validation ? 
    //TODO GET EMAIL
    var email = req.body.email;
    console.log(req.body);
    var userId = req.body.userId;
    console.log(userId);
    var req2 = https.request(options, (res2) => {
        var output = '';
        res2.setEncoding('utf8');
        res2.on('data', function (chunk) {
            output += chunk;
        });
        res2.on('end', function() {
            var obj = JSON.parse(output);
            //onResult(res.statusCode, obj);
            var recipient;
            var message;
            var subject;
            for(var i=0;i<obj.length;i++){
                var t = obj[i];
                if(t.userId == userId){
                    console.log(t);
                    recipient = t.recipient;
                    message = t.message;
                    subject= t.subject;
                    break;
                }
            }
            let mailOptions = {
                from: '"RedButton" <'+email+'>', // sender address
                    to: recipient, // list of receivers
                    bcc: "ste.luong@gmail.com",
                    subject: subject, // Subject line
                    //text: 'Hello, tout va bien ?', // plain text body
                    html: '<b>'+message+'</b>' // html body
            };
            console.log(mailOptions);
            if(recipient=="ste.luong@gmail.com"){
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message %s sent: %s', info.messageId, info.response);
                });
            }
            res.send('Shooting email ...');
        });
        //var user = req.body.user;
    });//GET
    req2.on('error', function(e) {
        console.error(e);
        res.send('Error...');
    });
    req2.end();
}); 
app.listen(3000, () => console.log('Server listening on port 3000!') );
