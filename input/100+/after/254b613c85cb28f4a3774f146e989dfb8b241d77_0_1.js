function(){
            Rooms.update({ _id:this._id},{$set: { host: getUser()}});
            if ($('#ChatModal').css('display') == 'none') {
                if ($('#hostChatModal').css('display') == 'block') {
                    $('#hostChatModal #messageList ul').fadeOut('fast',function(){
                        $('#hostChatModal').hide("slide", { direction: "left" }, 300, function(){
                            $('#ChatModal').show("slide", { direction: "left" }, 500, function() {
                                 hostSubscribe('');
                            });
                        });
                    });
                } else {
                    $('#ChatModal').show("slide", { direction: "left" }, 500,function(){    
                        hostSubscribe('');
                    });
                }
            } else {
                hostSubscribe('');
            }
            Meteor.flush();
            $('#ChatModal #messageList').scrollTop(9999999); 
            $('#ChatModal #input').focus();
        }