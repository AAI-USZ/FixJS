function(){
  "use strict";
  var https     = require("https"),
      sendgrid  = require("sendgrid").SendGrid,
      _         = require("underscore"),
      websocket = require("websocket").client,
      async     = require("async"),
      config    = require('nconf').argv().env().file({file:'./config.json'});

  var eids = [];

  var host = config.get("server_host");

  sendgrid = new sendgrid(config.get("sendgrid_user"), config.get("sendgrid_pass"));
  
  exports.Start = function(schemas){
    async.parallel([
      startPolling,
      function(cb){ getMeetups(schemas, cb) }
    ]);
  };

  function getMeetups(schemas, cb){
    schemas.Meetup.find({time: {$gt: new Date().getTime()}}, function(err, meetups){
      for (var i = 0; i < meetups.length; i++){
        eids.push(meetups[i].meetup_id);
      }
      cb();
    });
  }

  function startPolling(cb){
    console.log("start");
    var client = new websocket();
    client.on("connect", function(connection){
      connection.on("error", function(err){
        console.log("fuck", err);
      });
      connection.on("message", function(message){
        console.log("got message");
        var d = JSON.parse(message.utf8Data);
        console.log("got message", eids, d.event.event_id, d.event.event_url);
        if (_.include(eids, d.event.event_id)){
          console.log("included");
          if (d.response == "yes"){
            var eventId = d.event.event_id;
            console.log("somebody rsvpd yes");
            // awesome email them the link
            var options = {
              host: "api.meetup.com",
              method: "GET",
              port: 443,
              path: "/2/member/" + d.member.member_id
            };
            options.path += "?key=" + config.get("meetup_api_key") + "&sign=true";
            var meetupReq = https.request(options, function(resp){
              console.log(resp.statusCode);
              resp.setEncoding('utf8');
              var d = "";
              resp.on("data", function(chunk){
                console.log("got chunk", chunk);
                if (typeof chunk === "undefined"){
                  console.log("wtf?");
                  return;
                }
                d += chunk;
              });
              resp.on("end", function(){
                console.log("end", d, typeof d);
                var data = JSON.parse(d);
                console.log("got user, sending email to", data.email);
                sendgrid.send({
                  //to: data.email,
                  to: "jteplitz602@gmail.com",
                  from: "meetup@ordrin.com",
                  subject: "Do you want food with that?",
                  html: "<p>Order food for your meetup. <a href=\"" + host + "/order/" + eventId + "\">Click here</a></p>"
                }, function(success, msg){
                  if (!success){
                    console.log("email not sent", msg);
                  }else{
                    console.log("email sent");
                  }
                });
             });
            });
            meetupReq.end();
          }
        }
      });
    });
    client.connect("ws://stream.meetup.com/2/rsvps");
    cb();
  }

  exports.addEvent = function(eid){
    eids.push(eid);
  }
}