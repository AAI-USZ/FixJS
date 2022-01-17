function(event){
        Session.set('privateRoomId',this._id);
        Meteor.autosubscribe(function(){
            Meteor.subscribe("privateMessages", Session.get('privateRoomId'));
        })
        if ($('#hostChatModal').css('display') == 'none') {
            if ($('#chatModal').css('display') != 'none') {
                $('#chatModal').hide("slide", { direction: "left" }, 300,function(){
                    $('#hostChatModal').show("slide", { direction: "left" }, 500,function(){
                        Meteor.flush();
                        $('#hostChatModal #messageList').scrollTop(9999999);
                        $('#hostChatModal #input').focus();
                    });
                });
            } else {
                $('#hostChatModal').show("slide", { direction: "left" }, 500,function(){
                    Meteor.flush();
                    $('#hostChatModal #messageList').scrollTop(9999999);
                    $('#hostChatModal #input').focus();
                });
            }
        }
        Meteor.flush();
        $('#hostChatModal #messageList').scrollTop(9999999);
    }