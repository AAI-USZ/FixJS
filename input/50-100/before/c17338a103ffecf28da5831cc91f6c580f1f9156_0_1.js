function(){
            var transport = nodemailer.createTransport("sendmail", {
                path: "/usr/local/bin/sendmail",
                args: ["-f online@southern.edu"]
            });

            var mailOptions = {
                from: "online@southern.edu",
                to: email,
                subject: "Online Campus Suport - Chat Transcript",
                generateTextFromHTML: true,
                html: chatTranscript
            }
            console.log(mailOptions);
            console.log(chatTranscript);
            return 'Email response successfull!\nEmail to: ' + email + '\nEmail text: \n' + chatTranscript;
            /*
            transport.sendMail(mailOptions, function(error,result){
                if (error) {
                    return 'Error sending email!  Error was: ' + error;
                } else {
                    return 'Email response successfull!  Response was: ' + result +'\nEmail to: ' + email + '\nEmail text: \n' + chatTranscript;
                }
            });*/
        }