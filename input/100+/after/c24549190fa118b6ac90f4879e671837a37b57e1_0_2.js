function(event){
        Session.set('roomId',this._id);
        $('#hostChatModal #messageList').fadeOut('fast',function(){  
            Meteor.autosubscribe(function(){
                Meteor.subscribe("messages", Session.get('roomId'),function(){  
                    $('#hostChatModal #messageList').fadeIn('fast');
                });
            });
        });
        if ($('#hostChatModal').css('display') == 'none') {
            console.log($('#chatModal').css('display'));
            if ($('#chatModal').css('display') == 'block') {
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