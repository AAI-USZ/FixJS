function(){  
            if ($('#hostChatModal').css('display') == 'none') {
                if ($('#chatModal').css('display') == 'block') {
                    $('#chatModal').hide("slide", { direction: "left" }, 300,function(){
                        $('#hostChatModal').show("slide", { direction: "left" }, 500);
                    });
                } else {
                    $('#hostChatModal').show("slide", { direction: "left" }, 500);
                }
            }
            hostSubscribe('host');
            Meteor.flush();
            $('#hostChatModal #messageList').scrollTop(9999999);
            $('#hostChatModal #input').focus();
        }