const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

const gmail = google.gmail("v1");

const SCOPES = [
    "https://mail.google.com/",
    "https://www.googleapis.com/auth/gmail.modify",
    "https://www.googleapis.com/auth/gmail.compose",
    "https://www.googleapis.com/auth/gmail.send",
];

const TOKEN_PATH = "./Sheared/Email/token.json";

function authorize(credentials, callback, details) {
    const { client_secret, client_id, redirect_uris } = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );
    fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) return getNewToken(oAuth2Client, callback, details);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client, details);
    });
}

function getNewToken(oAuth2Client, callback, details) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error("Error retrieving access token", err);
            oAuth2Client.setCredentials(token);

            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) return console.error(err);
                console.log("Token stored to", TOKEN_PATH);
            });
            callback(oAuth2Client, details);
        });
    });
}

function makeBody(to,cc, from, subject, message) {
    var str = [
        'Content-Type: text/html; charset="UTF-8"\n',
        "MIME-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        "to: ",
        to,
        "\n",
        "cc: ",
        cc,
        "\n",
        "from: ",
        from,
        "\n",
        "subject: ",
        subject,
        "\n\n",
        message,
    ].join("");

    var encodedMail = new Buffer(str)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    return encodedMail;
}

function sendMessage(auth, details) {
    var raw = makeBody(
        details.mailOptions.to,
        details.mailOptions.cc,
        details.mailOptions.from,
        details.mailOptions.subject,
        details.mailOptions.body
    );
    gmail.users.messages.send(
        {
            auth: auth,
            userId: "me",
            resource: {
                raw: raw,
            },
        },
        function (err, response) {
            if (err) {
                console.log(err);
                details.res.status(400).send(err);
            } else details.res.send();
        }
    );
}

module.exports.authorize = authorize;
module.exports.sendMessage = sendMessage;

module.exports.from = "entiraclinic@gbtechservice.com";
// module.exports.to = "abiswas@gbtechservice.com";
module.exports.to = "tupaichitu@gmail.com";