function(){  
            if ($('#hostChatModal').css('display') == 'none') {
                if ($('#ChatModal').css('display') == 'block') {
                    $('#ChatModal').hide("slide", { direction: "left" }, 300,function(){
                        $('#hostChatModal').show("slide", { direction: "left" }, 500, function(){
                            hostSubscribe('host');
                        });
                    });
                } else {
                    $('#hostChatModal').show("slide", { direction: "left" }, 500,function(){
                        hostSubscribe('host');
                    });
                }
            } else {
                hostSubscribe('host');
            }
            Meteor.flush();
            $('#hostChatModal #messageList').scrollTop(9999999);
            $('#hostChatModal #input').focus();
        }