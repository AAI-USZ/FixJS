function(resp){
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
    }