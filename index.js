const Warrant = require("@warrantdev/warrant-node");
const { response } = require("express");
var express = require('express');
var app = express();


const warrantClient = new Warrant.Client({
   apiKey: "api_prod_gpXCqIfZRJc69Pee1zM2jvfMORmfd1R-YNqPdnvOKVs=",
   authorizeEndpoint: "http://172.31.88.220:3000/"
 });

 app.get('/warrant-apis', function (req, res) {
   warrantClient
    .createWarrant({ objectType: "ac", objectId: "2", relation: "owner", subject: { objectType: "user", objectId: "srini" } })
    .then((newWarrant) => console.log(newWarrant))
    .catch((error) => console.log(error));

    res.send("Completed operation")
})

app.get('/', function (req, res) {
   warrantClient
    .isAuthorized({
        warrants: [{
            objectType: "light",
            objectId: "1", 
            relation: "owner", 
            subject: {
                objectType: "user",
                objectId: "ram"
            }
        }]
    })
  .then((isAuthorized) => {
    if (isAuthorized) {
      console.log("Authorized")
      res.send('Hello World');
    }else {
      console.log("Not authorized to perform operation")
    }
  })
  .catch((error) => console.log(error));
})


app.get('/light/:state', function (req, res) {
   let user = req.headers.user;
   let state = req.params.state;
   warrantClient
    .isAuthorized({
        warrants: [{
            objectType: "light",
            objectId: "1", 
            relation: "owner", 
            subject: {
                objectType: "user",
                objectId: user
            }
        }]
    })
  .then((isAuthorized) => {
    if (isAuthorized) {
      console.log("Authorized")
      if(state === "on") {
         res.send("Light state changed: on")
      } else {
         res.send("Light state changed: off")
      }
    }else {
      console.log("Not authorized to perform operation")
      res.status(500).send('User is not authorized to perform this operation');

    }
  })
  .catch((error) => console.log(error));
})

app.get('/ac/:state', function (req, res) {
   let user = req.headers.user;
   let state = req.params.state;
   warrantClient
    .isAuthorized({
        warrants: [{
            objectType: "ac",
            objectId: "2", 
            relation: "owner", 
            subject: {
                objectType: "user",
                objectId: user
            }
        }]
    })
  .then((isAuthorized) => {
    if (isAuthorized) {
      console.log("Authorized")
      if(state === "on") {
         res.send("AC state changed: on")
      } else {
         res.send("AC state changed: off")
      }
    }else {
      console.log("Not authorized to perform operation")
      res.status(500).send('User is not authorized to perform this operation');

    }
  })
  .catch((error) => console.log(error));
})

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Edge app listening at port 8080", host, port)
})
