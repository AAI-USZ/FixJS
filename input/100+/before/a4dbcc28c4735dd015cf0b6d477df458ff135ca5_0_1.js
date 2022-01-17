function(){
            Rooms.update({ _id:this._id},{$set: { host: getUser()}});
            if ($('#ChatModal').css('display') == 'none') {
                if ($('#hostChatModal').css('display') == 'block') {
                    $('#hostChatModal').hide("slide", { direction: "left" }, 300, function(){
                        $('#ChatModal').show("slide", { direction: "left" }, 500);
                    });
                } else {
                    $('#ChatModal').show("slide", { direction: "left" }, 500);
                }
            }
            hostSubscribe();
            Meteor.flush();
            $('#ChatModal #messageList').scrollTop(9999999); 
            $('#ChatModal #input').focus();
        }