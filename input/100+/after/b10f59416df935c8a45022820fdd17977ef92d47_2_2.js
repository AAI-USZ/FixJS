function(){
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
             }