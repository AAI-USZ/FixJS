function(event){
        Session.set('roomId',this._id);
        $('#chatModal #messageList').fadeOut('fast',function(){
            Meteor.autosubscribe(function(){
                Meteor.subscribe("messages", Session.get('roomId'),function(){  
                    $('#chatModal #messageList').fadeIn('fast');
                });
            });
        });
        Rooms.update({ _id:this._id},{$set: { host: getUser()}});
        if ($('#chatModal').css('display') == 'none') {
            console.log($('#hostChatModal').css('display'));
            if ($('#hostChatModal').css('display') == 'block') {
                $('#hostChatModal').hide("slide", { direction: "left" }, 300, function(){
                    $('#chatModal').show("slide", { direction: "left" }, 500,function(){
                        Meteor.flush();
                        $('#chatModal #messageList').scrollTop(9999999);
                        $('#chatModal #input').focus();
                    });
                });
            } else {
                $('#chatModal').show("slide", { direction: "left" }, 500,function(){
                    Meteor.flush();
                    $('#chatModal #messageList').scrollTop(9999999);
                    $('#chatModal #input').focus();
                });
            }
        }
        Meteor.flush();
        $('#chatModal #messageList').scrollTop(9999999);
    }