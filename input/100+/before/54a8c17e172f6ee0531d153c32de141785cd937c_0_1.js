function (email,roomId) {
        var chatTranscript = generateHTMLChat(roomId);
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
            
            transport.sendMail(mailOptions);
    }