function(){
  "use strict";
  var https  = require("https"),
      sendgrid = require("sendgrid").SendGrid,
      config = require('nconf').argv().env().file({file:'./config.json'});

  sendgrid = new sendgrid(config.get("sendgrid_user"), config.get("sendgrid_pass"));

  exports.Start = function(eid){
    var options = {
      host : "stream.meetup.com",
      port : 443,
      path : "/2/rsvps/",
      method : 'GET'
    };
    options.path += eid + "?key=" + config.get("meetup_api_key") + "&sign=true";
    var meetupreq = https.request(options, function(resp){
      resp.on("data", function(d){
        var data = JSON.parse(d);
        console.log("somebody rsvpd");
        if (d.response == "yes"){
          // awesome email them the link
          var options = {
            host: "api.meetup.com",
            port: 443,
            path: "/2/member/" + d.member.member_id
          };
          options.path += "?key=" + config.get("meetup_api_key") + "&sign=true";
          https.get(options, function(resp){
            var data = "";
            resp.on("data", function(chunk){
              data += chunk;
            });
            resp.on("end", function(){
              sendgrid.send({
                to: data.email,
                from: "meetup@ordrin.com",
                subject: "Do you want food with that?",
                html: "<p>Order food for your meetup. <a href=\"" + req.headers.host + "/order/" + eid + "\">Click here</a></p>"
              }, function(success, msg){
                if (!success){
                  console.log("email not sent", msg);
                }else{
                  console.log("email sent");
                }
              });
           });
          });
        }
      });
    });
    meetupreq.end();
  }
}