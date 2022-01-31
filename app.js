const request = require("request");
const bodyParser = require("body-parser");
const express = require("express");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/failure", function(req,res) {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function() {
  console.log("server is running on port 3000.");
})

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  const firstName = req.body.fname;
  const lastName = req.body.lname;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME : firstName,
          LNAME : lastName,
          }
        }
        ]
      };

  const jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/dcd886ae21";
  const options = {
    method:"POST",
    auth:"tianguyen1:1842885b6db50aba1f2c8b7bf5f4f4a0-us14",
  }
  const request = https.request(url,options,function(response) {
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});


// API keys 1842885b6db50aba1f2c8b7bf5f4f4a0-us14

// List Id dcd886ae21
