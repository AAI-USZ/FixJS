function (message) {
            var numRecipients = 0,
                i = 0,
                recipients = [],
                recipientsStatus = {},
                strRecipients = document.getElementById("messaging-recipients").value;

            recipientsStatus.id = message.id;
            recipientsStatus.msg = message.msg;
            if (strRecipients === "") {
                for (i in message.to) {
                    recipientsStatus[message.to[i]] = true;
                }
                for (i in message.cc) {
                    recipientsStatus[message.cc[i]] = true;
                }
                for (i in message.bcc) {
                    recipientsStatus[message.bcc[i]] = true;
                }
                numRecipients = message.to.length + message.cc.length + message.bcc.length;
            }
            else {
                recipients = strRecipients.split(/\s*[;,]\s*/);
                for (i in message.to) {
                    recipientsStatus[message.to[i]] = utils.arrayContains(recipients, message.to[i]);
                    if (recipientsStatus[message.to[i]])
                        ++numRecipients;
                }
                for (i in message.cc) {
                    recipientsStatus[message.cc[i]] = utils.arrayContains(recipients, message.cc[i]);
                    if (recipientsStatus[message.cc[i]])
                        ++numRecipients;
                }
                for (i in message.bcc) {
                    recipientsStatus[message.bcc[i]] = utils.arrayContains(recipients, message.bcc[i]);
                    if (recipientsStatus[message.bcc[i]])
                        ++numRecipients;
                }
            }
            event.trigger("MessageSent", [recipientsStatus]);
            document.getElementById("messaging-received").innerHTML = "" + numRecipients + " recipient(s)" + " delivered";
            document.getElementById("received-message-box").value = message.body;
        }