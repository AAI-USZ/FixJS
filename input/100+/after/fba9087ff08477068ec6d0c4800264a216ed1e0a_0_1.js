function (message) {
            var numRecipients = 0,
                i = 0,
                recipients = [],
                recipientsStatus = {},
                strRecipients = document.getElementById("messaging-recipients").value;

            recipientsStatus.id = message.id;
            recipientsStatus.msg = message.msg;
            for (i in message.to) {
                recipientsStatus[message.to[i]] = true;
                recipients.push(message.to[i]);
            }
            for (i in message.cc) {
                recipientsStatus[message.cc[i]] = true;
                recipients.push(message.cc[i]);
            }
            for (i in message.bcc) {
                recipientsStatus[message.bcc[i]] = true;
                recipients.push(message.bcc[i]);
            }
            numRecipients = recipients.length;
            strRecipients = recipients.join(",");
            event.trigger("MessageSent", [recipientsStatus]);
            document.getElementById("messaging-received").innerHTML = "" + numRecipients + " recipient(s)" + " delivered";
            document.getElementById("messaging-recipients").value = strRecipients;
            document.getElementById("received-message-box").value = message.body;
        }