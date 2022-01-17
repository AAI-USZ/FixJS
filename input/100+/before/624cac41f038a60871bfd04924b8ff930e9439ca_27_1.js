function() {
            $inbox_show_message_reply_fields = $($inbox_show_message_reply_fields.selector);
            var replyButtonText = sakai.api.i18n.getValueForKey("REPLY", "inbox");
            var replyText = sakai.api.i18n.getValueForKey("RE", "inbox");
            var messageSubject = currentMessage.subject;
            // Check whether the message starts with Reply. If not, add it to the subject line
            if(currentMessage.subject.substring(0, replyText.length) !== replyText){
                messageSubject = replyText + " " + currentMessage.subject;
            }
            $(window).trigger("initialize.sendmessage.sakai", [currentMessage.replyAll, $inbox_show_message_reply_fields, handleReplyFinished, messageSubject, null, true, currentMessage.id, replyButtonText]);
            $inbox_show_message_reply_fields.show();
        }