function recommendation() {
        var r = $("<a/>").text("r").click(function() {
            confirm_action("рекомендовать сообщение #"+message_id,
            function() {
                api_call_alert("recommend", {message: message_id});
            });
        });
        r.css("cursor", "pointer");
        $("#"+message_id).find(".msgb").append(" ").append(r);
    }