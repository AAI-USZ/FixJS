function (email,roomId) {
        var chatTranscript = generateHTMLChat(roomId);
            var transport = nodemailer.createTransport("SMTP", {
                host: "smtp.southern.edu", // hostname
                //secureConnection: true, // use SSL
                port: 587, // port for secure SMTP
                auth: emailUserInfo,
                debug: true
            });

            var mailOptions = {
                from: "rharrell@southern.edu",
                to: email,
                subject: "Online Campus Suport - Chat Transcript",
                generateTextFromHTML: true,
                html: chatTranscript
            }
            
            transport.sendMail(mailOptions, function(error,result){
                if (error) {
                    console.log("Error emailing! \n" + error);
                } else {
                    console.log('Email response successfull!  Response was: ' + result +'\nEmail to: ' + email + '\nEmail text: \n' + chatTranscript);
                }
            });
            return "Email Sending..."
    }