function(e) {
            confirm_action("рекомендовать сообщение #"+message_id,
            function() {
                api_call_alert("recommend", {message: message_id});
            }, e);
        }