function(event){
        Session.set('roomId',this._id)
        Meteor.autosubscribe(function(){
            Meteor.subscribe("messages", Session.get('roomId'));
        })
        Rooms.update({ _id:this._id},{$set: { host: getUser()}});
        if ($('#chatModal').css('display') == 'none') {
            if ($('#hostChatModal').css('display') != 'none') {
                $('#chatModal').hide("slide", { direction: "left" }, 300, function(){
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