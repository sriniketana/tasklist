const app = require('express')()
var passport = require('passport-mfp-token-validation').Passport;
var mfpStrategy = require('passport-mfp-token-validation').Strategy;

var MF_PROTOCOL = 'http';
var MF_HOST = 'mfdevex.us-south.containers.appdomain.cloud'; 
var MF_PORT = '80'; 

var authServerURL = MF_PROTOCOL + "://" + MF_HOST + ":" + MF_PORT + "/mfp/api" ; 
passport.use(new mfpStrategy({
  authServerUrl: authServerURL,
  confClientID: 'test',
  confClientPass: 'test',
  analytics: {
      onpremise: {
          url: 'http://localhost:9080/analytics-service/rest/v3',
          username: 'admin',
          password: 'admin'
      }
  }
}));
app.use(passport.initialize());


app.get('/', (req, res) => {
  res.send("Hello from Appsody!");
});


app.get('/tasklist', passport.authenticate('mobilefirst-strategy', {
    session: false,
    scope: 'accessRestricted'
}),
function(req, res) {
    var tasks = [
      {
          "_id":"1",
          "task":"buy milk",
          "task_details":"6 packets",
          "due_date":"21 Oct 2019",
          "is_complete":true
      },
      {
          "_id":"2",
          "task":"buy cookies",
          "task_details":"4 packets",
          "due_date":"21 Nov 2019",
          "is_complete":false
      }
      ];  
    res.send(tasks);
});

 
module.exports.app = app;
