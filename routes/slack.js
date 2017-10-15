var express = require('express');
var router = express.Router();
var slack = require('slack');
require('dotenv').config();
var token = process.env.SLACK_TOKEN;
var mongoose = require('mongoose');
const async = require('async');
// var Message = require('../models/message');

var db = mongoose.connection;


router.get('/', function(req, res, next) {
  // var theChannels = ['67iutkf', 'go8t', '87ifm'];
  slack.channels.list({token: token}, (err, data) => {
    console.log(data);
    // console.log("the length of data is " + data.length);
    var theChannels = data.channels;
    res.render('slack', { tabTitle: 'history-machine', title: 'The Slack History Machine', channels: theChannels });
  });
});

router.get('/channels', function(req, res, next){
  var theResult = ['x1', 'x2', 'x3', 'x4'];
  res.render('slack/channels', { tabTitle: 'history-machine', title: 'The Slack History Machine', result: theResult })
});

router.post('/history', function(req, res, next){

  console.log("test");
  console.log(JSON.stringify(req.body.multi));
  for (var i = 0; i < req.body.multi.length; i++) {
    console.log("there is a request for history from channel " + req.body.multi[i]+ ". Which has the human-readable name, " );
  }
  slack.channels.history({token: token, channel: req.body.multi[0], count: 20}, (err, data) => {
    // console.log(JSON.stringify(data, null, 10));
    // console.log(req.body.key1);
    // var dataObject = JSON.parse(data);
    var theResult = [];
    data.messages.forEach(datum => {
        // console.log(datum.text);
        theResult.push(datum.text);
        // console.log(datum);
      });
    console.log("theResult is " + JSON.stringify(theResult, null, 8));
    res.render('slack/history', { tabTitle: 'history-machine', title: 'The Slack History Machine', result: theResult });
  });
});

router.post('/', function(req, res, next){
  console.log("test");
  slack.channels.history({token: token, channel: "C6AAGUS6T", count: 10}, (err, data) => {
    // console.log(JSON.stringify(data, null, 10));
    // console.log(req.body.key1);
    // var dataObject = JSON.parse(data);
    data.messages.forEach(datum => {console.log(datum.text);
      // new Message()
    })
    res.send('received ' + JSON.stringify(req.body) + "\ngoodbye.\n\n\n")
  });
});

// router.get('/slackhistory', function(req, res, next) {
//   res.send('this is just for post requests')});
// });

module.exports = router;