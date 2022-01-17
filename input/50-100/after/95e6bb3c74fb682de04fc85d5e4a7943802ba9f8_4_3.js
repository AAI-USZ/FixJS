function (from, to, message) {
         var message_body = Strophe.xmlescape("<sms>" +
                                        " <sms_from>" + from + "</sms_from>" +
                                        " <sms_to>" + to + "</sms_to>" +
                                        " <sms_body>" + message + "</sms_body>" +
                                    " </sms>");
         var replymsg = $msg({
            to: "logic.smsfeedback.com",
            from: "smsapp@smsfeedback.com",
            "type": "sendSmsRequest"
         }).c("body").t(message_body);
         this.connection.send(replymsg);
         this.log("Reply sent");
      }