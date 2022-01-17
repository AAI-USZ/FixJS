function (email,roomId) {
        var chatTranscript = generateHTMLChat(roomId);
            var transport = nodemailer.createTransport("SMTP", {
                host: "smtp.southern.edu", // hostname
                secureConnection: true, // use SSL
                port: 465, // port for secure SMTP
                auth: emailUserInfo
            });

            var mailOptions = {
                from: "online@southern.edu",
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
    }